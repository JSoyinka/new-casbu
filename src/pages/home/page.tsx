import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { user, isDemoUser, setDemoUser, loading } = useAuth();
  const [hasUnreadNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');

  // Auto-login as demo user ONLY if not authenticated with Supabase
  useEffect(() => {
    if (!loading && !user && !isDemoUser) {
      setDemoUser(true);
    }
  }, [loading, user, isDemoUser, setDemoUser]);

  const featuredCreators = [
    {
      id: 1,
      name: 'Sarah Johnson',
      category: 'Fitness & Wellness',
      subscribers: '12.5K',
      image: 'https://readdy.ai/api/search-image?query=Professional%20fitness%20influencer%20woman%20in%20athletic%20wear%2C%20bright%20studio%20lighting%2C%20confident%20pose%2C%20modern%20gym%20background%2C%20high-quality%20portrait%20photography%2C%20clean%20aesthetic%2C%20motivational%20atmosphere&width=300&height=300&seq=creator1&orientation=squarish',
      tier1Price: 9.99,
      tier2Price: 19.99,
      tier3Price: 49.99,
      description: 'Personal trainer helping you achieve your fitness goals',
      gradient: 'from-emerald-400 to-cyan-400'
    },
    {
      id: 2,
      name: 'Marcus Chen',
      category: 'Tech & Innovation',
      subscribers: '8.2K',
      image: 'https://readdy.ai/api/search-image?query=Professional%20tech%20expert%20man%20in%20casual%20business%20attire%2C%20modern%20office%20background%2C%20friendly%20smile%2C%20laptop%20and%20gadgets%20visible%2C%20clean%20professional%20lighting%2C%20contemporary%20workspace&width=300&height=300&seq=creator2&orientation=squarish',
      tier1Price: 14.99,
      tier2Price: 29.99,
      tier3Price: 79.99,
      description: 'Software engineer sharing coding tips and tech insights',
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      category: 'Art & Design',
      subscribers: '15.8K',
      image: 'https://readdy.ai/api/search-image?query=Creative%20artist%20woman%20in%20art%20studio%2C%20colorful%20paintings%20in%20background%2C%20artistic%20lighting%2C%20paint%20brushes%20and%20palette%20visible%2C%20inspiring%20creative%20workspace%2C%20professional%20portrait&width=300&height=300&seq=creator3&orientation=squarish',
      tier1Price: 12.99,
      tier2Price: 24.99,
      tier3Price: 59.99,
      description: 'Digital artist teaching creative techniques and inspiration',
      gradient: 'from-pink-400 to-rose-500'
    }
  ];

  const categories = [
    { name: 'Fitness', icon: 'ri-heart-pulse-line', count: '2.1K', color: 'from-emerald-400 to-teal-500' },
    { name: 'Tech', icon: 'ri-code-line', count: '1.8K', color: 'from-blue-400 to-cyan-500' },
    { name: 'Art', icon: 'ri-palette-line', count: '3.2K', color: 'from-pink-400 to-purple-500' },
    { name: 'Music', icon: 'ri-music-line', count: '1.5K', color: 'from-yellow-400 to-orange-500' },
    { name: 'Gaming', icon: 'ri-gamepad-line', count: '2.8K', color: 'from-indigo-400 to-purple-500' },
    { name: 'Cooking', icon: 'ri-restaurant-line', count: '1.9K', color: 'from-red-400 to-pink-500' }
  ];

  const trendingTopics = [
    { name: 'AI & Machine Learning', growth: '+127%', color: 'bg-gradient-to-r from-cyan-400 to-blue-500' },
    { name: 'Sustainable Living', growth: '+89%', color: 'bg-gradient-to-r from-green-400 to-emerald-500' },
    { name: 'Digital Art NFTs', growth: '+156%', color: 'bg-gradient-to-r from-purple-400 to-pink-500' }
  ];

  // Only show featured creators for demo users
  const displayedCreators = isDemoUser ? featuredCreators : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
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
              onClick={() => navigate('/notifications')}
              className="w-8 h-8 flex items-center justify-center relative"
            >
              <i className="ri-notification-line text-gray-600 dark:text-gray-400 text-lg"></i>
              {hasUnreadNotifications && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-20">
        {/* Hero Section with Animated Background */}
        <div className="relative px-4 py-8 bg-gradient-to-br from-blue-500 via-blue-700 to-purple-600 text-white overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-16 w-12 h-12 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="absolute bottom-16 left-20 w-16 h-16 bg-pink-300 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-8 h-8 bg-cyan-300 rounded-full animate-bounce"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-3 animate-fade-in">Connect with Amazing Creators</h2>
            <p className="text-blue-100 mb-6 text-lg">Get exclusive access to your favorite influencers and experts</p>
            <div className="flex space-x-3">
              <button 
                onClick={() => navigate('/host-signup')}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-2xl font-medium border border-white/30 hover:bg-white/30 transition-all hover:scale-105"
              >
                Become a Creator
              </button>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-2xl font-medium hover:scale-105 transition-transform shadow-lg">
                Explore Now
              </button>
            </div>
          </div>
        </div>

        {/* Trending Topics - Experimental Design */}
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🔥 Trending Now</h3>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Live</span>
            </div>
          </div>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {trendingTopics.map((topic, index) => (
              <div key={index} className={`${topic.color} rounded-2xl p-4 min-w-[200px] text-white shadow-lg hover:scale-105 transition-transform`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{topic.name}</span>
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="ri-arrow-up-line text-xs"></i>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold">{topic.growth}</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-white/60 rounded-full"></div>
                    <div className="w-1 h-6 bg-white/80 rounded-full"></div>
                    <div className="w-1 h-3 bg-white/60 rounded-full"></div>
                    <div className="w-1 h-5 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories with Innovative Layout */}
        <div className="px-4 py-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Browse Categories</h3>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((category, index) => (
              <div key={index} className="group relative">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:scale-105">
                  <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
                    <i className={`${category.icon} text-white text-xl`}></i>
                  </div>
                  <h4 className="font-medium text-sm mb-1 text-gray-900 dark:text-white">{category.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{category.count} creators</p>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Creators with Card Stack Design */}
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Featured Creators</h3>
            {displayedCreators.length > 0 && (
              <button className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center space-x-1 hover:scale-105 transition-transform">
                <span>View All</span>
                <i className="ri-arrow-right-line"></i>
              </button>
            )}
          </div>
          {displayedCreators.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-star-line text-white text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Featured Creators Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 px-4">Featured creators will appear here once they're added to the platform</p>
              <button 
                onClick={() => navigate('/host-signup')}
                className="bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition-transform shadow-lg"
              >
                Become a Creator
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {displayedCreators.map((creator, index) => (
                <div key={creator.id} className="group relative">
                  <div 
                    onClick={() => navigate(`/creator/${creator.id}`)}
                    className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group-hover:scale-[1.02] cursor-pointer"
                  >
                    {/* Background Gradient */}
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${creator.gradient} rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    
                    <div className="relative flex items-start space-x-4">
                      <div className="relative">
                        <img 
                          src={creator.image} 
                          alt={creator.name}
                          className="w-20 h-20 rounded-2xl object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-lg text-gray-900 dark:text-white">{creator.name}</h4>
                          <div className="flex items-center space-x-1 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                            <i className="ri-user-line text-blue-600 dark:text-blue-400 text-xs"></i>
                            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                              {creator.subscribers}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{creator.category}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">{creator.description}</p>
                        
                        {/* Subscription Tiers with Modern Design */}
                        <div className="grid grid-cols-3 gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/creator/${creator.id}`);
                            }}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-xl text-xs font-medium hover:scale-105 transition-transform"
                          >
                            Basic ${creator.tier1Price}
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/creator/${creator.id}`);
                            }}
                            className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 py-2 px-3 rounded-xl text-xs font-medium hover:scale-105 transition-transform"
                          >
                            Pro ${creator.tier2Price}
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/creator/${creator.id}`);
                            }}
                            className="bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 text-white py-2 px-3 rounded-xl text-xs font-medium hover:scale-105 transition-transform shadow-lg"
                          >
                            VIP ${creator.tier3Price}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions with Floating Design */}
        <div className="px-4 py-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/messages')}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 text-left shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:scale-105"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <i className="ri-message-3-line text-white text-xl"></i>
              </div>
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Messages</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Chat with creators</p>
            </button>
            <button 
              onClick={() => navigate('/subscriptions')}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 text-left shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:scale-105"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <i className="ri-vip-crown-line text-white text-xl"></i>
              </div>
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">My Subscriptions</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Manage subscriptions</p>
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Navigation with Glassmorphism */}
      <nav className="fixed bottom-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="grid grid-cols-4 h-16">
          <button 
            onClick={() => setActiveTab('discover')}
            className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 ${
              activeTab === 'discover' 
                ? 'text-blue-600 dark:text-blue-400 scale-110' 
                : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            <i className="ri-compass-line text-lg"></i>
            <span className="text-xs">Discover</span>
          </button>
          <button 
            onClick={() => {
              setActiveTab('messages');
              navigate('/messages');
            }}
            className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 ${
              activeTab === 'messages' 
                ? 'text-blue-600 dark:text-blue-400 scale-110' 
                : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            <i className="ri-message-3-line text-lg"></i>
            <span className="text-xs">Messages</span>
          </button>
          <button 
            onClick={() => {
              setActiveTab('subscriptions');
              navigate('/subscriptions');
            }}
            className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 ${
              activeTab === 'subscriptions' 
                ? 'text-blue-600 dark:text-blue-400 scale-110' 
                : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            <i className="ri-vip-crown-line text-lg"></i>
            <span className="text-xs">Subscriptions</span>
          </button>
          <button 
            onClick={() => {
              setActiveTab('profile');
              navigate('/profile');
            }}
            className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 ${
              activeTab === 'profile' 
                ? 'text-blue-600 dark:text-blue-400 scale-110' 
                : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            <i className="ri-user-line text-lg"></i>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
