import path from 'path';

const pkgDir = path.dirname(require.resolve('@itoa/fields/package.json'));

export const resolveView = pathname => path.join(pkgDir, pathname);
