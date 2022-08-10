const fs = require("fs");
const path = require("path");
/**
 *
 * @param {*} dir
 * @param {*} root
 * @param {*} exts
 * @returns {Array}
 */
function reads(dir = "", name = "", root = "", exts = [".md"]) {
    var files = [];
    var directories = []
    const direction = path.join(root, dir)
    const list = fs.readdirSync(direction);
    for (var i in list) {
        const file = list[i];
        const current = path.join(root, dir, file);
        const child = path.join(dir, file);
        const stats = fs.lstatSync(current);
        const isDirectory = stats.isDirectory();
        const isFile = stats.isFile()
        if (isDirectory) {
            directories.push(reads(child, file, root, exts));
        } else if (isFile) {
            const result = path.parse(current);
            if (exts.includes(result.ext)) {
                files.push({
                    path: `${root}/${dir}/${file}`,
                    dir: `/${dir.replace(/-/g, "/").replace(/_/g, "*").replace(/:/g, "+")}`,
                    file: result.name,
                });
            }
        }
    }
    return { name, files, directories };
}


const guide = reads('./docs', 'guide')
const reference = reads('./packages', 'reference')
const data = JSON.stringify({ directories: [guide, reference] });
fs.writeFileSync('./homepage/tree.json', data)