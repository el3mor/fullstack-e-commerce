import { toggleDrawer } from '@/app/features/globalSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { Button, CloseButton, Drawer, HStack, Portal, Text, VStack } from '@chakra-ui/react';
import CartDrawerItem from './CartDrawerItem';
import { clearCart } from '@/app/features/cartSlice';
import CartEmpty from './CartEmpty';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const { isDrawerOpen } = useAppSelector((state) => state.global);
  const { cartItems, totalPrice } = useAppSelector((state) => state.cart);

  return (
    <Drawer.Root open={isDrawerOpen} onOpenChange={() => dispatch(toggleDrawer())}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Shopping Cart</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              {cartItems.length === 0 ? (
                <VStack>
                  <CartEmpty />
                </VStack>
              ) : (
                <VStack>
                  {cartItems.map((item) => (
                    <CartDrawerItem key={item.id} product={item} />
                  ))}
                </VStack>
              )}
            </Drawer.Body>
            <Drawer.Footer>
              <VStack gap="2" width="full" alignItems="flex-start">
                <Text fontWeight={'bold'}>Total: {totalPrice}$</Text>
                <HStack gap="2" width="full" justifyContent="space-between">
                  <Button
                    variant={'outline'}
                    colorPalette="red"
                    onClick={() => dispatch(clearCart())}
                    disabled={cartItems.length === 0}
                  >
                    Clear All
                  </Button>
                  <Link to={'/checkout'}>
                    <Button
                      variant={'solid'}
                      colorPalette="green"
                      disabled={cartItems.length === 0}
                    >
                      Checkout
                    </Button>
                  </Link>
                </HStack>
              </VStack>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default CartDrawer;
