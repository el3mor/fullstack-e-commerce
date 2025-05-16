import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Toaster } from './components/ui/toaster';
import { useUser } from './hooks/useUser';
function App() {
  useUser();
  return (
    <main>
      <RouterProvider router={router} />
      <Toaster />
    </main>
  );
}

export default App;
