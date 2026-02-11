import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PrivacySecurityPage() {
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    profileVisibility: 'public',
    showOnlineStatus: true,
    showLastSeen: true,
    allowMessages: 'everyone',
    allowComments: 'subscribers',
    showSubscriptions: false,
    showSpending: false,
    twoFactorEnabled: true,
    biometricEnabled: false,
    sessionTimeout: '30',
    blockScreenshots: false,
    watermarkContent: true
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const privacyOptions = [
    { value: 'everyone', label: 'Everyone' },
    { value: 'subscribers', label: 'Subscribers Only' },
    { value: 'nobody', label: 'Nobody' }
  ];

  const visibilityOptions = [
    { value: 'public', label: 'Public', description: 'Anyone can see your profile' },
    { value: 'subscribers', label: 'Subscribers Only', description: 'Only your subscribers can see' },
    { value: 'private', label: 'Private', description: 'Only you can see your profile' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white dark:bg-gray-800 shadow-sm z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/profile')} 
              className="w-8 h-8 flex items-center justify-center"
            >
              <i className="ri-arrow-left-line text-gray-600 dark:text-gray-400 text-lg"></i>
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Privacy & Security</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-6 px-4">
        {/* Security Status */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <i className="ri-shield-check-line text-white text-2xl"></i>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Account Secured</h2>
              <p className="text-sm text-green-100">Your account is well protected</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <i className="ri-lock-line text-2xl mb-1 block"></i>
              <span className="text-xs">2FA Active</span>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <i className="ri-eye-off-line text-2xl mb-1 block"></i>
              <span className="text-xs">Private</span>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <i className="ri-shield-star-line text-2xl mb-1 block"></i>
              <span className="text-xs">Verified</span>
            </div>
          </div>
        </div>

        {/* Profile Visibility */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Visibility</h2>
          </div>
          <div className="p-6 space-y-3">
            {visibilityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateSetting('profileVisibility', option.value)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  settings.profileVisibility === option.value
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
                }`}
              >
                <h3 className={`font-medium mb-1 ${
                  settings.profileVisibility === option.value
                    ? 'text-purple-900 dark:text-purple-300'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {option.label}
                </h3>
                <p className={`text-sm ${
                  settings.profileVisibility === option.value
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {option.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy Settings</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white">Show Online Status</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Let others see when you're online</p>
              </div>
              <button
                onClick={() => toggleSetting('showOnlineStatus')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.showOnlineStatus ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.showOnlineStatus ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white">Show Last Seen</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Display when you were last active</p>
              </div>
              <button
                onClick={() => toggleSetting('showLastSeen')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.showLastSeen ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.showLastSeen ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Who can message you</h3>
              <select
                value={settings.allowMessages}
                onChange={(e) => updateSetting('allowMessages', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {privacyOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Who can comment</h3>
              <select
                value={settings.allowComments}
                onChange={(e) => updateSetting('allowComments', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {privacyOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white">Show Subscriptions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Display your subscription list</p>
              </div>
              <button
                onClick={() => toggleSetting('showSubscriptions')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.showSubscriptions ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.showSubscriptions ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white">Show Spending</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Display total amount spent</p>
              </div>
              <button
                onClick={() => toggleSetting('showSpending')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.showSpending ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.showSpending ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Security</h2>
          </div>
          <div className="p-6 space-y-4">
            <button className="w-full p-4 text-left bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <i className="ri-lock-password-line text-purple-600 dark:text-purple-400 text-xl"></i>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Change Password</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Last changed 3 months ago</p>
                  </div>
                </div>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
              </div>
            </button>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <i className="ri-shield-keyhole-line text-purple-600 dark:text-purple-400 text-xl"></i>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Extra security for your account</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting('twoFactorEnabled')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.twoFactorEnabled ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <i className="ri-fingerprint-line text-purple-600 dark:text-purple-400 text-xl"></i>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Biometric Login</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Use fingerprint or face ID</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting('biometricEnabled')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.biometricEnabled ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.biometricEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>

            <button className="w-full p-4 text-left bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <i className="ri-device-line text-purple-600 dark:text-purple-400 text-xl"></i>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Active Sessions</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Manage logged in devices</p>
                  </div>
                </div>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
              </div>
            </button>
          </div>
        </div>

        {/* Content Protection */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Content Protection</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white">Block Screenshots</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Prevent screenshots of your content</p>
              </div>
              <button
                onClick={() => toggleSetting('blockScreenshots')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.blockScreenshots ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.blockScreenshots ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white">Watermark Content</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Add watermark to shared content</p>
              </div>
              <button
                onClick={() => toggleSetting('watermarkContent')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.watermarkContent ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.watermarkContent ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
