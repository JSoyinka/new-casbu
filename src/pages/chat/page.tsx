import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  timestamp: string;
  isUser: boolean;
  isAI?: boolean;
}

interface Creator {
  id: number;
  name: string;
  image: string;
  tier: string;
  isOnline: boolean;
  category: string;
}

// Chat data for different creators
const creatorsData: Record<string, Creator> = {
  '1': {
    id: 1,
    name: 'Sarah Johnson',
    image: 'https://readdy.ai/api/search-image?query=Professional%20fitness%20influencer%20woman%20in%20athletic%20wear%2C%20bright%20studio%20lighting%2C%20confident%20pose%2C%20modern%20gym%20background%2C%20high-quality%20portrait%20photography%2C%20clean%20aesthetic%2C%20motivational%20atmosphere&width=100&height=100&seq=chat1&orientation=squarish',
    tier: 'VIP',
    isOnline: true,
    category: 'fitness'
  },
  '2': {
    id: 2,
    name: 'Marcus Chen',
    image: 'https://readdy.ai/api/search-image?query=Professional%20tech%20expert%20man%20in%20casual%20business%20attire%2C%20modern%20office%20background%2C%20friendly%20smile%2C%20laptop%20and%20gadgets%20visible%2C%20clean%20professional%20lighting%2C%20contemporary%20workspace&width=100&height=100&seq=chat2&orientation=squarish',
    tier: 'Pro',
    isOnline: true,
    category: 'tech'
  },
  '3': {
    id: 3,
    name: 'Emma Rodriguez',
    image: 'https://readdy.ai/api/search-image?query=Creative%20artist%20woman%20in%20art%20studio%2C%20colorful%20paintings%20in%20background%2C%20artistic%20lighting%2C%20paint%20brushes%20and%20palette%20visible%2C%20inspiring%20creative%20workspace%2C%20professional%20portrait&width=100&height=100&seq=chat3&orientation=squarish',
    tier: 'Basic',
    isOnline: false,
    category: 'art'
  },
  '4': {
    id: 4,
    name: 'Alex Thompson',
    image: 'https://readdy.ai/api/search-image?query=Professional%20musician%20man%20with%20guitar%20in%20recording%20studio%2C%20warm%20lighting%2C%20musical%20equipment%20in%20background%2C%20creative%20atmosphere%2C%20professional%20portrait%20photography&width=100&height=100&seq=chat4&orientation=squarish',
    tier: 'Pro',
    isOnline: true,
    category: 'music'
  }
};

