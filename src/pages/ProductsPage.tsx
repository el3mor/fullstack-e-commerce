import ProductCard from '@/components/ui/ProductCard';
import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton';
import { axiosInstance } from '@/config';
import { IProduct } from '@/interfaces';
import { Grid } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

const ProductsPage = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/products?populate=categories&populate=thumbnail');
      return data;
    },
  });

  if (isLoading || error)
    return (
      <Grid templateColumns={'repeat(auto-fill, minmax(400px, 1fr))'} gap={6} margin={30}>
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </Grid>
    );

  return (
    <Grid templateColumns={'repeat(auto-fill, minmax(400px, 1fr))'} gap={6} margin={30}>
      {data.data.map((product: IProduct) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductsPage;
