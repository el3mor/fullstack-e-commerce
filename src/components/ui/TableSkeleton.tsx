import { Flex, Skeleton, Stack } from '@chakra-ui/react';

const TableSkeleton = () => {
  return (
    <Stack gap="6" width="80%">
      {Array.from({ length: 5 }).map((_, index) => (
        <Flex
          key={index}
          alignItems="center"
          justifyContent="space-between"
          border={'1px solid #333'}
          height="50px"
          rounded="md"
          padding="4"
        >
          <Skeleton h={'9px'} w={'120px'} bg={'gray'} />
          <Skeleton h={'9px'} w={'120px'} bg={'gray'} />
          <Skeleton h={'9px'} w={'120px'} bg={'gray'} />
          <Skeleton h={'9px'} w={'120px'} bg={'gray'} />
          <Skeleton h={'9px'} w={'120px'} bg={'gray'} />
          <Skeleton h={'9px'} w={'120px'} bg={'gray'} />
          <Flex>
            <Skeleton
              h={'30px'}
              w={'50px'}
              variant="shine"
              css={{
                '--start-color': 'colors.red.300',
                '--end-color': 'colors.red.500',
              }}
              mr={2}
            />
            <Skeleton
              h={'30px'}
              w={'50px'}
              variant="shine"
              css={{
                '--start-color': 'colors.blue.300',
                '--end-color': 'colors.blue.500',
              }}
            />
          </Flex>
        </Flex>
      ))}
    </Stack>
  );
};

export default TableSkeleton;
