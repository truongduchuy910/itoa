
/**
 *  filename: postcreateui.js
 *  path: /ui/postcreateui
 */

import Index from "@itoa/ui/Post/Create";
import UI from "@itoa/ui/Post/Create/UI";
export default function PostCreateUI(props) {
  return <Index {...props} UI={UI} />;
}
