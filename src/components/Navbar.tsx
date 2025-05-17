import { Box, Button, Flex } from '@chakra-ui/react';
import { ColorModeButton, useColorMode, useColorModeValue } from './ui/color-mode';
import { Link } from 'react-router-dom';
import { useCookies } from '@/hooks/useCookies';
import Avater from './ui/Avater';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { toggleDrawer } from '@/app/features/globalSlice';
import CookieServices from '@/classes/CookieServices';

const token = CookieServices.get('jwt');
const user = CookieServices.get('user');
// let Links;
// if (!token) {
//   Links = ['Products'];
// } else {
//   if (user.role) {
//     Links = user?.role.name === 'Admin' ? ['Dashboard', 'Products'] : ['Products'];
//   } else {
//     Links = ['Products'];
//   }
// }

const Links = [
  {
    name: 'Products',
    path: '/products',
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
  },
];

const NavLink = ({ children }: { children: string }) => {
  return (
    <Link to={`/${children.toLowerCase()}`}>
      <Button
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        variant={'ghost'}
      >
        {children}
      </Button>
    </Link>
  );
};

const Navbar = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { getCookie } = useCookies();
  const { colorMode } = useColorMode();
  const dispatch = useAppDispatch();
  const token = getCookie('jwt');
  return (
    <Box
      as={'header'}
      w={'100%'}
      color={colorMode !== 'light' ? 'white' : 'black'}
      bg={useColorModeValue('gray.100', 'gray.900')}
      position={'fixed'}
      top={0}
      left={0}
      zIndex={1000}
      px={4}
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Flex alignItems={'center'}>
          <Link to="/">Home</Link>
          <Flex gap={4} ml={10}>
            {Links.map((link) => (
              <NavLink key={link.name}>{link.name}</NavLink>
            ))}
          </Flex>
        </Flex>
        <Flex alignItems={'center'} justifyContent={'space-between'} gap={4}>
          <ColorModeButton />
          {!token && (
            <>
              <Link to={'/login'}>
                <Button
                  variant={'surface'}
                  colorScheme="teal"
                  size="sm"
                  fontWeight={'bold'}
                  textTransform={'uppercase'}
                >
                  LogIn
                </Button>
              </Link>
              <Link to={'/signup'}>
                <Button
                  variant={'surface'}
                  colorScheme="teal"
                  size="sm"
                  fontWeight={'bold'}
                  textTransform={'uppercase'}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          {token && (
            <>
              <Button
                variant={'surface'}
                colorScheme="teal"
                size="sm"
                fontWeight={'bold'}
                textTransform={'uppercase'}
                onClick={() => dispatch(toggleDrawer())}
              >
                Cart {cartItems.length}
              </Button>
              <Avater />
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
