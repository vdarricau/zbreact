import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Avatar, Box, Button, Center, Container, Flex, Image, Menu,
  MenuButton, MenuDivider, MenuItem, MenuList, Stack,
  useColorMode, useColorModeValue
} from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { FaUserPlus } from 'react-icons/fa';
import {
  Link as RouteLink
} from "react-router-dom";
import User from '../../@ts/User';
import zbraLogoDark from '../../assets/images/zbra_logo_dark.png';
import useApi from '../../hooks/useApi';
import { NavLink, NavMenuButton } from './NavMenuButton';
import NotificationNavMenu from './NotificationNavMenu';

const NavUser = ({ isAuthenticated, user }: { isAuthenticated: boolean, user: User|null }) => {
  const { getFriendRequestsNotificationsApi } = useApi();
  const [friendRequestNumber, setFriendRequestNumber] = useState(0);

  const getFriendRequestsNotifications = async () => {
    const response = await getFriendRequestsNotificationsApi();

    setFriendRequestNumber(response.data.length);
  }

  useEffect(() => {
    if (isAuthenticated) {
      // setInterval(getFriendRequestsNotifications, 20000); /* @TODO broadcast it, use websocket */
    }
  }, [isAuthenticated]);

  if (null === user || false === isAuthenticated) {
    return (
      <>
        <NavLink link={'/register'} text>
          Register
        </NavLink>
        <NavLink link={'/login'} text>
          Login
        </NavLink>
      </>
    )
  }

  return (
    <>
      <RouteLink to="/zbros/add">
        <NavMenuButton
          _after={ friendRequestNumber ? {
            content: `"${friendRequestNumber}"`,
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
        } : {}}
        >
          <FaUserPlus />
        </NavMenuButton>
      </RouteLink>
      <NotificationNavMenu />
      <Menu
        autoSelect={false}
      >
        <MenuButton
          as={Button}
          rounded={'full'}
          variant={'link'}
          cursor={'pointer'}
          minW={0}
          _hover={{textDecoration: "none"}}
        >
          <Avatar
            size={'sm'}
            src={user.avatar}
            name={user.username}
          />
        </MenuButton>
        <MenuList
          alignItems={'center'}
          // w={{base: "100vw", sm: "auto"}}
        >
          <Center>
            <Flex alignItems="center" color="white">
              <Avatar src={user.avatar} name={user.username} size="sm" /> &nbsp;
              {user.username}
            </Flex>
          </Center>
          <MenuDivider />
          <MenuItem>Profile</MenuItem>
          <RouteLink to="/zbros">
            <MenuItem bg="none">My zbros</MenuItem>
          </RouteLink>
          <RouteLink to="/logout">
            <MenuItem bg="none">
              Logout
            </MenuItem>
          </RouteLink>
        </MenuList>
      </Menu>
    </>
  )
}

export default function NavComponent() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isAuthenticated = useIsAuthenticated();
  const user = useAuthUser()() as User|null;

  return (
      <Box
        bg="brand.900"
        px="0"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container px="5">
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <RouteLink to="/">
              <Image src={zbraLogoDark} w="20" alt="Zbra logo" />
            </RouteLink>

            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={3}>
                <NavMenuButton onClick={toggleColorMode}>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </NavMenuButton>

                <NavUser isAuthenticated={isAuthenticated()} user={user} />
              </Stack>
            </Flex>
          </Flex>
        </Container>
      </Box>
  );
}