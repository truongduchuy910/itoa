import Default from "./Default.js";
import { makeVar } from "@apollo/client";
export const SuccessUI = makeVar(Default);
const Success = ({ value, UI, variant = {} }) => {
  const props = {
    value,
    variant,
  };
  const Render = UI ? UI : SuccessUI();
  return <Render {...props} />;
};
export default Success;
