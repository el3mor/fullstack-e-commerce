import { useEffect, useId, useState } from 'react';
import { toaster } from '@/components/ui/toaster';
const InterworkConnectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const id = useId();

  function closeAllToasters() {
    toaster.remove(id);
  }

  function createToaster() {
    toaster.create({
      id: id,
      title: 'No internet connection',
      description: 'Please check your internet connection and try again.',
      type: 'warning',
    });
    toaster.pause(id);
  }

  const setOnline = () => {
    setIsConnected(true);
    closeAllToasters();
  };

  const setOffline = () => {
    setIsConnected(false);
    createToaster();
  };

  useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, [isConnected]);

  if (!isConnected) {
    return <>{children}</>;
  }

  return children;
};

export default InterworkConnectionProvider;
