import { Card, Flex, HStack, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const ProductCardSkeleton = () => {
  return (
    <Card.Root overflow="hidden" pt="4" borderRadius="lg">
      <SkeletonCircle size="200px" mx={'auto'} />
      <Card.Body gap="4">
        <Skeleton height="20px" width="200px" mx={'auto'} />
        <SkeletonText noOfLines={3} />
        <HStack gap={10} alignItems={'end'} justifyContent={'space-between'} w={'full'} h="100%">
          <Skeleton height="30px" width="100px" borderRadius="md" />

          <Flex gap="2">
            <SkeletonCircle size="45px" />
            <SkeletonCircle size="45px" />
            <SkeletonCircle size="45px" />
          </Flex>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};

export default ProductCardSkeleton;
