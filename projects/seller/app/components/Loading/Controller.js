import Default from "./Default";
import { makeVar } from "@apollo/client";
const Loading = ({ UI, variant = {}, error = {} }) => {
  const Render = UI || LoadingUI();
  return <Render variant={variant} />;
};
export default Loading;
