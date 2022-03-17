import { useMemo } from "react";

export default function trans(data) {
  if (Array.isArray(data)) {
    data = data.map((d) => ({ ...d, ...trans(d) }));
  } else {
    if (typeof data === "object" && data !== null) {
      var _data = { ...data };
      for (var i in _data) {
        if (Array.isArray(_data._trans)) {
          const t = _data._trans.find((d) => d.fieldName === i);
          if (t) {
            _data[i] = t.content;
          }
        }
        _data[i] = trans(_data[i]);
      }
      data = _data;
    }
  }
  return data;
}
