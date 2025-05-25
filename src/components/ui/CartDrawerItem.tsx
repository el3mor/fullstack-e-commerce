import { Badge, Box, Button, Card, HStack, Image } from '@chakra-ui/react';
import NumberInput from '@/components/ui/NumberInput';
import { LuTrash } from 'react-icons/lu';
import { ICartItem } from '@/interfaces';
import { useAppDispatch } from '@/app/store';
import { removeFromCart } from '@/app/features/cartSlice';

interface IProps {
  product: ICartItem;
}

const CartDrawerItem = ({ product }: IProps) => {
  const { id, title, price, quantity, thumbnail } = product;
  const dispatch = useAppDispatch();
  const { url } = thumbnail.formats.thumbnail;
  return (
    <Card.Root flexDirection="row" maxW="xl" height="130px">
      <Image objectFit="cover" maxW="70px" src={`${url}`} alt={title} />
      <Box p="0" height="full">
        <Card.Body py="2" display="flex" flexDirection="column">
          <Card.Title mb="1" fontSize={'md'}>
            {title}
          </Card.Title>
          <HStack gap="2" alignItems="center" justifyContent="space-between">
            <Badge colorPalette="green" variant="solid">
              {price}$
            </Badge>
            <NumberInput quantity={quantity} productId={id} />
          </HStack>
        </Card.Body>
        <Card.Footer>
          <Button
            colorPalette={'red'}
            w="full"
            variant="outline"
            onClick={() => dispatch(removeFromCart(id))}
          >
            <LuTrash /> Remove
          </Button>
        </Card.Footer>
      </Box>
    </Card.Root>
  );
};

export default CartDrawerItem;
