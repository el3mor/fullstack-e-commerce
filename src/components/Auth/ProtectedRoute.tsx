import { useCookies } from '@/hooks/useCookies';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface IProps {
  children: ReactNode;
  admin?: boolean;
  isLogin?: boolean;
}

const ProtectedRoute = ({ children, admin, isLogin }: IProps) => {
  const { getCookie } = useCookies();
  const token = getCookie('jwt');
  const user = getCookie('user');

  if (token) {
    if (admin) {
      if (user?.role.name === 'Admin') return children; // if user is not admin, redirect to home
    } else if (isLogin) {
      return <Navigate to="/" replace />;
    } else {
      return children;
    }
  }
};

export default ProtectedRoute;
