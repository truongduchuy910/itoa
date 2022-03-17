(this['webpackJsonpminer-ea.com'] = this['webpackJsonpminer-ea.com'] || []).push([
  [0],
  {
    124: function (e, c, t) {
      'use strict';
      t.r(c);
      var a,
        n,
        s,
        l,
        i,
        r,
        d = t(4),
        o = t.n(d),
        b = t(71),
        j = t.n(b),
        m = (t(79), t(80), t(13)),
        h = t(24),
        u = function (e) {
          var c = e.id,
            t = Object(m.useQuery)(
              Object(m.gql)(
                a ||
                  (a = Object(h.a)([
                    '\n      query($id: ID!) {\n        Post(where: { id: $id }) {\n          id\n          title\n          body\n          thumbnail {\n            publicUrl\n          }\n        }\n      }\n    ',
                  ]))
              ),
              { variables: { id: c } }
            ),
            n = t.loading,
            s = t.error,
            l = t.data;
          return n || s ? 'loading...' : l.Post.title;
        },
        O = t(2),
        x = function (e) {
          var c = e.className,
            t = e.id,
            a = Object(m.useQuery)(
              Object(m.gql)(
                n ||
                  (n = Object(h.a)([
                    '\n      query($id: ID!) {\n        Post(where: { id: $id }) {\n          id\n          title\n          body\n          thumbnail {\n            publicUrl\n          }\n        }\n      }\n    ',
                  ]))
              ),
              { variables: { id: t } }
            ),
            s = a.loading,
            l = a.error,
            i = a.data;
          if (s || l) return 'loading...';
          var r = i.Post.body.replace('width="1280" height="642"', 'width="100%" height="100%"');
          return Object(O.jsx)('div', { className: c, dangerouslySetInnerHTML: { __html: r } });
        },
        v = function (e) {
          var c = e.className,
            t = e.id,
            a = Object(m.useQuery)(
              Object(m.gql)(
                s ||
                  (s = Object(h.a)([
                    '\n      query($id: ID!) {\n        Post(where: { id: $id }) {\n          id\n          title\n          body\n          thumbnail {\n            publicUrl\n          }\n        }\n      }\n    ',
                  ]))
              ),
              { variables: { id: t } }
            ),
            n = a.loading,
            l = a.error,
            i = a.data;
          if (n || l) return 'loading...';
          var r = i.Post,
            d = r.title,
            o = r.thumbnail.publicUrl;
          return Object(O.jsx)('img', {
            className: c,
            src: 'https://seller.itoa.vn'.concat(o),
            alt: d,
          });
        },
        g = function (e) {
          var c = e.className,
            t = e.id,
            a = Object(m.useQuery)(
              Object(m.gql)(
                l ||
                  (l = Object(h.a)([
                    '\n      query($id: ID!) {\n        FileUpload(where: { id: $id }) {\n          id\n          file {\n            publicUrl\n          }\n        }\n      }\n    ',
                  ]))
              ),
              { variables: { id: t } }
            ),
            n = a.loading,
            s = a.error,
            i = a.data;
          if (n || s) return 'loading...';
          var r = i.FileUpload.file.publicUrl;
          return Object(O.jsx)('a', {
            className: c,
            role: 'button',
            href: 'https://seller.itoa.vn'.concat(r),
            download: !0,
            children: 'Download',
          });
        },
        f = t(48),
        p = function () {
          var e = Object(d.useState)(),
            c = Object(f.a)(e, 2),
            t = c[0],
            a = c[1],
            n = Object(d.useState)(),
            s = Object(f.a)(n, 2),
            l = s[0],
            o = s[1],
            b = Object(m.useMutation)(
              Object(m.gql)(
                i ||
                  (i = Object(h.a)([
                    '\n    mutation($data: ProductOrderCreateInput) {\n      createProductOrder(data: $data) {\n        id\n      }\n    }\n  ',
                  ]))
              )
            ),
            j = Object(f.a)(b, 1)[0],
            u = Object(m.useQuery)(
              Object(m.gql)(
                r ||
                  (r = Object(h.a)([
                    '\n      query {\n        allProducts {\n          id\n          name\n          price\n          image {\n            publicUrl\n          }\n        }\n      }\n    ',
                  ]))
              )
            ),
            x = u.loading,
            v = u.error,
            g = u.data;
          if (x || v) return 'loading...';
          var p = g.allProducts;
          return Object(O.jsx)('div', {
            className: 'container',
            children: Object(O.jsxs)('div', {
              className: 'row',
              children: [
                Object(O.jsx)('div', {
                  className: 'col-12 col-md-3 p-2',
                  children: Object(O.jsxs)('form', {
                    className: 'card p-3',
                    onSubmit: function (e) {
                      e.preventDefault();
                      var c = e.target.name.value,
                        a = e.target.phone.value,
                        n = e.target.address.value;
                      return (null === t || void 0 === t ? void 0 : t.id)
                        ? n
                          ? (console.log(c, a, n),
                            c &&
                              a &&
                              n &&
                              j({
                                variables: {
                                  data: {
                                    contact: { create: { name: c, phone: a, address: n } },
                                    items: { create: { product: { connect: { id: t.id } } } },
                                  },
                                },
                              })
                                .then(function (e) {
                                  o('Successful!'), console.log(e);
                                })
                                .catch(function (e) {
                                  console.log(e);
                                }),
                            (e.target.name.value = null),
                            (e.target.phone.value = null),
                            void (e.target.address.value = null))
                          : o('Please, input your email!')
                        : o('Please, choose the plan!');
                    },
                    children: [
                      Object(O.jsx)('h1', { children: 'Contact' }),
                      Object(O.jsx)('hr', {}),
                      Object(O.jsx)('div', {
                        className: 'mb-3',
                        children: Object(O.jsx)('input', {
                          type: 'email',
                          className: 'form-control',
                          placeholder: 'Plan',
                          value: null === t || void 0 === t ? void 0 : t.name,
                          readOnly: !0,
                        }),
                      }),
                      Object(O.jsxs)('div', {
                        className: 'mb-3',
                        children: [
                          Object(O.jsx)('label', {
                            className: 'form-label',
                            children: 'MT4 number',
                          }),
                          Object(O.jsx)('input', {
                            name: 'name',
                            className: 'form-control',
                            placeholder: 'MT4 number',
                          }),
                        ],
                      }),
                      Object(O.jsxs)('div', {
                        className: 'mb-3',
                        children: [
                          Object(O.jsx)('label', {
                            className: 'form-label',
                            children: 'Account name',
                          }),
                          Object(O.jsx)('input', {
                            name: 'phone',
                            className: 'form-control',
                            placeholder: 'Account name',
                          }),
                        ],
                      }),
                      Object(O.jsxs)('div', {
                        className: 'mb-3',
                        children: [
                          Object(O.jsx)('label', { className: 'form-label', children: 'Email' }),
                          Object(O.jsx)('input', {
                            name: 'address',
                            type: 'email',
                            className: 'form-control',
                            placeholder: 'Email',
                          }),
                        ],
                      }),
                      Object(O.jsx)('button', {
                        className: 'btn btn-sm btn-outline-primary w-100',
                        type: 'submit',
                        children: 'Buy',
                      }),
                      Object(O.jsx)('p', { className: 'my-3', children: l }),
                    ],
                  }),
                }),
                null === p || void 0 === p
                  ? void 0
                  : p.map(function (e) {
                      return Object(O.jsx)('div', {
                        className: 'col-6 col-md-3 p-2',
                        onClick: function () {
                          a(e);
                        },
                        children: Object(O.jsx)('div', {
                          className: 'card p-3 '.concat(
                            (null === t || void 0 === t ? void 0 : t.name) === e.name
                              ? 'active'
                              : ''
                          ),
                          children: Object(O.jsxs)('center', {
                            children: [
                              Object(O.jsx)('h2', { children: e.name }),
                              Object(O.jsx)('hr', {}),
                              Object(O.jsx)('img', {
                                className: 'w-50 my-3',
                                src: 'https://seller.itoa.vn'.concat(e.image.publicUrl),
                                alt: e.name,
                              }),
                              Object(O.jsxs)('h3', {
                                className: ' text-primary',
                                children: ['$', N(e.price)],
                              }),
                            ],
                          }),
                        }),
                      });
                    }),
              ],
            }),
          });
        };
      function N(e) {
        var c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '.',
          a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ',';
        try {
          (c = Math.abs(c)), (c = isNaN(c) ? 2 : c);
          var n = e < 0 ? '-' : '',
            s = parseInt((e = Math.abs(Number(e) || 0).toFixed(c))).toString(),
            l = s.length > 3 ? s.length % 3 : 0;
          return (
            n +
            (l ? s.substr(0, l) + a : '') +
            s.substr(l).replace(/(\d{3})(?=\d)/g, '$1' + a) +
            (c
              ? t +
                Math.abs(e - s)
                  .toFixed(c)
                  .slice(2)
              : '')
          );
        } catch (i) {}
      }
      var y = t(47);
      var w = function (e) {
          e.Component, e.pageProps, e.host;
          var c = new m.ApolloClient({
            uri: 'https://seller.itoa.vn/admin/api',
            cache: new m.InMemoryCache(),
          });
          return Object(O.jsx)(m.ApolloProvider, {
            client: c,
            children: Object(O.jsxs)(y.FacebookProvider, {
              appId: '145518257438217',
              children: [
                Object(O.jsx)(y.CustomChat, { pageId: '108418741306883', minimized: !0 }),
                Object(O.jsx)('img', {
                  id: 'home',
                  className: 'bg',
                  src: '/assets/img/1201.jpg?h=de65ea04a90d05ae27704aea9b88c2e5',
                  alt: 'background',
                }),
                Object(O.jsx)('div', { id: 'how' }),
                Object(O.jsx)('nav', {
                  className:
                    'navbar navbar-light navbar-expand-md sticky-top shadow navigation-clean-search',
                  children: Object(O.jsxs)('div', {
                    className: 'container-fluid',
                    children: [
                      Object(O.jsx)('a', {
                        className: 'navbar-brand',
                        href: '/',
                        children: Object(O.jsx)('img', {
                          className: 'logo',
                          src: '/assets/img/kim-tu-thap.jpg?h=16729fdfa91e6bfa1424d93039e6c64b',
                          alt: 'logo',
                        }),
                      }),
                      Object(O.jsxs)('button', {
                        'data-bs-toggle': 'collapse',
                        className: 'navbar-toggler',
                        'data-bs-target': '#navcol-1',
                        children: [
                          Object(O.jsx)('span', {
                            className: 'visually-hidden',
                            children: 'Toggle navigation',
                          }),
                          Object(O.jsx)('span', { className: 'navbar-toggler-icon' }),
                        ],
                      }),
                      Object(O.jsxs)('div', {
                        className: 'collapse navbar-collapse',
                        id: 'navcol-1',
                        children: [
                          Object(O.jsx)('form', {
                            className: 'me-auto search-form',
                            target: '_self',
                          }),
                          Object(O.jsxs)('ul', {
                            className: 'navbar-nav',
                            children: [
                              Object(O.jsx)('li', {
                                className: 'nav-item',
                                children: Object(O.jsx)('a', {
                                  className: 'nav-link',
                                  href: '#how',
                                  children: 'How it works',
                                }),
                              }),
                              Object(O.jsx)('li', {
                                className: 'nav-item',
                                children: Object(O.jsx)('a', {
                                  className: 'nav-link',
                                  href: '#buy',
                                  children: 'Buy',
                                }),
                              }),
                              Object(O.jsx)('li', {
                                className: 'nav-item',
                                children: Object(O.jsx)('a', {
                                  className: 'nav-link',
                                  href: '#contact',
                                  children: 'Contact',
                                }),
                              }),
                            ],
                          }),
                          Object(O.jsx)(g, {
                            className: 'btn btn-light action-button file-upload',
                            id: '6043d3729b86b3040e0839ff',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                Object(O.jsx)('header', {
                  children: Object(O.jsx)('div', {
                    className: 'banner',
                    style: {
                      background:
                        'url("/assets/img/v2-1dd01f260f09191248604b7df51f94df_1440w.jpg?h=8e30e224227fa910826d6fc7b6984cad")\n      center / cover no-repeat',
                      textAlign: 'center',
                    },
                    children: Object(O.jsx)('img', {
                      'data-aos': 'fade-up',
                      className: 'currency',
                      src: '/assets/img/eurusd.png?h=49d167f9217f58d61e337ce08b82f54d',
                      alt: 'currency',
                    }),
                  }),
                }),
                Object(O.jsxs)('main', {
                  children: [
                    Object(O.jsx)('section', {
                      className: 'pb-0',
                      id: 'buy',
                      children: Object(O.jsx)('div', {
                        className:
                          'container d-flex justify-content-center align-items-center video-box',
                        children: Object(O.jsx)(x, {
                          className: 'video',
                          id: '6043c6529b86b3040e0839f9',
                        }),
                      }),
                    }),
                    Object(O.jsx)('section', { children: Object(O.jsx)(p, {}) }),
                    Object(O.jsx)('section', {
                      children: Object(O.jsxs)('div', {
                        className: 'container text-center py-4',
                        children: [
                          Object(O.jsx)('h2', {
                            className: 'text-center mb-5 content',
                            children: Object(O.jsx)(u, { id: '6043c5c49b86b3040e0839f6' }),
                          }),
                          Object(O.jsx)(x, {
                            className: 'text-center',
                            id: '6043c5c49b86b3040e0839f6',
                          }),
                          Object(O.jsx)(v, {
                            className: 'image',
                            id: '6043c5c49b86b3040e0839f6',
                            alt: 'banner',
                          }),
                        ],
                      }),
                    }),
                    Object(O.jsx)('section', {
                      className: 'trans',
                      style: { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
                      children: Object(O.jsx)('div', {
                        className:
                          'container d-flex justify-content-center align-items-center py-4',
                        children: Object(O.jsxs)('h2', {
                          className: 'text-center text-light content',
                          children: [
                            Object(O.jsx)(u, { id: '6043c60f9b86b3040e0839f7' }),
                            Object(O.jsx)('br', {}),
                          ],
                        }),
                      }),
                    }),
                    Object(O.jsx)('section', {
                      children: Object(O.jsxs)('div', {
                        className: 'container py-4',
                        children: [
                          Object(O.jsx)('div', {
                            className: 'content',
                            children: Object(O.jsx)('h4', {
                              className: 'text-center content',
                              children: Object(O.jsx)(u, { id: '6043c6259b86b3040e0839f8' }),
                            }),
                          }),
                          Object(O.jsxs)('div', {
                            className: 'row',
                            children: [
                              Object(O.jsx)('div', {
                                className:
                                  'col-12 col-sm-5 col-lg-5 col-xl-5 col-xxl-6 d-flex justify-content-center align-items-center align-items-sm-start p-5',
                                children: Object(O.jsx)(v, {
                                  className: 'img-fluid image',
                                  id: '6043c6259b86b3040e0839f8',
                                }),
                              }),
                              Object(O.jsx)('div', {
                                className: 'col d-flex justify-content-center',
                                children: Object(O.jsx)(x, {
                                  className:
                                    'd-flex justify-content-center align-items-center content',
                                  id: '6043c6259b86b3040e0839f8',
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
                Object(O.jsx)('footer', {
                  className: 'footer-dark',
                  children: Object(O.jsxs)('div', {
                    className: 'container',
                    children: [
                      Object(O.jsxs)('div', {
                        className: 'row',
                        children: [
                          Object(O.jsxs)('div', {
                            className: 'col-md-6 col-lg-4 item text',
                            children: [
                              Object(O.jsx)('h3', {
                                children: Object(O.jsx)(u, { id: '6043cb729b86b3040e0839fa' }),
                              }),
                              Object(O.jsx)(x, {
                                className: 'content',
                                id: '6043cb729b86b3040e0839fa',
                              }),
                            ],
                          }),
                          Object(O.jsxs)('div', {
                            className: 'col-md-6 col-lg-4 item text',
                            children: [
                              Object(O.jsx)('h3', {
                                children: Object(O.jsx)(u, { id: '6043cb9f9b86b3040e0839fb' }),
                              }),
                              Object(O.jsx)(x, {
                                className: 'content',
                                id: '6043cb9f9b86b3040e0839fb',
                              }),
                            ],
                          }),
                          Object(O.jsx)('div', {
                            className: 'col-lg-4',
                            children: Object(O.jsx)(y.Page, {
                              href: 'https://www.facebook.com/eurusdea',
                              tabs: 'timeline',
                            }),
                          }),
                        ],
                      }),
                      Object(O.jsx)('p', {
                        className: 'copyright',
                        id: 'contact',
                        children: 'miner-ea.com \xa9 2021',
                      }),
                    ],
                  }),
                }),
              ],
            }),
          });
        },
        P = function (e) {
          e &&
            e instanceof Function &&
            t
              .e(3)
              .then(t.bind(null, 125))
              .then(function (c) {
                var t = c.getCLS,
                  a = c.getFID,
                  n = c.getFCP,
                  s = c.getLCP,
                  l = c.getTTFB;
                t(e), a(e), n(e), s(e), l(e);
              });
        };
      j.a.render(
        Object(O.jsx)(o.a.StrictMode, { children: Object(O.jsx)(w, {}) }),
        document.getElementById('root')
      ),
        P();
    },
    79: function (e, c, t) {},
    80: function (e, c, t) {},
  },
  [[124, 1, 2]],
]);
//# sourceMappingURL=main.000caf1e.chunk.js.map
