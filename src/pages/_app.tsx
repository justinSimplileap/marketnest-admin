import React, { useEffect, useState } from 'react';
import '~/styles/globals.css';
import { SidebarProvider } from '~/context/SidebarContext';
import { useRouter } from 'next/router';
import AdminLayout from '~/components/layout/AdminLayout';
import { Toaster } from 'react-hot-toast';

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.ElementType;
  pageProps: any;
}) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const unprotectedRoutes = ['/', '/auth/signup', '/auth/login'];

      if (unprotectedRoutes.includes(router.pathname)) {
        if (token) {
          void router.push('/dashboard'); // Redirect to dashboard if already logged in
        }
      } else if (!token && !unprotectedRoutes.includes(router.pathname)) {
        void router.push('/auth/login'); // Redirect to login if not authenticated
      } else {
        setIsLoggedIn(!!token);
      }
    };
    checkAuthStatus();
  }, [router.pathname]);

  const unprotectedRoutes = ['/auth/signup', '/auth/login'];
  const isAuthRoute = unprotectedRoutes.includes(router.pathname);

  // Conditionally render layout
  return isAuthRoute ? (
    <Component {...pageProps} />
  ) : (
    <SidebarProvider>
      <AdminLayout>
        <Toaster />
        <Component {...pageProps} />
      </AdminLayout>
    </SidebarProvider>
  );
}

export default MyApp;
