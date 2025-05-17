import { useCookies } from '@/hooks/useCookies';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface IProps {
  children: ReactNode;
  admin?: boolean;
  loginOrSignup?: boolean;
}

const ProtectedRoute = ({ children, admin, loginOrSignup }: IProps) => {
  const { getCookie } = useCookies();
  const token = getCookie('jwt');
  const user = getCookie('user');
  console.log('user', user);
  if (token) {
    if (admin) {
      console.log('admin');
      if (user?.role.name !== 'Admin') return <Navigate to="/" replace />; // if user is not admin, redirect to home
    } else {
      console.log('no admin');
      return <Navigate to="/" replace />;
    }
  } else {
    if (loginOrSignup) {
      return children;
    } else {
      return <Navigate to="/login" replace />;
    }
  }
  return children;
};

export default ProtectedRoute;
