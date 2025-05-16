import { useAppDispatch, useAppSelector } from '@/app/store';
import OrderSteps from '@/components/ui/OrderSteps';
import OrderSummary from '@/components/ui/OrderSummary';
import ShippingInformation from '@/components/ui/ShippingInformation';
import { axiosInstance } from '@/config';
import { Button, HStack, VStack, RadioGroup } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toaster } from '@/components/ui/toaster';
import CookieServices from '@/classes/CookieServices';
import { useNavigate } from 'react-router-dom';
import { clearCartAfterOrder } from '@/app/features/cartSlice';
const items = [
  { label: 'Cash On Delivery', value: '1' },
  { label: 'Credit Card', value: '2' },
];

const CheckoutPage = () => {
  const [value, setValue] = useState<string | null>(null);
  const { cartItems, totalPrice } = useAppSelector((state) => state.cart);
  const token = CookieServices.get('jwt');
  const { documentId } = CookieServices.get('user');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate: createOrder, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(
        '/orders',
        {
          data: {
            orders: cartItems.map((item) => ({
              productTitle: item.title,
              productPrice: item.price,
              productQuantity: item.quantity,
            })),
            totalprice: totalPrice,
            user: documentId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      dispatch(clearCartAfterOrder());
      toaster.create({
        title: 'Order created',
        description: 'Order created successfully',
        type: 'success',
      });
      navigate('/order-confirmation');
    },
  });

  return (
    <VStack padding={4} align="stretch" mt={7} gap={20}>
      <OrderSteps />
      <HStack w="full" justify={'space-between'} align="stretch" gap={16}>
        <VStack flex={'2'} align="stretch">
          <VStack padding={4} borderWidth={1} borderRadius="md" boxShadow="md">
            <h2>Shipping Information</h2>
            <ShippingInformation />
          </VStack>

          <VStack padding={4} borderWidth={1} borderRadius="md" boxShadow="md">
            <h2>Payment Method</h2>
            <RadioGroup.Root value={value} onValueChange={(e) => setValue(e.value)} w="full">
              <HStack gap="6" align="stretch" justify="space-between">
                {items.map((item) => (
                  <RadioGroup.Item key={item.value} value={item.value}>
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                  </RadioGroup.Item>
                ))}
              </HStack>
            </RadioGroup.Root>
          </VStack>
        </VStack>
        <VStack flex={'1'} align="stretch">
          <OrderSummary />

          <Button
            colorPalette="blue"
            size="lg"
            mt={4}
            w="full"
            onClick={() => createOrder()}
            loading={isPending}
          >
            Place Order
          </Button>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default CheckoutPage;
