'use client';

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Text,
  Drawer,
  DrawerContent,
  BoxProps,
  FlexProps,
  Menu,
  Portal,
} from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiMenu, FiChevronDown } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ColorModeButton, useColorModeValue } from '@/components/ui/color-mode';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import CookieServices from '@/classes/CookieServices';

interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;

  to: string;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, to: '/dashboard' },
  { name: 'Products', icon: FiTrendingUp, to: '/dashboard/products' },
  { name: 'Categoires', icon: FiCompass, to: '/dashboard/categories' },
  { name: 'Orders', icon: FiStar, to: '/dashboard/orders' },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, to }: NavItemProps) => {
  return (
    <Link to={to}>
      <Box style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'purple.400',
            color: 'white',
          }}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { username } = CookieServices.get('user');
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
      >
        <FiMenu />
      </IconButton>

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack gap={4}>
        <ColorModeButton />
        <Flex alignItems={'center'}>
          <Menu.Root>
            <Menu.Trigger py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }} asChild>
              <HStack>
                <Avatar.Root size={'sm'}>
                  <Avatar.Fallback name={username}></Avatar.Fallback>
                </Avatar.Root>
                <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" ml="2">
                  <Text fontSize="sm">{username}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.ItemGroup>
                    <Menu.Item value="profile">Profile</Menu.Item>
                    <Menu.Item value="account" onClick={() => (window.location.href = '/')}>
                      Back To Main Site
                    </Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.Separator />
                  <Menu.ItemGroup>
                    <Menu.Item
                      value="signout"
                      onClick={() => {
                        CookieServices.remove('jwt');
                        CookieServices.remove('user');
                        window.location.href = '/';
                      }}
                    >
                      Sign Out
                    </Menu.Item>
                  </Menu.ItemGroup>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Flex>
      </HStack>
    </Flex>
  );
};

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer.Root>

      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
