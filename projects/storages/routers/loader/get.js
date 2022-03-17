const { sizes, public_path } = require("@itoa/schemas/stores");
const path = require("path");
const fs = require("fs");
const Express = require("express");

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
function handler(req, res) {
  res.set("Cache-control", `public, max-age=3600`);
  const { url: _url, w: _w = 1024, h: _h } = req.query;
  const w = Number(_w);
  const h = Number(_h) || w;
  const url = decodeURI(_url).replace(/\/md/g, "").replace(/\/sm/g, "");
  const size =
    sizes
      .sort((a, b) => (a.size < b.size ? -1 : 1))
      .find((a) => a.size >= (w <= h ? w : h)) || sizes.unshift();

  const origin = path.join(path.resolve(), public_path, url);
  const resize = path.join(
    path.resolve(),
    public_path,
    url.replace(/\/img\//g, `/img/${size.name}/`),
  );

  if (fs.existsSync(resize)) res.sendFile(resize);
  else if (fs.existsSync(origin)) res.sendFile(origin);
  else
    res.sendFile(
      path.join(path.resolve(), public_path, "/assets/img/no-image.png"),
    );
}
module.exports = { handler };

// find ./ -type f -iname "*.gif" -exec mogrify -layers Dispose -resize 1024\>x1024\> {} +
// find ./ -type f -iname "*.jpeg" -exec mogrify -layers Dispose -resize 1024\>x1024\> {} +
// find ./ -type f -iname "*.jpg" -exec mogrify -layers Dispose -resize 1024\>x1024\> {} +
// find ./ -type f -iname "*.png" -exec mogrify -layers Dispose -resize 1024\>x1024\> {} +
// rm *\~


// rsync -a /home/robert/Documents/itoa-vn/seller/public/* root@103.176.178.169:/root/itoa-vn/seller/public
// rsync -a /root/itoa-vn/seller/public/* root@103.176.178.181:/root/itoa-vn
