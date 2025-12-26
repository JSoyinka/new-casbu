
import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/home/page'));
const MessagesPage = lazy(() => import('../pages/messages/page'));
const ChatPage = lazy(() => import('../pages/chat/page'));
const SubscriptionsPage = lazy(() => import('../pages/subscriptions/page'));
const ProfilePage = lazy(() => import('../pages/profile/page'));
const HostSignupPage = lazy(() => import('../pages/host-signup/page'));
const SettingsPage = lazy(() => import('../pages/settings/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/messages',
    element: <MessagesPage />
  },
  {
    path: '/chat/:id',
    element: <ChatPage />
  },
  {
    path: '/subscriptions',
    element: <SubscriptionsPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/host-signup',
    element: <HostSignupPage />
  },
  {
    path: '/settings',
    element: <SettingsPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