const messagesData: Record<string, Message[]> = {
  '1': [
    {
      id: 1,
      text: 'Hey! Thanks for subscribing to my VIP tier! 💪',
      timestamp: '10:30 AM',
      isUser: false
    },
    {
      id: 2,
      text: 'I\'m so excited to work with you on your fitness journey!',
      timestamp: '10:30 AM',
      isUser: false
    },
    {
      id: 3,
      text: 'Hi Sarah! I\'m really excited too. I\'ve been struggling with consistency in my workouts.',
      timestamp: '10:32 AM',
      isUser: true
    },
    {
      id: 4,
      text: 'That\'s totally normal! Consistency is the biggest challenge for most people. What\'s your current routine like?',
      timestamp: '10:33 AM',
      isUser: false
    },
    {
      id: 5,
      text: 'I try to go to the gym 3 times a week but I usually only make it once or twice.',
      timestamp: '10:35 AM',
      isUser: true
    },
    {
      id: 6,
      text: 'AI Assistant: Based on your conversation, I\'ve prepared a personalized workout schedule that fits your lifestyle. Sarah will review it shortly.',
      timestamp: '10:36 AM',
      isUser: false,
      isAI: true
    },
    {
      id: 7,
      text: 'Perfect! The AI assistant is spot on. Let\'s start with 2 days a week and build from there. Quality over quantity! 🎯',
      timestamp: '10:38 AM',
      isUser: false
    }
  ],
  '2': [
    {
      id: 1,
      text: 'Welcome to my Pro tier! Ready to level up your coding skills? 💻',
      timestamp: '9:15 AM',
      isUser: false
    },
    {
      id: 2,
      text: 'Hi Marcus! Yes, I\'m working on a React project and need help with state management.',
      timestamp: '9:17 AM',
      isUser: true
    },
    {
      id: 3,
      text: 'Great! Are you using Redux, Context API, or something else?',
      timestamp: '9:18 AM',
      isUser: false
    },
    {
      id: 4,
      text: 'I\'m using Context API but it\'s getting messy with multiple contexts.',
      timestamp: '9:20 AM',
      isUser: true
    },
    {
      id: 5,
      text: 'AI Assistant: I\'ve compiled best practices for Context API organization and when to consider Redux. Marcus will provide personalized recommendations.',
      timestamp: '9:21 AM',
      isUser: false,
      isAI: true
    },
    {
      id: 6,
      text: 'Perfect timing! Let me share my context composition pattern that will clean this up. I\'ll send you a code example. 🚀',
      timestamp: '9:23 AM',
      isUser: false
    }
  ],
  '3': [
    {
      id: 1,
      text: 'Hi there! So glad you joined my art community! 🎨',
      timestamp: 'Yesterday',
      isUser: false
    },
    {
      id: 2,
      text: 'Hello Emma! I love your watercolor style. I\'m trying to learn but my colors always get muddy.',
      timestamp: 'Yesterday',
      isUser: true
    },
    {
      id: 3,
      text: 'That\'s such a common challenge! The key is water control and layering. Are you using cold press or hot press paper?',
      timestamp: 'Yesterday',
      isUser: false
    },
    {
      id: 4,
      text: 'I\'m using cold press. Should I try hot press instead?',
      timestamp: 'Yesterday',
      isUser: true
    },
    {
      id: 5,
      text: 'Cold press is perfect for beginners! Let me show you my layering technique. I\'ll create a video tutorial just for you! ✨',
      timestamp: 'Yesterday',
      isUser: false
    }
  ],
  '4': [
    {
      id: 1,
      text: 'Hey! Welcome to the music theory masterclass! 🎵',
      timestamp: '2:00 PM',
      isUser: false
    },
    {
      id: 2,
      text: 'Hi Alex! I\'ve been playing guitar for a year but I don\'t understand chord progressions.',
      timestamp: '2:02 PM',
      isUser: true
    },
    {
      id: 3,
      text: 'No worries! Chord progressions are like the story of a song. What genre are you most interested in?',
      timestamp: '2:03 PM',
      isUser: false
    },
    {
      id: 4,
      text: 'I love indie rock and alternative music.',
      timestamp: '2:05 PM',
      isUser: true
    },
    {
      id: 5,
      text: 'AI Assistant: I\'ve analyzed popular indie rock progressions and created a practice guide. Alex will add personalized song recommendations.',
      timestamp: '2:06 PM',
      isUser: false,
      isAI: true
    },
    {
      id: 6,
      text: 'Excellent! Indie rock uses some really cool progressions. Let me break down the I-V-vi-IV progression - it\'s everywhere! 🎸',
      timestamp: '2:08 PM',
      isUser: false
    }
  ]
};

