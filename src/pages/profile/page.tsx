import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { signOut } from '../../lib/supabase';

export default function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, isDemoUser, loading } = useAuth();
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    if (profile?.is_creator) {
      setIsCreator(true);
    }
    if (location.state?.enableCreatorMode) {
      setIsCreator(true);
    }
  }, [location.state, profile]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const userStats = {
    subscriptions: 3,
    totalSpent: 92.97,
    messagesThisMonth: 12,
    joinDate: 'January 2024'
  };

  const demoUserData = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    initials: 'JD'
  };

  const currentUser = isDemoUser ? demoUserData : {
    name: profile?.full_name || 'User',
    email: profile?.email || '',
    initials: profile?.full_name?.split(' ').map(n => n[0]).join('') || 'U'
  };

  const menuItems = [
    { icon: 'ri-user-settings-line', title: 'Account Settings', subtitle: 'Personal information and preferences', action: () => navigate('/account-settings') },
    { icon: 'ri-notification-line', title: 'Notifications', subtitle: 'Manage your notification preferences', action: () => navigate('/notifications') },
    { icon: 'ri-shield-check-line', title: 'Privacy & Security', subtitle: 'Control your privacy settings', action: () => navigate('/privacy-security') },
    { icon: 'ri-credit-card-line', title: 'Payment Methods', subtitle: 'Manage billing and payments', action: () => navigate('/payment-methods') },
    { icon: 'ri-settings-3-line', title: 'AI Settings', subtitle: 'Customize your AI assistant', action: () => navigate('/settings') },
    { icon: 'ri-question-line', title: 'Help & Support', subtitle: 'Get help and contact support', action: () => navigate('/help-support') },
    { icon: 'ri-information-line', title: 'About', subtitle: 'App version and legal information', action: () => navigate('/about') }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm z-[100] border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <i className="ri-circuit-line text-white text-lg"></i>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '-0.02em' }}>Direct Line</h1>
            </div>
            <button 
              onClick={() => navigate('/settings')}
              className="w-10 h-10 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center hover:scale-105 transition-transform"
            >
              <i className="ri-settings-3-line text-gray-600 dark:text-gray-400 text-lg"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Profile Section */}
      <div className="pt-20 px-4 pb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">{currentUser.initials}</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{currentUser.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{currentUser.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Member since {userStats.joinDate}</p>
            </div>
          </div>

          {/* Creator Toggle */}
          {(profile?.is_creator || isDemoUser) && (
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-300">Creator Mode</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">Switch to creator dashboard</p>
              </div>
              <button
                onClick={() => {
                  setIsCreator(!isCreator);
                  if (!isCreator) {
                    navigate('/subscribers');
                  }
                }}
                className={`w-12 h-6 rounded-full transition-colors ${
                  isCreator ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  isCreator ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{userStats.subscriptions}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Subscriptions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${userStats.totalSpent}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Creator Actions */}
      {isCreator && (
        <div className="px-4 pb-6">
          <div className="bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 rounded-xl p-4 text-white">
            <h3 className="font-semibold mb-3">Creator Dashboard</h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => navigate('/host-dashboard')}
                className="bg-white/20 rounded-lg p-3 text-left"
              >
                <i className="ri-dashboard-line text-lg mb-2 block"></i>
                <span className="text-sm font-medium">Dashboard</span>
              </button>
              <button 
                onClick={() => navigate('/settings')}
                className="bg-white/20 rounded-lg p-3 text-left"
              >
                <i className="ri-robot-line text-lg mb-2 block"></i>
                <span className="text-sm font-medium">AI Assistant</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <main className="px-4 pb-20">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 text-left shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <i className={`${item.icon} text-gray-600 dark:text-gray-400 text-lg`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.subtitle}</p>
                </div>
                <i className="ri-arrow-right-s-line text-gray-400 dark:text-gray-500"></i>
              </div>
            </button>
          ))}
        </div>

        {/* Sign Out */}
        <div className="mt-8">
          <button 
            onClick={handleLogout}
            className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl p-4 font-medium border border-red-100 dark:border-red-800"
          >
            <i className="ri-logout-box-line mr-2"></i>
            Sign Out
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-4 h-16">
          <button 
            onClick={() => navigate('/')}
            className="flex flex-col items-center justify-center space-y-1 text-gray-400 dark:text-gray-500"
          >
            <i className="ri-compass-line text-lg"></i>
            <span className="text-xs">Discover</span>
          </button>
          <button 
            onClick={() => navigate('/messages')}
            className="flex flex-col items-center justify-center space-y-1 text-gray-400 dark:text-gray-500"
          >
            <i className="ri-message-3-line text-lg"></i>
            <span className="text-xs">Messages</span>
          </button>
          <button 
            onClick={() => navigate(isCreator ? '/subscribers' : '/subscriptions')}
            className="flex flex-col items-center justify-center space-y-1 text-gray-400 dark:text-gray-500"
          >
            <i className={isCreator ? 'ri-user-heart-line text-lg' : 'ri-vip-crown-line text-lg'}></i>
            <span className="text-xs">{isCreator ? 'Subscribers' : 'Subscriptions'}</span>
          </button>
          <button className="flex flex-col items-center justify-center space-y-1 text-blue-600 dark:text-blue-400">
            <i className="ri-user-line text-lg"></i>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
