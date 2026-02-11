import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function SubscribersPage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.is_creator) {
      fetchSubscribers();
    }
  }, [profile]);

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select(`
          *,
          subscriber:subscriber_id (
            id,
            full_name,
            email,
            profile_image_url
          )
        `)
        .eq('creator_id', profile?.id)
        .eq('status', 'active');

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 3: return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 2: return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      case 1: return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
    }
  };

  const getTierName = (tier: number) => {
    switch (tier) {
      case 3: return 'VIP';
      case 2: return 'Pro';
      case 1: return 'Basic';
      default: return 'Basic';
    }
  };

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
            <button className="w-10 h-10 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center hover:scale-105 transition-transform">
              <i className="ri-search-line text-gray-600 dark:text-gray-400 text-lg"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Stats Card */}
      <div className="pt-20 px-4 pb-6">
        <div className="relative bg-gradient-to-br from-blue-500 via-blue-700 to-purple-600 rounded-3xl p-6 text-white overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-baseline space-x-2 mb-2">
                  <h2 className="text-3xl font-bold">{subscribers.length}</h2>
                </div>
                <p className="text-blue-100">Total Subscribers</p>
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <i className="ri-user-heart-line text-white text-2xl"></i>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3">
                <p className="text-blue-100 text-xs mb-1">VIP</p>
                <p className="text-2xl font-bold">{subscribers.filter(s => s.tier_level === 3).length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3">
                <p className="text-blue-100 text-xs mb-1">Pro</p>
                <p className="text-2xl font-bold">{subscribers.filter(s => s.tier_level === 2).length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3">
                <p className="text-blue-100 text-xs mb-1">Basic</p>
                <p className="text-2xl font-bold">{subscribers.filter(s => s.tier_level === 1).length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscribers List */}
      <main className="px-4 pb-20">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : subscribers.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <i className="ri-user-add-line text-gray-400 dark:text-gray-500 text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">No subscribers yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Share your profile to start growing your audience</p>
          </div>
        ) : (
          <div className="space-y-3">
            {subscribers.map((subscription) => (
              <div key={subscription.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {subscription.subscriber?.full_name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {subscription.subscriber?.full_name || 'User'}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {subscription.subscriber?.email}
                    </p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${getTierColor(subscription.tier_level)}`}>
                    {getTierName(subscription.tier_level)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50">
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
          <button className="flex flex-col items-center justify-center space-y-1 text-blue-600 dark:text-blue-400">
            <i className="ri-user-heart-line text-lg"></i>
            <span className="text-xs">Subscribers</span>
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center justify-center space-y-1 text-gray-400 dark:text-gray-500"
          >
            <i className="ri-user-line text-lg"></i>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
