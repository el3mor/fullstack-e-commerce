import { Card, Image, Text, Flex, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useColorMode, useColorModeValue } from './color-mode';
import { IProduct } from '@/interfaces';

interface IProductCard {
  product: IProduct;
}

const ProductCard = ({ product }: IProductCard) => {
  const { colorMode } = useColorMode();
  const { title, description, price, categories, thumbnail } = product;
  const { url } = thumbnail || {};
  const bgCategory = useColorModeValue('gray.100', 'gray.700');

  return (
    <Link to={`/products/${product.documentId}`} style={{ textDecoration: 'none' }}>
      <Card.Root
        overflow="hidden"
        borderRadius="lg"
        boxShadow="md"
        _hover={{
          textDecoration: 'none',
          boxShadow: 'lg',
          bg: colorMode !== 'light' ? 'gray.950' : 'gray.300',
        }}
        gap="2"
        transitionDuration="0.2s"
        bg="none"
        h="450px"
      >
        {url && (
          <Image
            src={`${url}`}
            alt={description}
            width="100%"
            height="200px"
            objectPosition="center"
            mx="auto"
            objectFit="fill"
          />
        )}
        <Card.Body gap="2">
          <Card.Title
            textAlign={'center'}
            fontSize={'2xl'}
            fontWeight="extrabold"
            textTransform={'uppercase'}
          >
            {title}
          </Card.Title>
          <Card.Description>{description}</Card.Description>
          <HStack gap={10} alignItems={'end'} justifyContent={'space-between'} w={'full'} h="100%">
            <Text textStyle="2xl" fontWeight="bolder" letterSpacing="tight">
              ${price}
            </Text>
            {categories.length > 0 && (
              <Flex gap="2" alignItems={'center'} justifyContent={'space-between'}>
                {categories.map((category) => (
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
            )}
          </HStack>
        </Card.Body>
      </Card.Root>
    </Link>
  );
};

export default ProductCard;
