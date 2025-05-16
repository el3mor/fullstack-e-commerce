import { useCookies } from '@/hooks/useCookies';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: IProps) => {
  const { getCookie } = useCookies();
  const token = getCookie('jwt');
  if (token) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
