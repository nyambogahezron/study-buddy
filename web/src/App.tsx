import MainLayout from './Layouts/mainLayout';
import { Outlet } from 'react-router-dom';
import { getUser } from './store/useUserStore';
import React from 'react';

export default function App() {
  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
}
