import Default from "./Default";
import { makeVar } from "@apollo/client";
export const LoadingUI = makeVar(Default);
const Loading = ({ UI, variant = {}, error = {} }) => {
  const Render = UI || LoadingUI();
  return <Render variant={variant} />;
};
export default Loading;
