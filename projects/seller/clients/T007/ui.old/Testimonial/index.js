import ListController, { TESTIMONIALS_QUERY } from "./List/Controller";
export const TestimonialListQuery = TESTIMONIALS_QUERY;
/**
 *
 */
import ListGridWithBlurredBackdrop from "./List/GridWithBlurredBackdrop";
export function TestimonialListGridWithBlurredBackdrop(props) {
  return <ListController {...props} UI={ListGridWithBlurredBackdrop} />;
}
import ListUI from "./List/UI";
export function TestimonialListUI(props) {
  return <ListController {...props} UI={ListUI} />;
}
import ListWithBubbles from "./List/WithBubbles";
export function TestimonialListWithBubbles(props) {
  return <ListController {...props} UI={ListWithBubbles} />;
}
