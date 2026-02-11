import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(true);
  const [aiVerbose, setAiVerbose] = useState(true);
  const [aiVariations, setAiVariations] = useState(true);
  const [autoSuggestions, setAutoSuggestions] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Load settings from Supabase
  useEffect(() => {
    const loadSettings = async () => {
      if (!user?.id) {
        // Apply dark mode by default for non-logged in users
        document.documentElement.classList.add('dark');
        return;
      }
      
      const { data } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (data) {
        setDarkMode(data.dark_mode ?? true);
        setAiVerbose(data.ai_verbose ?? true);
        setAiVariations(data.ai_variations ?? true);
        setAutoSuggestions(data.auto_suggestions ?? true);
        setNotificationsEnabled(data.notifications_enabled ?? true);
        setSoundEnabled(data.sound_enabled ?? false);
        
        // Apply dark mode setting
        if (data.dark_mode ?? true) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else {
        // No settings found, apply dark mode by default
        document.documentElement.classList.add('dark');
      }
    };
    
    loadSettings();
  }, [user]);

  const toggleDarkMode = async () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save to Supabase
    if (user?.id) {
      await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          dark_mode: newDarkMode,
          updated_at: new Date().toISOString()
        });
    }
  };

  const handleToggleSetting = async (settingName: string, currentValue: boolean, setter: (value: boolean) => void) => {
    const newValue = !currentValue;
    setter(newValue);
    
    if (user?.id) {
      await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          [settingName]: newValue,
          updated_at: new Date().toISOString()
        });
    }
  };

  const settingSections = [
    {
      title: 'AI Assistant',
      items: [
        {
          icon: 'ri-robot-line',
          title: 'Verbose Responses',
          subtitle: 'AI provides detailed, comprehensive replies',
          type: 'toggle',
          value: aiVerbose,
          onChange: () => handleToggleSetting('ai_verbose', aiVerbose, setAiVerbose)
        },
        {
          icon: 'ri-shuffle-line',
          title: 'Message Variations',
          subtitle: 'AI uses different phrasings for similar responses',
          type: 'toggle',
          value: aiVariations,
          onChange: () => handleToggleSetting('ai_variations', aiVariations, setAiVariations)
        },
        {
          icon: 'ri-lightbulb-line',
          title: 'Auto Suggestions',
          subtitle: 'Show AI-generated reply suggestions',
          type: 'toggle',
          value: autoSuggestions,
          onChange: () => handleToggleSetting('auto_suggestions', autoSuggestions, setAutoSuggestions)
        }
      ]
    },
    {
      title: 'Appearance',
      items: [
        {
          icon: 'ri-moon-line',
          title: 'Dark Mode',
          subtitle: 'Use dark theme throughout the app',
          type: 'toggle',
          value: darkMode,
          onChange: toggleDarkMode
        }
      ]
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: 'ri-notification-line',
          title: 'Push Notifications',
          subtitle: 'Receive notifications for new messages',
          type: 'toggle',
          value: notificationsEnabled,
          onChange: () => handleToggleSetting('notifications_enabled', notificationsEnabled, setNotificationsEnabled)
        },
        {
          icon: 'ri-volume-up-line',
          title: 'Sound',
          subtitle: 'Play sound for notifications',
          type: 'toggle',
          value: soundEnabled,
          onChange: () => handleToggleSetting('sound_enabled', soundEnabled, setSoundEnabled)
        }
      ]
    }
  ];

  const aiPersonalityOptions = [
    { id: 'friendly', title: 'Friendly', description: 'Warm and approachable tone' },
    { id: 'professional', title: 'Professional', description: 'Formal and business-like' },
    { id: 'casual', title: 'Casual', description: 'Relaxed and informal' },
    { id: 'enthusiastic', title: 'Enthusiastic', description: 'Energetic and excited' }
  ];

  const [selectedPersonality, setSelectedPersonality] = useState('friendly');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm z-[100] border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)} 
              className="w-8 h-8 flex items-center justify-center"
            >
              <i className="ri-arrow-left-line text-gray-600 dark:text-gray-400 text-lg"></i>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="ri-cpu-line text-white text-sm"></i>
              </div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.05em' }}>
                DirectLine
              </h1>
            </div>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-6 px-4">
        {/* Claim Phone Number Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/claim-phone-number')}
            className="w-full bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 text-white rounded-xl p-4 shadow-lg flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <i className="ri-phone-line text-white text-lg"></i>
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Claim Phone Number</h3>
                <p className="text-sm text-blue-100">Get your dedicated phone number</p>
              </div>
            </div>
            <i className="ri-arrow-right-line text-white text-xl"></i>
          </button>
        </div>

        {/* AI Personality Section */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <i className="ri-user-voice-line text-purple-600 dark:text-purple-400 text-lg"></i>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Personality</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Choose how your AI assistant communicates</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {aiPersonalityOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedPersonality(option.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    selectedPersonality === option.id 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                      : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
                  }`}
                >
                  <h3 className={`font-medium mb-1 ${
                    selectedPersonality === option.id 
                      ? 'text-purple-900 dark:text-purple-300' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {option.title}
                  </h3>
                  <p className={`text-sm ${
                    selectedPersonality === option.id 
                      ? 'text-purple-600 dark:text-purple-400' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {option.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h2>
              </div>
              
              <div className="p-6 space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <i className={`${item.icon} text-gray-600 dark:text-gray-400 text-lg`}></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.subtitle}</p>
                      </div>
                    </div>
                    
                    {item.type === 'toggle' && (
                      <button
                        onClick={() => item.onChange(!item.value)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          item.value ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          item.value ? 'translate-x-6' : 'translate-x-0.5'
                        }`}></div>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Advanced AI Settings */}
        <div className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <i className="ri-settings-3-line text-white text-lg"></i>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Advanced AI Settings</h2>
              <p className="text-sm text-purple-100">Fine-tune your AI assistant behavior</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Response Speed</h3>
                <p className="text-sm text-purple-100">How quickly AI responds to messages</p>
              </div>
              <select className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white text-sm">
                <option value="instant">Instant</option>
                <option value="natural">Natural (1-3s)</option>
                <option value="thoughtful">Thoughtful (3-5s)</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Learning Mode</h3>
                <p className="text-sm text-purple-100">AI learns from your conversation style</p>
              </div>
              <button className="bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-sm font-medium">
                Enabled
              </button>
            </div>
          </div>
        </div>

        {/* Reset Section */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Reset & Data</h2>
          <div className="space-y-3">
            <button className="w-full p-3 text-left bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <i className="ri-refresh-line text-yellow-600 dark:text-yellow-400"></i>
                <div>
                  <h3 className="font-medium text-yellow-900 dark:text-yellow-300">Reset AI Learning</h3>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">Clear AI's learned conversation patterns</p>
                </div>
              </div>
            </button>
            
            <button className="w-full p-3 text-left bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <i className="ri-delete-bin-line text-red-600 dark:text-red-400"></i>
                <div>
                  <h3 className="font-medium text-red-900 dark:text-red-300">Clear All Data</h3>
                  <p className="text-sm text-red-600 dark:text-red-400">Remove all messages and AI training data</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
