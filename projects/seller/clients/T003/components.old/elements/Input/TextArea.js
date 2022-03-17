import { Fragment, useState } from 'react';

const Text = props => {
  const [focused, setFocused] = useState(false);
  const { label, onChange } = props;
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
        <textarea
          {...props}
          onChange={e => {
            if (e.target.value) {
              setFocused(true);
            } else setFocused(false);
            onChange(e.target.value);
          }}
          className="a"
        />
      </div>

      <style jsx>{`
        /*! CSS Used from: https://lakshop.vn/css/checkout.min.css?v=bc5f183 */
        .a {
          color: inherit;
          font: inherit;
          margin: 0;
          padding: 0;
          -webkit-appearance: none;
          -moz-appearance: none;
          -webkit-font-smoothing: inherit;
          border: none;
          background: transparent;
          line-height: normal;
          min-height: 100px;
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

        .a {
          border-radius: 4px;
          width: 100%;
          display: block;
          box-sizing: border-box;
          padding: 0.94em 0.8em;
          border: 1px #d9d9d9 solid;
          height: 44px;
          background-color: transparent;
          color: #333;
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
          border-color: #e9b71f;
          box-shadow: 0 0 0 1px #e9b71f;
        }
      `}</style>
    </Fragment>
  );
};
export default Text;
