import OrderSteps from '@/components/ui/OrderSteps';
import { Box, Button, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const OrderConfirmationPage = () => {
  return (
    <Box display="flex" flexDirection="column" padding={4} mt={20} gap={20}>
      <OrderSteps step={3} />
      <Box padding={4} textAlign="center">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Order Confirmation</h1>
        <p style={{ marginTop: '1rem' }}>Thank you for your order!</p>
        <p style={{ marginTop: '1rem' }}>
          Your order has been successfully placed, You can progress your Order From the My Order
          Page
        </p>
        <p style={{ marginTop: '1rem' }}>
          You will receive a message with all the order details in your email.
        </p>
        <HStack marginTop="2rem" alignItems="center" justifyContent="center" gap={4}>
          <Button variant="outline">
            <Link to="/products">Continue Shopping</Link>
          </Button>
          <Button colorPalette="blue" variant="outline">
            <Link to="/my-orders">My Orders</Link>
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default OrderConfirmationPage;
