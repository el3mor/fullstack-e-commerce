import { decrementQuantity, incrementQuantity } from '@/app/features/cartSlice';
import { useAppDispatch } from '@/app/store';
import { HStack, IconButton, NumberInput as ChakraNumberInput } from '@chakra-ui/react';
import { LuMinus, LuPlus } from 'react-icons/lu';

const NumberInput = ({
  quantity,
  productId,
}: {
  quantity: number | undefined;
  productId: number;
}) => {
  const dispatch = useAppDispatch();
  return (
    <ChakraNumberInput.Root
      defaultValue="3"
      unstyled
      spinOnPress={false}
      value={quantity !== undefined ? String(quantity) : undefined}
    >
      <HStack gap="2">
        <ChakraNumberInput.DecrementTrigger
          asChild
          onClick={() => dispatch(decrementQuantity(productId))}
        >
          <IconButton variant="outline" size="xs">
            <LuMinus />
          </IconButton>
        </ChakraNumberInput.DecrementTrigger>
        <ChakraNumberInput.ValueText textAlign="center" fontSize="sm" minW="3ch" />
        <ChakraNumberInput.IncrementTrigger
          asChild
          onClick={() => dispatch(incrementQuantity(productId))}
        >
          <IconButton variant="outline" size="xs">
            <LuPlus />
          </IconButton>
        </ChakraNumberInput.IncrementTrigger>
      </HStack>
    </ChakraNumberInput.Root>
  );
};

export default NumberInput;
