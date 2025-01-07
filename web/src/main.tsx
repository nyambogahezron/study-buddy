import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/css/style.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
