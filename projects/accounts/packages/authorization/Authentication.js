class Authentication {
  constructor(authentication = {}) {
    this.auth = authentication.item;
  }

  isAuth() {
    return Boolean(this.auth);
  }

  isAdmin() {
    if (!isAuth()) return false;
    const { isAdmin } = this.auth;
    return Boolean(user && isAdmin);
  }

  isOwn() {
    if (!isAuth()) return false;
    const { id } = this.auth;
    return { createdBy: { id } };
  }
}
module.exports = { Authentication };
