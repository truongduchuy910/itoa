const fs = require("fs");
const path = require("path");
const { templates } = require("./templates");
// const lists = require("../lists");
// const { LIST, ITEM } = require("./templates");
// const direction = path.join(__dirname, "../../../ecom/T002/components");
// lists.map((list) => {
//   const { fields } = require(path.join("../", list.path));
//   const listKey = list.path.replace(/\//g, "");
//   ["List", "Item", "Create", "Update", "Delete"].map((operation) => {
//     const dir = path.join(direction, "primes", list.path, operation);
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }
//     const file = path.join(dir, "index.js");
//     if (!fs.existsSync(file)) {
//       if (operation === "List") {
//         {
//           fs.writeFileSync(file, LIST(listKey, fields), { encoding: "utf-8" });
//         }
//       }
//       if (operation === "Item") {
//         {
//           // fs.unlinkSync(file);
//           fs.writeFileSync(file, ITEM(listKey, fields), { encoding: "utf-8" });
//         }
//       }
//     }
//   });
// });

function read(callback = () => {}, direction = "../models") {
  const files = fs.readdirSync(path.join(__dirname, direction));
  if (files.length) {
    var schemas = [];
    files.map((file) => {
      const extname = path.extname(file);
      if (!extname)
        schemas = schemas.concat(read(callback, path.join(direction, file)));
      else if (file === "index.js" && direction !== "../models") {
        const listKey = direction.slice(9, direction.length).replace(/\//g, "");
        const listPath = direction.slice(9, direction.length);
        const schema = require(path.join(__dirname, direction));
        var rel = ``;
        for (var _name in schema.fields) {
          const field = schema.fields[_name];
          if (field.type.type === "Relationship") rel += `${_name}, `;
        }
        schemas.push({ listKey, schema, rel, listPath });
        callback(listKey, schema, rel, listPath);
      }
    });
    return schemas;
  } else console.log(direction);
}
const schemas = read();
var direction = "";
var imports = ``;
var components = ``;
schemas.map(({ listKey, schema, rel, listPath }) => {
  ["List", "Item", "Create", "Update", "Delete"].map((operation) => {
    imports += `import ${listKey}${operation} from "@itoa/generation/primes${direction}${listPath}/${operation}";
import ${listKey}${operation}UI from "@itoa/generation/primes${direction}${listPath}/${operation}/UI.js";\n`;
  });
  components += `      <h5>${listKey}</h5>
      <${listKey}List UI={${listKey}ListUI} />
      <${listKey}List
        first={1}
        UI={({ all${listKey}s }) => {
          const [${listKey.toLowerCase()}] = all${listKey}s;
          return (
            <Fragment>
              <${listKey}Item UI={${listKey}ItemUI} ${listKey.toLowerCase()}={${listKey.toLowerCase()}} />
              <${listKey}Create UI={${listKey}CreateUI} ${listKey.toLowerCase()}={${listKey.toLowerCase()}} />
              <${listKey}Update UI={${listKey}UpdateUI} ${listKey.toLowerCase()}={${listKey.toLowerCase()}} />
              <${listKey}Delete UI={${listKey}DeleteUI} ${listKey.toLowerCase()}={${listKey.toLowerCase()}} />
            </Fragment>
          );
        }}
      />\n`;
});
fs.writeFile(
  path.join(__dirname, "test.js"),
  `import { Fragment } from "react";
${imports}
export default function TestComponents() {
  return (
    <Fragment>
${components}    </Fragment>
  );
}
`,
  {
    encoding: "utf-8",
  },
  () => {
    console.log("test.js");
  },
);
read((listKey, schema, rel, listPath) => {
  console.log("├──", listKey, rel);
  const { fields } = schema;
  var fieldsQuery = ``;
  for (var name in fields) {
    const field = fields[name];
    if (field.type.type === "File") {
      fieldsQuery += `\n      ${name} {
        publicUrl
      }`;
    } else if (
      field.type.type !== "Relationship" &&
      field.type.type !== "Images"
    ) {
      fieldsQuery += "\n      " + name;
    }
  }
  //
  ["List", "Item", "Create", "Update", "Delete"].map((operation) => {
    const dir = path.join(__dirname, "primes", listPath, operation);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const index = path.join(dir, "index.js");
    const UI = path.join(dir, `UI.js`);

    fs.writeFile(
      index,
      templates[operation](listKey, fieldsQuery),
      {
        encoding: "utf-8",
      },
      () => {
        console.log("-", index);
      },
    );
    fs.writeFile(
      UI,
      templates.UI[operation](listKey, fieldsQuery),
      {
        encoding: "utf-8",
      },
      () => {
        console.log("-", UI);
      },
    );
  });
});
