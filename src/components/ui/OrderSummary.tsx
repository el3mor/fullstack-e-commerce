import { useAppSelector } from '@/app/store';
import { Box, Heading, Image } from '@chakra-ui/react';

const OrderSummary = () => {
  const { cartItems, totalPrice } = useAppSelector((state) => state.cart);
  return (
    <Box flex={'1'} p={'4'} borderWidth={1} borderRadius="md" boxShadow="md">
      <Heading fontSize={'2xl'} textTransform={'uppercase'} fontWeight={'bold'} mb={4}>
        Order Summary
      </Heading>
      <Box
        flex={'1'}
        overflowY="auto"
        minH="400px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        mt={10}
      >
        <Box display="flex" flexDirection="column" mb={4}>
          {cartItems.map((item) => {
            const { url } = item.thumbnail.formats.thumbnail;
            return (
              <Box key={item.id} display="flex" justifyContent="space-between" mb={2}>
                <Box display="flex" alignItems="center">
                  <Image
                    src={`${import.meta.env.VITE_API_URL}${url}`}
                    alt={item.title}
                    boxSize="50px"
                    objectFit="cover"
                    borderRadius="md"
                    mr={2}
                  />
                  <span style={{ fontWeight: 'bold' }}>
                    {item.title} x {item.quantity}
                  </span>
                </Box>
                <span>$ {item.price * (item.quantity ?? 1)}.00</span>
              </Box>
            );
          })}
        </Box>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <span>Total</span>
          <span>$ {totalPrice}.00</span>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderSummary;
