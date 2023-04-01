import {
    Button, Menu,
    MenuButton, MenuItem, MenuList
} from '@chakra-ui/react';
import { FaBell } from 'react-icons/fa';

/* @TODO get notifications, style the menu and shit */
export default function NotificationNavMenu() {
  return (
    <Menu
      autoSelect={false}
    >
      <MenuButton
        as={Button}
        p="0"
        px="2"
        size="sm"
        rounded="full"
        bg="white"
        color="brand.900"
        _hover={{
            textDecoration: "none",
            bg: "gray.300",
        }}
        _after={{
            content:'"17"', /* That's where the number of notification goes */
            position: "absolute",
            top: "-5px",
            right: "-5px",
            bg: "#FC4545",
            fontSize: "xs",
            borderRadius: "full",
            color: "white",
            height: "20px",
            width: "20px",
            p: "3px"
        }}
      >
        <FaBell />
        </MenuButton>
        <MenuList
            alignItems={'center'}
            w={{base: "100vw", sm: "auto"}}
        >
        <MenuItem>
            Some notification
        </MenuItem>
      </MenuList>
    </Menu>
  )
}