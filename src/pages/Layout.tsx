import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/ui/Drawer';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <main style={{ paddingTop: '4rem' }}>
        <Outlet />
        <CartDrawer />
      </main>
    </div>
  );
};

export default RootLayout;