const aiSuggestionsData: Record<string, string[]> = {
  'fitness': [
    "That sounds like a great plan! When should we start?",
    "I appreciate your help with this 🙏",
    "What exercises would you recommend for beginners?",
    "How long should each workout session be?",
    "Thank you for the personalized approach!",
    "I'm ready to commit to this routine 💪"
  ],
  'tech': [
    "That makes sense! Could you share the code example?",
    "Thanks for the detailed explanation 🙏",
    "What are the performance implications?",
    "Should I refactor my existing code?",
    "This is exactly what I needed!",
    "Can you recommend any resources to learn more? 💻"
  ],
  'art': [
    "I'd love to see that tutorial! 🎨",
    "Thank you so much for the guidance!",
    "What brushes do you recommend?",
    "How do I choose the right colors?",
    "Your work is so inspiring!",
    "I can't wait to practice this technique! ✨"
  ],
  'music': [
    "That's really helpful! Can you show me an example?",
    "Thanks for breaking it down 🙏",
    "What songs should I practice with?",
    "How do I transition between chords smoothly?",
    "This is making so much sense now!",
    "I'm excited to try this out! 🎸"
  ]
};

const threadSummaryData: Record<string, any> = {
  '1': {
    topic: "Fitness Journey & Workout Consistency",
    keyPoints: [
      "User subscribed to VIP tier for fitness coaching",
      "Main challenge: workout consistency (aims for 3x/week, achieves 1-2x)",
      "Sarah recommends starting with 2 days/week approach",
      "AI assistant prepared personalized workout schedule",
      "Focus on quality over quantity for sustainable results"
    ],
    nextSteps: [
      "Review AI-generated workout schedule",
      "Start with 2 workout sessions per week",
      "Build consistency before increasing frequency"
    ]
  },
  '2': {
    topic: "React State Management & Context API",
    keyPoints: [
      "User working on React project with state management issues",
      "Currently using Context API with multiple contexts",
      "Code organization becoming difficult to maintain",
      "Marcus will share context composition pattern",
      "AI assistant compiled best practices documentation"
    ],
    nextSteps: [
      "Review context composition pattern example",
      "Refactor existing context structure",
      "Consider Redux for more complex state needs"
    ]
  },
  '3': {
    topic: "Watercolor Painting Techniques",
    keyPoints: [
      "User learning watercolor painting",
      "Challenge: colors becoming muddy",
      "Using cold press paper (appropriate for beginners)",
      "Emma will create personalized video tutorial",
      "Focus on water control and layering technique"
    ],
    nextSteps: [
      "Watch Emma's layering technique tutorial",
      "Practice water control exercises",
      "Experiment with layering on cold press paper"
    ]
  },
  '4': {
    topic: "Guitar Chord Progressions & Music Theory",
    keyPoints: [
      "User playing guitar for one year",
      "Interested in indie rock and alternative music",
      "Needs help understanding chord progressions",
      "AI assistant analyzed popular indie rock progressions",
      "Alex introducing I-V-vi-IV progression pattern"
    ],
    nextSteps: [
      "Practice I-V-vi-IV progression",
      "Review AI-generated practice guide",
      "Learn recommended indie rock songs"
    ]
  }
};

