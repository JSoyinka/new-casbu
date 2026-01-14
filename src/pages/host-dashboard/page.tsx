import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HostDashboardPage() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('week');

  const stats = {
    totalEarnings: 2847.50,
    subscribers: 156,
    newSubscribers: 12,
    messages: 89,
    engagement: 94.5,
    contentViews: 3421
  };

  const recentSubscribers = [
    { name: 'Emily Chen', tier: 'Premium', amount: 29.99, date: '2 hours ago', avatar: 'EC' },
    { name: 'Michael Brown', tier: 'Basic', amount: 9.99, date: '5 hours ago', avatar: 'MB' },
    { name: 'Sarah Wilson', tier: 'VIP', amount: 49.99, date: '1 day ago', avatar: 'SW' },
    { name: 'David Lee', tier: 'Premium', amount: 29.99, date: '1 day ago', avatar: 'DL' }
  ];

  const contentPerformance = [
    { title: 'Morning Workout Routine', views: 342, likes: 89, comments: 23, type: 'video' },
    { title: 'Nutrition Tips for Athletes', views: 287, likes: 76, comments: 18, type: 'post' },
    { title: 'Q&A Session Highlights', views: 198, likes: 54, comments: 31, type: 'video' },
    { title: 'Weekly Meal Prep Guide', views: 156, likes: 42, comments: 12, type: 'post' }
  ];

  const upcomingPayouts = [
    { date: 'Jan 20, 2024', amount: 1247.50, status: 'pending' },
    { date: 'Jan 13, 2024', amount: 1600.00, status: 'completed' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm z-[100] border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/profile')} 
              className="w-8 h-8 flex items-center justify-center"
            >
              <i className="ri-arrow-left-line text-gray-600 dark:text-gray-400 text-lg"></i>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="ri-circuit-line text-white text-sm"></i>
              </div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '-0.02em' }}>Direct Line</h1>
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

      {/* Main Content */}
      <main className="pt-20 pb-6 px-4">
        {/* Time Range Selector */}
        <div className="flex space-x-2 mb-6">
          {['day', 'week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-purple-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        {/* Earnings Card */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-purple-100 text-sm mb-1">Total Earnings (This {timeRange})</p>
              <h2 className="text-4xl font-bold">${stats.totalEarnings.toFixed(2)}</h2>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-3xl"></i>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <i className="ri-arrow-up-line"></i>
            <span>+18.5% from last {timeRange}</span>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <i className="ri-user-add-line text-purple-600 dark:text-purple-400"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.subscribers}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Subscribers</p>
              </div>
            </div>
            <div className="text-xs text-green-600 dark:text-green-400">+{stats.newSubscribers} new</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
                <i className="ri-message-3-line text-pink-600 dark:text-pink-400"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.messages}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Messages</p>
              </div>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Avg response: 2h</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <i className="ri-eye-line text-blue-600 dark:text-blue-400"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.contentViews}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Content Views</p>
              </div>
            </div>
            <div className="text-xs text-green-600 dark:text-green-400">+24% growth</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <i className="ri-heart-line text-green-600 dark:text-green-400"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.engagement}%</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Engagement</p>
              </div>
            </div>
            <div className="text-xs text-green-600 dark:text-green-400">Excellent!</div>
          </div>
        </div>

        {/* Recent Subscribers */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Subscribers</h2>
            <button className="text-purple-600 dark:text-purple-400 text-sm font-medium">View All</button>
          </div>
          <div className="p-6 space-y-3">
            {recentSubscribers.map((subscriber, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{subscriber.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{subscriber.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{subscriber.tier} • {subscriber.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600 dark:text-green-400">${subscriber.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Top Performing Content</h2>
          </div>
          <div className="p-6 space-y-3">
            {contentPerformance.map((content, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    content.type === 'video' 
                      ? 'bg-purple-100 dark:bg-purple-900/30' 
                      : 'bg-pink-100 dark:bg-pink-900/30'
                  }`}>
                    <i className={`${
                      content.type === 'video' ? 'ri-video-line text-purple-600 dark:text-purple-400' : 'ri-file-text-line text-pink-600 dark:text-pink-400'
                    }`}></i>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white flex-1">{content.title}</h3>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span><i className="ri-eye-line mr-1"></i>{content.views}</span>
                  <span><i className="ri-heart-line mr-1"></i>{content.likes}</span>
                  <span><i className="ri-chat-3-line mr-1"></i>{content.comments}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Payouts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Payouts</h2>
          </div>
          <div className="p-6 space-y-3">
            {upcomingPayouts.map((payout, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">${payout.amount.toFixed(2)}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{payout.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  payout.status === 'pending' 
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' 
                    : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                }`}>
                  {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-purple-600 text-white rounded-xl p-4 text-left shadow-lg">
            <i className="ri-add-line text-2xl mb-2 block"></i>
            <span className="font-medium">Create Content</span>
          </button>
          <button 
            onClick={() => navigate('/settings')}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl p-4 text-left shadow-sm"
          >
            <i className="ri-robot-line text-2xl mb-2 block"></i>
            <span className="font-medium">AI Settings</span>
          </button>
        </div>
      </main>
    </div>
  );
}
