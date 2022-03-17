const fs = require("fs");
const path = require("path");
const root = "./ui";
var urls = [];
function reads(dir = root) {
  const files = fs.readdirSync(dir);
  files.map((file) => {
    const _dir = path.join(dir, file);
    const stats = fs.statSync(_dir);
    if (stats.isDirectory()) {
      const isUp = /[A-Z]/.test(file.charAt(0));
      if (isUp) {
        const index = path.join(_dir, "index.js");
        if (fs.existsSync(index)) {
          const _files = fs.readdirSync(_dir);
          _files.map((_file) => {
            const UI = path.join(_dir, _file);
            const name = path.parse(_file);
            const _isUp = /[A-Z]/.test(_file.charAt(0));

            const _stats = fs.statSync(UI);
            if (_stats.isFile() && name.ext === ".js" && _isUp) {
              const uiImport = UI.replace(".js", "");

              const func = UI.replace("ui/", "")
                .replace(/\//g, "")
                .replace(".js", "");
              const url = func.toLowerCase();
              const filename = url + ".js";
              const code = `
/**
 *  filename: ${filename}
 *  path: /ui/${url}
 */

import Index from "@itoa/${_dir}";
import UI from "@itoa/${uiImport}";
export default function ${func}(props) {
  return <Index {...props} UI={UI} />;
}
`;
              const filePath = path.join("pages", root, filename);
              urls.push({ name: func, href: "/ui/" + url });
              fs.writeFileSync(filePath, code, { encoding: "utf-8" });
            }
          });
        }
        reads(_dir);
      }
    }
  });
}
reads();

const all = "ui/All/data.json";
fs.writeFileSync(all, JSON.stringify(urls), { encoding: "utf-8" });
