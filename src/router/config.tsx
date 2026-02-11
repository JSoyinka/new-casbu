import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/home/page'));
const LoginPage = lazy(() => import('../pages/login/page'));
const MessagesPage = lazy(() => import('../pages/messages/page'));
const ChatPage = lazy(() => import('../pages/chat/page'));
const SubscriptionsPage = lazy(() => import('../pages/subscriptions/page'));
const SubscribersPage = lazy(() => import('../pages/subscribers/page'));
const ProfilePage = lazy(() => import('../pages/profile/page'));
const CreatorProfilePage = lazy(() => import('../pages/creator-profile/page'));
const HostSignupPage = lazy(() => import('../pages/host-signup/page'));
const SettingsPage = lazy(() => import('../pages/settings/page'));
const AccountSettingsPage = lazy(() => import('../pages/account-settings/page'));
const NotificationsPage = lazy(() => import('../pages/notifications/page'));
const PrivacySecurityPage = lazy(() => import('../pages/privacy-security/page'));
const PaymentMethodsPage = lazy(() => import('../pages/payment-methods/page'));
const HelpSupportPage = lazy(() => import('../pages/help-support/page'));
const AboutPage = lazy(() => import('../pages/about/page'));
const HostDashboardPage = lazy(() => import('../pages/host-dashboard/page'));
const ClaimPhoneNumberPage = lazy(() => import('../pages/claim-phone-number/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <LoginPage />
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
    path: '/subscribers',
    element: <SubscribersPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/creator/:id',
    element: <CreatorProfilePage />
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
    path: '/account-settings',
    element: <AccountSettingsPage />
  },
  {
    path: '/notifications',
    element: <NotificationsPage />
  },
  {
    path: '/privacy-security',
    element: <PrivacySecurityPage />
  },
  {
    path: '/payment-methods',
    element: <PaymentMethodsPage />
  },
  {
    path: '/help-support',
    element: <HelpSupportPage />
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/host-dashboard',
    element: <HostDashboardPage />
  },
  {
    path: '/claim-phone-number',
    element: <ClaimPhoneNumberPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
