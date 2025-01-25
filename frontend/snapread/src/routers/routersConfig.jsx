import React from 'react';

const routersConfig = {
  home: {
    path: '/',
    component: React.lazy(() => import('../pages/auth/AuthPage')),
    requiredRole: null,
  },
  auth: {
    path: '/auth',
    component: React.lazy(() => import('../pages/auth/AuthPage')),
    requiredRole: null,
  },
  dashboard: {
    path: '/dashboard',
    component: React.lazy(() => import('../pages/main/DashboardPage')),
    requiredRole: null,
  },
  invoices: {
    path: '/invoices',
    component: React.lazy(() => import('../pages/invoice/InvoicePage')),
    requiredRole: null,
  },
};

export default routersConfig;
