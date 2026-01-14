import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotificationsPage() {
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    pushEnabled: true,
    emailEnabled: true,
    smsEnabled: false,
    newMessages: true,
    newSubscribers: true,
    tips: true,
    promotions: false,
    creatorUpdates: true,
    liveStreams: true,
    comments: true,
    likes: false,
    mentions: true,
    soundEnabled: true,
    vibrationEnabled: true,
    doNotDisturb: false,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00'
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationSections = [
    {
      title: 'Notification Channels',
      items: [
        { key: 'pushEnabled', icon: 'ri-notification-line', title: 'Push Notifications', subtitle: 'Receive notifications on this device' },
        { key: 'emailEnabled', icon: 'ri-mail-line', title: 'Email Notifications', subtitle: 'Get updates via email' },
        { key: 'smsEnabled', icon: 'ri-message-line', title: 'SMS Notifications', subtitle: 'Receive text message alerts' }
      ]
    },
    {
      title: 'Activity Notifications',
      items: [
        { key: 'newMessages', icon: 'ri-chat-3-line', title: 'New Messages', subtitle: 'When creators send you messages' },
        { key: 'newSubscribers', icon: 'ri-user-add-line', title: 'New Subscribers', subtitle: 'When someone subscribes to you' },
        { key: 'tips', icon: 'ri-money-dollar-circle-line', title: 'Tips & Payments', subtitle: 'Payment confirmations and receipts' },
        { key: 'promotions', icon: 'ri-gift-line', title: 'Promotions & Offers', subtitle: 'Special deals from creators' }
      ]
    },
    {
      title: 'Creator Updates',
      items: [
        { key: 'creatorUpdates', icon: 'ri-star-line', title: 'Content Updates', subtitle: 'New posts from subscribed creators' },
        { key: 'liveStreams', icon: 'ri-live-line', title: 'Live Streams', subtitle: 'When creators go live' },
        { key: 'comments', icon: 'ri-chat-4-line', title: 'Comments', subtitle: 'Replies to your comments' },
        { key: 'likes', icon: 'ri-heart-line', title: 'Likes', subtitle: 'When someone likes your content' },
        { key: 'mentions', icon: 'ri-at-line', title: 'Mentions', subtitle: 'When someone mentions you' }
      ]
    },
    {
      title: 'Sound & Vibration',
      items: [
        { key: 'soundEnabled', icon: 'ri-volume-up-line', title: 'Sound', subtitle: 'Play sound for notifications' },
        { key: 'vibrationEnabled', icon: 'ri-phone-line', title: 'Vibration', subtitle: 'Vibrate for notifications' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full bg-white dark:bg-gray-800 shadow-sm z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/profile')} 
              className="w-8 h-8 flex items-center justify-center"
            >
              <i className="ri-arrow-left-line text-gray-600 dark:text-gray-400 text-lg"></i>
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-6 px-4">
        {/* Do Not Disturb */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <i className="ri-moon-line text-white text-lg"></i>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Do Not Disturb</h2>
                <p className="text-sm text-purple-100">Silence all notifications</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('doNotDisturb')}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.doNotDisturb ? 'bg-white' : 'bg-white/30'
              }`}
            >
              <div className={`w-5 h-5 rounded-full transition-transform ${
                settings.doNotDisturb ? 'translate-x-6 bg-purple-600' : 'translate-x-0.5 bg-white'
              }`}></div>
            </button>
          </div>

          {settings.doNotDisturb && (
            <div className="space-y-3 pt-4 border-t border-white/20">
              <div>
                <label className="block text-sm text-purple-100 mb-2">Quiet Hours Start</label>
                <input
                  type="time"
                  value={settings.quietHoursStart}
                  onChange={(e) => setSettings(prev => ({ ...prev, quietHoursStart: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-purple-100 mb-2">Quiet Hours End</label>
                <input
                  type="time"
                  value={settings.quietHoursEnd}
                  onChange={(e) => setSettings(prev => ({ ...prev, quietHoursEnd: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Notification Settings Sections */}
        <div className="space-y-6">
          {notificationSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h2>
              </div>
              
              <div className="p-6 space-y-4">
                {section.items.map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <i className={`${item.icon} text-gray-600 dark:text-gray-400 text-lg`}></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.subtitle}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleSetting(item.key)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings[item.key as keyof typeof settings] ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings[item.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-0.5'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Test Notification */}
        <div className="mt-6">
          <button className="w-full bg-purple-600 text-white rounded-xl p-4 font-medium shadow-lg">
            <i className="ri-notification-badge-line mr-2"></i>
            Send Test Notification
          </button>
        </div>
      </main>
    </div>
  );
}
