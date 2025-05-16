import { HStack, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const ProductDetailsSkeleton = () => {
  return (
    <HStack
      justifyContent={'space-between'}
      w={'7xl'}
      mx={'auto'}
      py={10}
      gap={10}
      alignItems={'center'}
      flexDir={{ base: 'column', md: 'row' }}
    >
      <Skeleton width={{ base: '100%', md: '40%' }} height="400px" borderRadius="lg" />
      <HStack
        gap={10}
        alignItems={'start'}
        justifyContent={'space-between'}
        w={'full'}
        flexDir={'column'}
      >
        <Skeleton height="40px" width="100%" borderRadius="lg" />
        <SkeletonText noOfLines={4} width="100%" />
        <HStack gap={10} alignItems={'center'} justifyContent={'space-between'} w={'full'}>
          <Skeleton height="40px" width="100px" borderRadius="lg" />
          <HStack gap={2}>
            <SkeletonCircle size="30px" />
            <SkeletonCircle size="30px" />
            <SkeletonCircle size="30px" />
          </HStack>
        </HStack>
        <Skeleton height="40px" width="3/5" borderRadius="lg" />
      </HStack>
    </HStack>
  );
};

export default ProductDetailsSkeleton;
