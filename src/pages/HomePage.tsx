import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/config';
import ProductCard from '@/components/ui/ProductCard';
import { IProduct } from '@/interfaces';
import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton';
const HomePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['latest-products'],
    queryFn: async () => {
      const response = await axiosInstance.get('/products?limit=4&sort=createdAt:desc&populate=*');
      return response.data;
    },
  });

  return (
    <Box display={'flex'} flexDir={'column'} h={'100vh'} mt={50} gap={50} w={'full'}>
      <VStack gap={10} alignItems={'center'}>
        <Heading fontSize={'4xl'}>HomePage</Heading>
        <Text fontSize={'2xl'}>Welcome to the HomePage</Text>
      </VStack>
      <VStack alignItems={'start'} mx={10} gap={10} mt={10}>
        <Heading fontSize={'4xl'}>Latest Products</Heading>
        <Grid templateColumns={'repeat(auto-fill, minmax(400px, 1fr))'} gap={6} w={'full'}>
          {!isLoading ? (
            data.data.map((product: IProduct) => <ProductCard key={product.id} product={product} />)
          ) : (
            <>
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </>
          )}
        </Grid>
      </VStack>
    </Box>
  );
};

export default HomePage;
