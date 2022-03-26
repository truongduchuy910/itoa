class Context {
  constructor(context) {
    this.context = context;
  }
  domain() {
    if (!this.context.req) throw new Error("Missing request");
    const { headers } = this.context.req;
    if (!headers) throw new Error("Missing headers");
    var { referer, as } = headers;
    var host = as && as !== "null" ? as : referer;
    var domain = host.split("/")[2] || host;
    return domain;
  }
}
