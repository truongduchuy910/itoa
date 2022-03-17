import PageList from "./Page/List";
import WithSubnavigation from "./Navbar/WithSubnavigation";
import { query } from "@itoa/ui/Page/List/index";

export default function NavbarWithSubnavigation({ action }) {
  return <PageList UI={WithSubnavigation} action={action} />;
}
export const pageListQuery = { query, variables: { first: 1 } };
