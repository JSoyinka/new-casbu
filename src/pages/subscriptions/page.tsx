import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function SubscriptionsPage() {
  const navigate = useNavigate();
  const { isDemoUser } = useAuth();
  const [activeTab, setActiveTab] = useState('active');

  const activeSubscriptions = [
    {
      id: 1,
      creatorName: 'Sarah Johnson',
      creatorImage: 'https://readdy.ai/api/search-image?query=Professional%20fitness%20influencer%20woman%20in%20athletic%20wear%2C%20bright%20studio%20lighting%2C%20confident%20pose%2C%20modern%20gym%20background%2C%20high-quality%20portrait%20photography%2C%20clean%20aesthetic%2C%20motivational%20atmosphere&width=100&height=100&seq=sub1&orientation=squarish',
      category: 'Fitness & Wellness',
      tier: 'VIP',
      price: 49.99,
      nextBilling: '2024-02-15',
      benefits: ['Unlimited messaging', 'Weekly 1:1 calls', 'Custom workout plans', 'Priority support'],
      gradient: 'from-emerald-400 to-cyan-400',
      engagement: 95
    },
    {
      id: 2,
      creatorName: 'Marcus Chen',
      creatorImage: 'https://readdy.ai/api/search-image?query=Professional%20tech%20expert%20man%20in%20casual%20business%20attire%2C%20modern%20office%20background%2C%20friendly%20smile%2C%20laptop%20and%20gadgets%20visible%2C%20clean%20professional%20lighting%2C%20contemporary%20workspace&width=100&height=100&seq=sub2&orientation=squarish',
      category: 'Technology',
      tier: 'Pro',
      price: 29.99,
      nextBilling: '2024-02-20',
      benefits: ['Monthly AMAs', 'Code reviews', 'Tech resources', 'Community access'],
      gradient: 'from-blue-400 to-indigo-500',
      engagement: 87
    },
    {
      id: 3,
      creatorName: 'Emma Rodriguez',
      creatorImage: 'https://readdy.ai/api/search-image?query=Creative%20artist%20woman%20in%20art%20studio%2C%20colorful%20paintings%20in%20background%2C%20artistic%20lighting%2C%20paint%20brushes%20and%20palette%20visible%2C%20inspiring%20creative%20workspace%2C%20professional%20portrait&width=100&height=100&seq=sub3&orientation=squarish',
      category: 'Art & Design',
      tier: 'Basic',
      price: 12.99,
      nextBilling: '2024-02-18',
      benefits: ['Weekly tutorials', 'Art critiques', 'Resource library', 'Community access'],
      gradient: 'from-pink-400 to-rose-500',
      engagement: 78
    }
  ];

  // Only show subscriptions for demo users
  const displayedSubscriptions = isDemoUser ? activeSubscriptions : [];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'VIP': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'Pro': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      case 'Basic': return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
    }
  };

  const getTotalSpending = () => {
    return displayedSubscriptions.reduce((total, sub) => total + sub.price, 0);
  };

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 90) return 'from-green-400 to-emerald-500';
    if (engagement >= 80) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  const getMessageCount = () => {
    return isDemoUser ? 47 : 0;
  };

  const getAvgRating = () => {
    return isDemoUser ? 4.9 : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm z-[100] border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="ri-cpu-line text-white text-sm"></i>
              </div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.05em' }}>
                DirectLine
              </h1>
            </div>
            <button 
              onClick={() => navigate('/settings')}
              className="w-8 h-8 flex items-center justify-center"
            >
              <i className="ri-settings-3-line text-gray-600 dark:text-gray-400 text-lg"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Stats Card with Experimental Design */}
      <div className="pt-20 px-4 pb-6">
        <div className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-3xl p-6 text-white overflow-hidden shadow-2xl">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 right-8 w-16 h-16 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 left-12 w-8 h-8 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="absolute top-12 left-20 w-4 h-4 bg-cyan-300 rounded-full animate-ping"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-baseline space-x-2 mb-2">
                  <h2 className="text-3xl font-bold">${getTotalSpending().toFixed(2)}</h2>
                  {isDemoUser && (
                    <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      <i className="ri-arrow-up-line text-xs"></i>
                      <span className="text-xs">+12%</span>
                    </div>
                  )}
                </div>
                <p className="text-purple-100">Monthly spending</p>
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <i className="ri-vip-crown-line text-white text-2xl"></i>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3">
                <p className="text-purple-100 text-xs mb-1">Active</p>
                <p className="text-2xl font-bold">{displayedSubscriptions.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3">
                <p className="text-purple-100 text-xs mb-1">Messages</p>
                <p className="text-2xl font-bold">{getMessageCount()}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3">
                <p className="text-purple-100 text-xs mb-1">Avg Rating</p>
                <div className="flex items-center space-x-1">
                  <p className="text-2xl font-bold">{getAvgRating()}</p>
                  {isDemoUser && <i className="ri-star-fill text-yellow-300 text-sm"></i>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filter Tabs */}
      <div className="px-4 pb-4">
        <div className="flex space-x-1 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-1 border border-gray-200/50 dark:border-gray-700/50">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeTab === 'active' 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-lg scale-105' 
                : 'text-gray-600 dark:text-gray-400 hover:scale-105'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Active</span>
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{displayedSubscriptions.length}</span>
              </div>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('expired')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeTab === 'expired' 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-lg scale-105' 
                : 'text-gray-600 dark:text-gray-400 hover:scale-105'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Expired</span>
              <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">0</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Enhanced Subscriptions List */}
      <main className="px-4 pb-20">
        {activeTab === 'active' && (
          <>
            {displayedSubscriptions.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <i className="ri-vip-crown-line text-white text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">No Active Subscriptions</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 px-4">Start subscribing to creators to see your subscriptions here</p>
                <button 
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition-transform shadow-lg"
                >
                  Discover Creators
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {displayedSubscriptions.map((subscription, index) => (
                  <div key={subscription.id} className="group relative">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group-hover:scale-[1.02]">
                      {/* Background Gradient */}
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${subscription.gradient} rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                      
                      <div className="relative">
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="relative">
                            <img 
                              src={subscription.creatorImage} 
                              alt={subscription.creatorName}
                              className="w-20 h-20 rounded-2xl object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{subscription.creatorName}</h3>
                              <span className={`text-xs px-3 py-1 rounded-full ${getTierColor(subscription.tier)} shadow-sm`}>
                                {subscription.tier}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{subscription.category}</p>
                            
                            {/* Engagement Score */}
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs text-gray-500 dark:text-gray-400">Engagement</span>
                                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{subscription.engagement}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div 
                                    className={`bg-gradient-to-r ${getEngagementColor(subscription.engagement)} h-2 rounded-full transition-all duration-500`}
                                    style={{ width: `${subscription.engagement}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-baseline space-x-1">
                                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">${subscription.price}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">/month</span>
                              </div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">Next: {subscription.nextBilling}</span>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Benefits */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">What you get:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {subscription.benefits.map((benefit, benefitIndex) => (
                              <div key={benefitIndex} className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-2">
                                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                  <i className="ri-check-line text-white text-xs"></i>
                                </div>
                                <span className="text-xs text-gray-600 dark:text-gray-400">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Enhanced Actions */}
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => navigate(`/chat/${subscription.id}`)}
                            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-2xl text-sm font-medium hover:scale-105 transition-transform shadow-lg flex items-center justify-center space-x-2"
                          >
                            <i className="ri-message-3-line"></i>
                            <span>Message</span>
                          </button>
                          <button className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-3 px-4 rounded-2xl text-sm font-medium hover:scale-105 transition-transform flex items-center justify-center space-x-2">
                            <i className="ri-settings-line"></i>
                            <span>Manage</span>
                          </button>
                          <button className="px-4 py-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl hover:scale-105 transition-transform">
                            <i className="ri-close-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'expired' && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <i className="ri-time-line text-gray-400 dark:text-gray-500 text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">No expired subscriptions</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">All your subscriptions are active and up to date</p>
            <div className="flex items-center justify-center space-x-2 text-green-500">
              <i className="ri-check-line"></i>
              <span className="text-sm font-medium">You're all set!</span>
            </div>
          </div>
        )}

        {/* Enhanced Quick Actions */}
        {displayedSubscriptions.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => navigate('/')}
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 text-left shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <i className="ri-add-line text-white text-xl"></i>
                </div>
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Find Creators</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Discover new creators</p>
              </button>
              <button className="bg-white dark:bg-gray-800 rounded-3xl p-6 text-left shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <i className="ri-settings-line text-white text-xl"></i>
                </div>
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Billing Settings</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Manage payments</p>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Enhanced Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="grid grid-cols-4 h-16">
          <button 
            onClick={() => navigate('/')}
            className="flex flex-col items-center justify-center space-y-1 text-gray-400 dark:text-gray-500 hover:scale-110 transition-transform duration-300"
          >
            <i className="ri-compass-line text-lg"></i>
            <span className="text-xs">Discover</span>
          </button>
          <button 
            onClick={() => navigate('/messages')}
            className="flex flex-col items-center justify-center space-y-1 text-gray-400 dark:text-gray-500 hover:scale-110 transition-transform duration-300"
          >
            <i className="ri-message-3-line text-lg"></i>
            <span className="text-xs">Messages</span>
          </button>
          <button className="flex flex-col items-center justify-center space-y-1 text-purple-600 dark:text-purple-400 scale-110 transition-transform duration-300">
            <i className="ri-vip-crown-line text-lg"></i>
            <span className="text-xs">Subscriptions</span>
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center justify-center space-y-1 text-gray-400 dark:text-gray-500 hover:scale-110 transition-transform duration-300"
          >
            <i className="ri-user-line text-lg"></i>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
