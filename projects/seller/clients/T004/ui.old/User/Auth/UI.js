import { Box } from "@chakra-ui/react";
import Image from "next/image";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Avatar,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Portal } from "@chakra-ui/react";
export default function UserAuthUI(props) {
  const { user } = props;
  return user?.id ? (
    <Menu>
      <MenuButton>
        <Avatar size="md" name={user.name} src={user.avatar.publicUrl} ml={3}/>
      </MenuButton>
      <Portal>
        <MenuList>
          <MenuItem>{user.name}</MenuItem>
          <MenuItem>Sign Out</MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  ) : (
    <Button colorScheme="blue" ml={3}>
      Đăng nhập
    </Button>
  );
}
