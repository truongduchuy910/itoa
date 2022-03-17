const PageList = dynamic(() => import("./Page/List"));
const WithAction = dynamic(() => import("./Navbar/WithAction"));
export default function NavbarWithAction() {
  return <PageList UI={WithAction} />;
}
