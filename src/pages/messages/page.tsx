import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MessagesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);

  const conversations = [
    {
      id: 1,
      creatorName: 'Sarah Johnson',
      creatorImage: 'https://readdy.ai/api/search-image?query=Professional%20fitness%20influencer%20woman%20in%20athletic%20wear%2C%20bright%20studio%20lighting%2C%20confident%20pose%2C%20modern%20gym%20background%2C%20high-quality%20portrait%20photography%2C%20clean%20aesthetic%2C%20motivational%20atmosphere&width=100&height=100&seq=msg1&orientation=squarish',
      lastMessage: 'Thanks for subscribing! Here\'s your personalized workout plan 💪',
      timestamp: '2 min ago',
      unread: true,
      tier: 'VIP',
      isAI: false
    },
    {
      id: 2,
      creatorName: 'Marcus Chen',
      creatorImage: 'https://readdy.ai/api/search-image?query=Professional%20tech%20expert%20man%20in%20casual%20business%20attire%2C%20modern%20office%20background%2C%20friendly%20smile%2C%20laptop%20and%20gadgets%20visible%2C%20clean%20professional%20lighting%2C%20contemporary%20workspace&width=100&height=100&seq=msg2&orientation=squarish',
      lastMessage: 'AI Assistant: Here are the coding resources you requested. Marcus will review your project tomorrow.',
      timestamp: '1 hour ago',
      unread: false,
      tier: 'Pro',
      isAI: true
    },
    {
      id: 3,
      creatorName: 'Emma Rodriguez',
      creatorImage: 'https://readdy.ai/api/search-image?query=Creative%20artist%20woman%20in%20art%20studio%2C%20colorful%20paintings%20in%20background%2C%20artistic%20lighting%2C%20paint%20brushes%20and%20palette%20visible%2C%20inspiring%20creative%20workspace%2C%20professional%20portrait&width=100&height=100&seq=msg3&orientation=squarish',
      lastMessage: 'Your art piece is looking amazing! Keep up the great work 🎨',
      timestamp: '3 hours ago',
      unread: true,
      tier: 'Basic',
      isAI: false
    },
    {
      id: 4,
      creatorName: 'Alex Thompson',
      creatorImage: 'https://readdy.ai/api/search-image?query=Professional%20musician%20man%20with%20guitar%20in%20recording%20studio%2C%20warm%20lighting%2C%20musical%20equipment%20in%20background%2C%20creative%20atmosphere%2C%20professional%20portrait%20photography&width=100&height=100&seq=msg4&orientation=squarish',
      lastMessage: 'AI Assistant: Weekly music theory lesson is now available in your dashboard.',
      timestamp: '1 day ago',
      unread: false,
      tier: 'Pro',
      isAI: true
    }
  ];

  const aiSuggestions = [
    "Thank you so much! I really appreciate your support 🙏",
    "That sounds amazing! Can you tell me more about it?",
    "I'm excited to see what you create next!",
    "Thanks for sharing this with me 💜",
    "Looking forward to our next session!"
  ];

  const filteredConversations = conversations.filter(conv => {
    if (activeTab === 'all') return true;
    if (activeTab === 'personal') return !conv.isAI;
    if (activeTab === 'ai') return conv.isAI;
    return true;
  });

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'VIP': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'Pro': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Basic': return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const handleConversationClick = (id: number) => {
    navigate(`/chat/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm z-[100] border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Messages</h1>
            <div className="flex items-center space-x-3">
              <button className="w-8 h-8 flex items-center justify-center">
                <i className="ri-search-line text-gray-600 dark:text-gray-400 text-lg"></i>
              </button>
              <button 
                onClick={() => navigate('/settings')}
                className="w-8 h-8 flex items-center justify-center"
              >
                <i className="ri-settings-3-line text-gray-600 dark:text-gray-400 text-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="fixed top-16 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 z-40">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === 'all' 
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === 'personal' 
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Personal
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === 'ai' 
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            AI Assistant
          </button>
        </div>
      </div>

      {/* Messages List */}
      <main className="pt-32 pb-20">
        <div className="px-4">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-message-3-line text-gray-400 dark:text-gray-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No messages yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Start a conversation with your favorite creators</p>
              <button 
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium"
              >
                Discover Creators
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => handleConversationClick(conversation.id)}
                  className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 text-left shadow-sm hover:shadow-md dark:hover:bg-gray-750 transition-all border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <img 
                        src={conversation.creatorImage} 
                        alt={conversation.creatorName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {conversation.isAI && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <i className="ri-robot-line text-white text-xs"></i>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">{conversation.creatorName}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${getTierColor(conversation.tier)}`}>
                            {conversation.tier}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{conversation.timestamp}</span>
                      </div>
                      
                      <p className={`text-sm truncate ${
                        conversation.unread 
                          ? 'text-gray-900 dark:text-white font-medium' 
                          : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {conversation.lastMessage}
                      </p>
                    </div>
                    
                    {conversation.unread && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
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
          <button className="flex flex-col items-center justify-center space-y-1 text-purple-600 dark:text-purple-400">
            <i className="ri-message-3-line text-lg"></i>
            <span className="text-xs">Messages</span>
          </button>
          <button 
            onClick={() => navigate('/subscriptions')}
            className="flex flex-col items-center justify-center space-y-1 text-gray-400 dark:text-gray-500"
          >
            <i className="ri-vip-crown-line text-lg"></i>
            <span className="text-xs">Subscriptions</span>
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
