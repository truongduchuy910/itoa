import Default from "./Default.js";
import { makeVar } from "@apollo/client";
export const ErrorUI = makeVar(Default);
const Error = ({ error, errors, UI, variant = {} }) => {
  const props = {
    error: error ? error.toString() : errors ? errors.toString() : ``,
    variant,
  };
  const Render = UI ? UI : ErrorUI();
  return <Render {...props} />;
};
export default Error;
