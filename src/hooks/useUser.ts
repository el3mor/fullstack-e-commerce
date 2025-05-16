// useUser.ts (custom hook)
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { getMe } from '@/utils';

export const useUser = () => {
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('jwt');
    console.log(token);

    const fetchAndStoreUser = async () => {
      if (!token) return;

      try {
        const user = await getMe(token);

        // Save user info in cookies (e.g. username, email)
        cookies.remove('user');
        cookies.set('user', JSON.stringify(user), {
          path: '/',
          maxAge: 60 * 60 * 24, // 1 day
        });
      } catch (err) {
        console.error('Error fetching user:', err);
        cookies.remove('user');
      }
    };

    fetchAndStoreUser();
  }, []);
};
