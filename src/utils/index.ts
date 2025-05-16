import { toaster } from '@/components/ui/toaster';
import { ICartItem } from '@/interfaces';

export const addItemToShoppingCart = (cartItem: ICartItem, shoppingCartItems: ICartItem[] = []) => {
  const existingCartItem = shoppingCartItems.find((item) => item.id === cartItem.id);

  if (existingCartItem) {
    toaster.create({
      title: 'Item already in cart',
      description: 'Item already exists in your cart. Quantity updated.',
      type: 'info',
      duration: 3000,
    });
    return shoppingCartItems.map((item) =>
      item.id === cartItem.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item,
    );
  }
  toaster.create({
    title: 'Item added to cart',
    description: 'Item added to your cart successfully.',
    type: 'success',
    duration: 3000,
  });
  return [...shoppingCartItems, { ...cartItem, quantity: 1 }];
};

export const getMe = async (token: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
};
