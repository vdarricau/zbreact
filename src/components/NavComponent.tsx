import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Avatar, Box, Button, Center, Container, Flex, Menu,
  MenuButton, MenuDivider, MenuItem, MenuList, Stack,
  useColorMode, useColorModeValue
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import {
  Link as RouteLink
} from "react-router-dom";
import User from '../@ts/User';
import { FaUserPlus } from 'react-icons/fa';

const NavLink = ({ children, link }: { children: ReactNode, link: string }) => (
  <RouteLink to={link}>
    <Button
      px={2}
      py={2}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
    >
      {children}
    </Button>
  </RouteLink>
);

const NavUser = ({ isAuthenticated, user }: { isAuthenticated: boolean, user: User|null }) => {
  if (false === isAuthenticated) {
    return (
      <>
        <NavLink link={'/register'}>
          Register
        </NavLink>
        <NavLink link={'/login'}>
          Login
        </NavLink>
      </>
    )
  }

  return (
    <>
      <NavLink link="/zbros/add">
        <FaUserPlus />
      </NavLink>
      <Menu>
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
            src={user?.avatar}
            name={user?.username}
          />
        </MenuButton>
        <MenuList alignItems={'center'}>
          <br />
          <Center>
            <Avatar
              size={'2xl'}
              src={user?.avatar}
              name={user?.username}
            />
          </Center>
          <br />
          <Center>
            <Box>{user?.email}</Box>
          </Center>
          <Center>
            <Box>{user?.username}</Box>
          </Center>
          <MenuDivider />
          <RouteLink to="/zbros">
            <MenuItem>Zbros</MenuItem>
          </RouteLink>
          <RouteLink to="/zbros/add">
            <MenuItem>Add Zbros</MenuItem>
          </RouteLink>
          <MenuItem>Account Settings</MenuItem>
          <RouteLink to="/logout">
            <MenuItem>
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
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Container px="5">
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <RouteLink to="/">
              <Box>ZBRA</Box>
            </RouteLink>

            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={7}>
                <Button onClick={toggleColorMode}>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>

                <NavUser isAuthenticated={isAuthenticated()} user={user} />
              </Stack>
            </Flex>
          </Flex>
        </Container>
      </Box>
  );
}