export default function ChatPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const creator = creatorsData[id || '1'] || creatorsData['1'];
  const [messages, setMessages] = useState<Message[]>(messagesData[id || '1'] || messagesData['1']);
  const aiSuggestions = aiSuggestionsData[creator.category] || aiSuggestionsData['fitness'];
  const threadSummary = threadSummaryData[id || '1'] || threadSummaryData['1'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: true
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      setIsTyping(true);
      
      // Simulate creator response
      setTimeout(() => {
        setIsTyping(false);
        const response: Message = {
          id: messages.length + 2,
          text: "Thanks for sharing that! I'll create a custom plan just for you 🌟",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isUser: false
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    setShowSuggestions(false);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'VIP': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'Pro': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Basic': return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
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
              <img 
                src="https://readdy.ai/api/search-image?query=Modern%20technology%20logo%20design%20for%20DirectLine%20app%2C%20sleek%20futuristic%20typography%2C%20connected%20circuit%20lines%20integrated%20into%20letters%2C%20gradient%20blue%20to%20purple%20color%20scheme%2C%20tech%20startup%20aesthetic%2C%20minimalist%20design%2C%20transparent%20background%2C%20high%20contrast%2C%20professional%20branding%2C%20sans-serif%20font%20with%20geometric%20elements%2C%20digital%20communication%20theme&width=300&height=80&seq=directline-logo-main&orientation=landscape"
                alt="DirectLine"
                className="h-6"
              />
            </div>
            <button className="w-8 h-8 flex items-center justify-center">
              <i className="ri-more-2-fill text-gray-600 dark:text-gray-400 text-lg"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 pt-20 pb-32 px-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[280px] ${msg.isUser ? 'order-2' : 'order-1'}`}>
                {!msg.isUser && (
                  <div className="flex items-center space-x-2 mb-1">
                    <img 
                      src={creator.image} 
                      alt={creator.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    {msg.isAI && (
                      <div className="flex items-center space-x-1">
                        <i className="ri-robot-line text-blue-500 text-xs"></i>
                        <span className="text-xs text-blue-500">AI Assistant</span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className={`rounded-2xl px-4 py-3 ${
                  msg.isUser 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : msg.isAI
                    ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                }`}>
                  <p className={`text-sm ${
                    msg.isUser 
                      ? 'text-white' 
                      : msg.isAI
                      ? 'text-blue-700 dark:text-blue-300'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {msg.text}
                  </p>
                </div>
                
                <p className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${
                  msg.isUser ? 'text-right' : 'text-left'
                }`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[280px]">
                <div className="flex items-center space-x-2 mb-1">
                  <img 
                    src={creator.image} 
                    alt={creator.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* AI Suggestions */}
      {showSuggestions && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="w-full bg-white dark:bg-gray-800 rounded-t-2xl p-4 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Suggestions</h3>
              <button 
                onClick={() => setShowSuggestions(false)}
                className="w-8 h-8 flex items-center justify-center"
              >
                <i className="ri-close-line text-gray-600 dark:text-gray-400 text-lg"></i>
              </button>
            </div>
            
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div className="flex items-start space-x-2">
                <i className="ri-information-line text-amber-600 dark:text-amber-400 text-sm mt-0.5 flex-shrink-0"></i>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  This feature is normally only available to creators!
                </p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <p className="text-gray-900 dark:text-white text-sm">{suggestion}</p>
                </button>
              ))}
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <i className="ri-robot-line text-purple-600 dark:text-purple-400"></i>
                <span className="text-sm text-purple-600 dark:text-purple-400">AI Assistant Active</span>
              </div>
              <button 
                onClick={() => navigate('/settings')}
                className="text-sm text-purple-600 dark:text-purple-400 font-medium"
              >
                Customize
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Thread Summary */}
      {showSummary && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Thread Summary</h3>
              <button 
                onClick={() => setShowSummary(false)}
                className="w-8 h-8 flex items-center justify-center"
              >
                <i className="ri-close-line text-gray-600 dark:text-gray-400 text-lg"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Topic</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  {threadSummary.topic}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Points</h4>
                <div className="space-y-2">
                  {threadSummary.keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <i className="ri-checkbox-circle-line text-green-500 text-sm mt-0.5 flex-shrink-0"></i>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Next Steps</h4>
                <div className="space-y-2">
                  {threadSummary.nextSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <i className="ri-arrow-right-circle-line text-purple-500 text-sm mt-0.5 flex-shrink-0"></i>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <i className="ri-robot-line text-blue-600 dark:text-blue-400"></i>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">AI Generated Summary</span>
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                This summary is automatically generated based on your conversation history and updated in real-time.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 p-4 z-[100]">
        <div className="flex items-end space-x-3">
          <button 
            onClick={() => setShowSuggestions(true)}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full"
          >
            <i className="ri-robot-line text-gray-600 dark:text-gray-400"></i>
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full bg-gray-100 dark:bg-gray-700 border-none rounded-2xl px-4 py-3 pr-12 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 max-h-32"
              rows={1}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="absolute right-2 bottom-2 w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="ri-send-plane-line text-white text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
