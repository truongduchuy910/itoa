const dotenv = require('dotenv');
const path = require('path');
test('Production', () => {
  dotenv.config({
    path: path.join(__dirname, '.env'),
  });
  const { DB_CORE, DB_SESSION, COOKIE, AUTH_URI } = process.env;
  [DB_CORE, DB_SESSION, COOKIE, AUTH_URI].map(env => {
    expect(env).toBeTruthy();
  });
});
test('Development', () => {
  dotenv.config({
    path: path.join(__dirname, '.env.dev'),
  });
  const { DB_CORE, DB_SESSION, COOKIE, AUTH_URI } = process.env;
  [DB_CORE, DB_SESSION, COOKIE, AUTH_URI].map(env => {
    expect(env).toBeTruthy();
  });
});
