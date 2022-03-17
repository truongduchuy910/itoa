import ToastSimple from '../../elements/Toast/Simple';
import Infomation from '../../frames/Infomation';
import { Box } from '@chakra-ui/layout';
import InfomationNavbar from '../../frames/Infomation/Navbar';
import InformationFooter from '../../frames/Infomation/Footer';
import ProductCartSimple from '../../primes/Product/Cart/Simple';
const Layout = ({ children }) => {
  return (
    <Box>
      <Infomation UI={InfomationNavbar} CartUI={ProductCartSimple} />
      {children}
      <Infomation UI={InformationFooter} />
      <ToastSimple />
    </Box>
  );
};
export default Layout;
