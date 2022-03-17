// @ts-ignore
import cookieSignature from 'cookie-signature';
import expressSession from 'express-session';
import type { SessionOptions } from 'express-session';
import { Request, Response, NextFunction } from 'express';
import { request, gql } from 'graphql-request';

import cookie from 'cookie';

// FIXME: In the future this types will need to come from Itoa itself.
type _Item = { id: string };
type _List = {
  key: string;
  adapter: { itemsQuery: (args: { where: { id: string } }) => Promise<_Item[]> };
};
type _Itoa = { lists: Record<string, _List> };
type _GetAuthedItem = (req: Request, itoa: _Itoa) => {};

export class SessionIntergrate {
  options: SessionOptions;
  COOKIE_NAME = 'itoa.sid';
  authService: any;
  constructor(options: SessionOptions, authService: any) {
    this.options = {
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production', // Default to true in production
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        sameSite: false,
      },
      name: this.COOKIE_NAME,
      ...options
    };

    if (!this.options.secret) {
      if (process.env.NODE_ENV === 'production') {
        throw new Error(`Biến cookieSecret là cấu hình bắt buộc khi chạy ở môi trường production.
        Nhập nhập ứng dụng hoặc biến môi trường của bạn để khởi tạo Itoa.`);
      } else {
        console.info(`Không có giá trị cookieSecret nào được cung cấp.
        Vui lòng thêm giá trị vào ứng dụng của bạn.
        Trong trường hợp chưa được thêm. Biến cookieSecret được sinh ngẫu nhiên trong mỗi lần chạy.
        Nghĩa là các session sẽ khác nhau sau khi khởi động lại.`);

        this.options.secret = [...Array(30)].map(() => ((Math.random() * 36) | 0).toString(36)).join('');
      }
    }

    this.authService = authService;
  }

  getSessionMiddleware({ itoa }: { itoa: _Itoa }) {
    // We have at least one auth strategy
    // Setup the session as the very first thing.
    // The way express works, the `req.session` (and, really, anything added
    // to `req`) will be available to all sub `express()` instances.
    // This way, we have one global setting for authentication / sessions that
    // all routes on the server can utilize.
    const injectAuthCookieMiddleware = (req: Request, res: Response, next: NextFunction) => {
      if (!req.headers) {
        return next();
      }

      let authHeader = req.headers.authorization || req.headers.Authorization || req.headers.auth;

      if (!authHeader) {
        return next();
      }
      if (Array.isArray(authHeader)) {
        authHeader = authHeader[0];
      }
      const [type, token] = authHeader.split(' ');

      if (type !== 'Bearer') {
        // TODO: Use logger
        console.warn(`Got Authorization header of type ${type}, but expected Bearer`);
        return next();
      }

      // Split the cookies out
      const cookies = cookie.parse(req.headers.cookie || '');

      // Construct a "fake" session cookie based on the authorization token
      cookies[this.COOKIE_NAME] = `s:${token}`;
      // Then reset the cookies so the session middleware can read it.
      req.headers.cookie = Object.entries(cookies)
        .map(([name, value]) => `${name}=${value}`)
        .join('; ');

      // Always call next
      next();
    };

    const sessionMiddleware = expressSession(this.options);

    const _populateAuthedItemMiddleware = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      // const item = await this.getAuthedItem(req, itoa);
      // if (!item) {
      //   return next();
      // }

      (req as any).user = (req.session as any).item;
      (req as any).authedListKey = (req.session as any).itoaListKey;

      next();
    };

    return [injectAuthCookieMiddleware, sessionMiddleware, _populateAuthedItemMiddleware];
  }

  async adapterAuthedItem(req: Request, itoa: _Itoa) {
    const session = req.session as any;
    if (!session || !session.itoaItemId) {
      return;
    }
    const list = itoa.lists[session.itoaListKey];
    if (!list) {
      return;
    }
    let item: _Item | undefined;
    try {
      item = (await list.adapter.itemsQuery({ where: { id: session.itoaItemId } }))[0];
    } catch (e) {
      return;
    }
    if (!item) {
      return;
    }
    return item;
  }
  async serviceAuthedItem(req: any, itoa: _Itoa) {
    const session = req.session || {};
    if (!session || !session.itoaItemId) {
      return;
    }
    const {
      uri,
      gqlNames: { authenticatedQueryName },
    } = this.authService;
    const { user } = await request(
      uri,
      gql`
        query {
          user: ${authenticatedQueryName} {
            id
            isAdmin
            username
            domain
          }
        }
      `,
      {},
      req.headers
    );
    return user;
  }
  async getAuthedItem(req: Request, itoa: _Itoa) {
    return this.authService
      ? await this.serviceAuthedItem(req, itoa)
      : await this.adapterAuthedItem(req, itoa);
  }
  startAuthedSession(req: Request, { item, list }: { item: _Item; list: _List }) {
    return new Promise(async (resolve, reject) => {
      req.session.regenerate((err: any) => {
        if (err) return reject(err);
        (req.session as any).itoaListKey = list.key;
        (req.session as any).itoaItemId = item.id;
        (req.session as any).item = item;
        resolve(cookieSignature.sign(req.session.id, this.options.secret));
      });
    });
  }

  endAuthedSession(req: Request): Promise<{ success: boolean; listKey: string; itemId: string }> {
    const { itoaListKey, itoaItemId } = (req.session as any) || {};
    return new Promise((resolve, reject) =>
      req.session.regenerate((err: any) => {
        if (err) return reject(err);
        resolve({ success: true, listKey: itoaListKey, itemId: itoaItemId });
      })
    );
  }

  getContext(req: Request) {
    return {
      startAuthedSession: ({ item, list }: { item: _Item; list: _List }) =>
        this.startAuthedSession(req, { item, list }),
      endAuthedSession: () => this.endAuthedSession(req),
    };
  }
}
