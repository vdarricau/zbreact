import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Avatar, Box, Button, Center, Flex, Link, Menu,
  MenuButton, MenuDivider, MenuItem, MenuList, Stack,
  useColorMode, useColorModeValue
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User } from '../hooks/useUser';

const NavLink = ({ children, link }: { children: ReactNode, link: string }) => (
  <Link
    px={2}
    py={2}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={link}>
    {children}
  </Link>
);

const NavUser = ({ isAuthenticated, user }: { isAuthenticated: boolean, user: User|null }) => {

  if (false === isAuthenticated) {
    return (
      <>
        <NavLink link={'/login'}>
          Login
        </NavLink>
      </>
    )
  }

  return (
    <>
      <NavLink link={'/zbros'}>
        Zbros
      </NavLink>

        <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}>
            <Avatar
              size={'sm'}
              src={'https://avatars.dicebear.com/api/male/username.svg'}
            />
          </MenuButton>
          <MenuList alignItems={'center'}>
            <br />
            <Center>
              <Avatar
                size={'2xl'}
                src={'https://avatars.dicebear.com/api/male/username.svg'}
              />
            </Center>
            <br />
            <Center>
              <p>{user?.email}</p>
            </Center>
            <br />
            <MenuDivider />
            <MenuItem>Your Servers</MenuItem>
            <MenuItem>Account Settings</MenuItem>
            <MenuItem as="a" href="/logout">Logout</MenuItem>
          </MenuList>
        </Menu>
    </>
  )
}

export default function NavComponent() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isAuthenticated, user } = useAuth();
  
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>Zbra</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <NavUser isAuthenticated={isAuthenticated()} user={user} />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}