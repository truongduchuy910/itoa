import { Fragment, useState } from 'react';

const Text = props => {
  const { label, items, selected = 0, onChange = () => {} } = props;
  const [focused, setFocused] = useState(selected);
  return (
    <Fragment>
      <div className="a-b my-3">
        <label
          className="c"
          style={{
            top: focused ? -6 : 15,
            zIndex: focused ? 1 : -1,
            backgroundColor: focused ? 'white' : 'transparent',
            left: focused ? 9 : 13,
            color: focused && 'var(--color-ansi-gray)',
          }}
        >
          {label}
        </label>

        <select
          onChange={e => {
            if (e.target.value) {
              setFocused(true);
            } else setFocused(false);

            onChange({
              key: e.target.value,
              name: e.target[e.target.selectedIndex].innerText,
            });
          }}
          onFocus={e => {
            setFocused(true);
          }}
          onBlur={e => {
            if (e.target.value) {
              setFocused(true);
            } else setFocused(false);
          }}
          className="a"
          defaultValue={selected}
        >
          <option value={0} hidden></option>

          {items &&
            items?.map((province, index) => (
              <option key={index} value={province.key}>
                {province.name}
              </option>
            ))}
        </select>
      </div>

      <style jsx>{`
        .a {
          color: inherit;
          font: inherit;
          margin: 0;
          padding: 0px 0px 0px 13px;
          -webkit-appearance: none;
          -moz-appearance: none;
          -webkit-font-smoothing: inherit;
          border: none;
          background: transparent;
          line-height: normal;
          border-radius: 4px;
          width: 100%;
          display: block;
          box-sizing: border-box;
          border: 1px #d9d9d9 solid;
          height: 44px;
          background-color: transparent;
          color: #333;
          font-size: 18px;
          letter-spacing: 0;
        }
        .a-b {
          position: relative;
        }
        .c {
          text-transform: capitalize;
          margin: 0px;
          padding: 0px 5px 0px 3px;
          position: absolute;
          line-height: 1;
          transition: all 0.2s ease;
        }

        .a:focus {
          outline: none;
          border-color: #66afe9;
          box-shadow: 0 0 0 1px #66afe9;
        }
        .floating-labels .c {
          position: absolute;
          top: 0;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          box-sizing: border-box;
          margin-top: 0.4em;
          margin-left: 1px;
          padding: 0 0.8em;
          font-size: 0.84em;
          color: #999;
          z-index: 1;
          user-select: none;
          pointer-events: none;
          font-size: 1em;
          transform: translateY(6px);
        }
        .animate-floating-labels .c {
          transition: all 0.2s ease-out;
          -webkit-transition: all 0.2s ease-out;
        }
        /*! CSS Used from: Embedded */
        .a:focus {
          border: 1px #d9d9d9 solid;
          box-shadow: none;
          outline: none;
        }
        option {
          padding-bottom: 2px;
        }
      `}</style>
    </Fragment>
  );
};
export default Text;
