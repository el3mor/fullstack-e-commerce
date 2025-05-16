import { addToCart } from '@/app/features/cartSlice';
import { useAppDispatch } from '@/app/store';
import { useColorModeValue } from '@/components/ui/color-mode';
import ProductDetailsSkeleton from '@/components/ui/ProductDetailsSkeleton';
import { axiosInstance } from '@/config';
import { ICategory } from '@/interfaces';
import { Image, HStack, Flex, Heading, Text, Button } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';

const ProductsDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const bgCategory = useColorModeValue('gray.100', 'gray.700');
  const { data, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/products/${id}?populate=categories&populate=thumbnail&fields=title,description,price`,
      );
      return data;
    },
  });

  const goBack = () => navigate(-1);
  const handleAddToCart = () => {
    dispatch(addToCart(data.data));
  };

  useEffect(() => {
    if (data) {
      document.title = `Product - ${data.data.title}`;
    }
  }, [data]);

  if (isLoading) return <ProductDetailsSkeleton />;
  if (!data) return <div>Product not found</div>;

  const { url } = data.data.thumbnail;

  return (
    <HStack
      justifyContent={'space-between'}
      w={'7xl'}
      mx={'auto'}
      alignItems={'start'}
      flexDir="column"
      py={10}
    >
      <Button bg="none" variant={'plain'} size="lg" mb={2} onClick={goBack}>
        <BiArrowBack size={20} />
        Back
      </Button>
      <Flex
        gap={50}
        alignItems={'center'}
        justifyContent={'space-evenly'}
        w={'full'}
        flexDir={{ base: 'column', md: 'row' }}
      >
        <Image
          src={`${url}`}
          alt="test"
          width="40%"
          height="400px"
          objectFit="fill"
          borderRadius={'lg'}
          boxShadow={'lg'}
          loading="lazy"
          objectPosition={'center'}
        />

        <Flex
          alignItems={'start'}
          justifyContent={'start'}
          gap={7}
          flexDir={'column'}
          px={{ base: 10, md: 0 }}
        >
          <Heading fontWeight={'extrabold'} fontSize={'5xl'} textTransform={'uppercase'}>
            {data.data.title}
          </Heading>
          <Text
            fontSize={'lg'}
            fontWeight={'medium'}
            letterSpacing={'wider'}
            mt="2"
            color="gray.300"
          >
            {data.data.description}
          </Text>
          <HStack gap={10} alignItems={'center'} justifyContent={'space-between'} w={'full'}>
            <Text fontSize={'2xl'} fontWeight={'bolder'} letterSpacing={'tight'}>
              {data.data.price} $
            </Text>
            <Flex gap="2">
              {data.data.categories.map((category: ICategory) => (
                <Text
                  key={category.id}
                  textStyle="md"
                  fontWeight="bolder"
                  letterSpacing="tight"
                  textTransform="capitalize"
                  bg={bgCategory}
                  p="2"
                  borderRadius="md"
                >
                  {category.title}
                </Text>
              ))}
            </Flex>
          </HStack>
          <Button
            textTransform={'uppercase'}
            fontWeight={'bold'}
            colorScheme="light"
            size="lg"
            w="3/5"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Flex>
      </Flex>
    </HStack>
  );
};

export default ProductsDetailsPage;
