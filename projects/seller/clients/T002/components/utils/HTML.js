import { createElement, useState } from "react";

export default class HTML {
  static generation(object, level = 5) {
    if (level <= 0) return null;
    switch (typeof object) {
      case "object":
        if (Array.isArray(object)) {
          return (
            <ul style={{ paddingBottom: 13 }}>
              {object.map((item, index) => {
                return <li key={index}>{HTML.generation(item, level - 1)}</li>;
              })}
            </ul>
          );
        } else {
          var childs = [];
          for (var child in object) {
<<<<<<< HEAD
            if (!child.includes('__') && !child.includes('ROOT'))
              childs.push(<HTML.Item key={child} child={child} object={object} level={level} />);
=======
            if (!child.includes("__") && !child.includes("ROOT"))
              childs.push(
                <HTML.Item
                  key={child}
                  child={child}
                  object={object}
                  level={level}
                />
              );
>>>>>>> 8e151249fe35c5fd5ec0c04802df8794aff5caa7
          }

          return object !== null ? (
            createElement(
              "div",
              {
                style: {
                  marginLeft: 8,
                },
              },
              childs
            )
          ) : (
            <div />
          );
        }
      case "boolean":
        return object ? "true" : "false";
      case "string":
        if (object.match(/.(jpg|jpeg|png|gif)$/i))
          return <img src={object} style={{ maxWidth: 200 }} />;
        if (object.length === 10)
          return (
<<<<<<< HEAD
            <a style={{ textDecoration: 'underline' }} href={`tel:${object}`}>
              {object}
            </a>
          );
        if (object.length === 24) return <a style={{ color: 'red' }}>{object}</a>;
=======
            <a style={{ textDecoration: "underline" }} href={`tel:${object}`}>
              {object}
            </a>
          );
        if (object.length === 24)
          return <a style={{ color: "red" }}>{object}</a>;
>>>>>>> 8e151249fe35c5fd5ec0c04802df8794aff5caa7
        if (HTML.validURL(object)) return <a href={object}>{object}</a>;
        return <span>{object}</span>;

      case "number":
        return (
          <span style={{ textDecoration: "underline", color: "blue" }}>
            {new Intl.NumberFormat().format(object)}
          </span>
        );
      default:
        return <span>{object?.toString()}</span>;
    }
  }
  static Item({ child, object, level }) {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ marginLeft: 21 }}>
        <span
          style={{
            fontWeight: "bold",
            cursor: "pointer",
            userSelect: "none",
            color: open ? "black" : "gray",
            textDecoration: open ? "none" : "line-through",
          }}
          onClick={(e) => setOpen((open) => !open)}
        >
          {child}:
        </span>{" "}
        {open ? HTML.generation(object[child], level) : null}
      </div>
    );
  }
  static validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }
}
