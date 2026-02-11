import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HelpSupportPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const helpCategories = [
    { icon: 'ri-question-line', title: 'Getting Started', count: 12, color: 'purple' },
    { icon: 'ri-money-dollar-circle-line', title: 'Payments & Billing', count: 8, color: 'green' },
    { icon: 'ri-shield-check-line', title: 'Privacy & Safety', count: 15, color: 'blue' },
    { icon: 'ri-message-3-line', title: 'Messaging', count: 10, color: 'pink' },
    { icon: 'ri-vip-crown-line', title: 'Subscriptions', count: 9, color: 'yellow' },
    { icon: 'ri-settings-3-line', title: 'Account Settings', count: 11, color: 'indigo' }
  ];

  const faqs = [
    {
      question: 'How do I subscribe to a creator?',
      answer: 'To subscribe to a creator, visit their profile and tap the "Subscribe" button. Choose your preferred subscription tier and complete the payment. You\'ll get instant access to their exclusive content.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes! You can cancel any subscription at any time from your Subscriptions page. You\'ll continue to have access until the end of your current billing period.'
    },
    {
      question: 'How do I send a tip to a creator?',
      answer: 'You can send tips directly in the chat by tapping the gift icon, or from their profile page. Tips are a great way to show extra appreciation for content you love!'
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use industry-standard encryption and never store your full payment details. All transactions are processed through secure payment providers.'
    },
    {
      question: 'How do I report inappropriate content?',
      answer: 'Tap the three dots menu on any content and select "Report". Our team reviews all reports within 24 hours and takes appropriate action.'
    },
    {
      question: 'Can I become a creator?',
      answer: 'Yes! Enable Creator Mode in your profile settings. You\'ll need to complete verification and set up your payment details to start earning.'
    }
  ];

  const contactOptions = [
    { icon: 'ri-chat-3-line', title: 'Live Chat', subtitle: 'Chat with our support team', available: true },
    { icon: 'ri-mail-line', title: 'Email Support', subtitle: 'support@creatorconnect.com', available: true },
    { icon: 'ri-twitter-x-line', title: 'Twitter', subtitle: '@CreatorConnect', available: true },
    { icon: 'ri-phone-line', title: 'Phone Support', subtitle: 'Available for premium users', available: false }
  ];

  const colorClasses: Record<string, string> = {
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
  };

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
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Help & Support</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-6 px-4">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white mb-6">
          <h2 className="text-lg font-semibold mb-4">Need immediate help?</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white/20 rounded-lg p-4 text-left">
              <i className="ri-chat-3-line text-2xl mb-2 block"></i>
              <span className="text-sm font-medium">Live Chat</span>
            </button>
            <button className="bg-white/20 rounded-lg p-4 text-left">
              <i className="ri-customer-service-line text-2xl mb-2 block"></i>
              <span className="text-sm font-medium">Call Us</span>
            </button>
          </div>
        </div>

        {/* Help Categories */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Browse by Category</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-3">
            {helpCategories.map((category, index) => (
              <button key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-left">
                <div className={`w-12 h-12 ${colorClasses[category.color]} rounded-lg flex items-center justify-center mb-3`}>
                  <i className={`${category.icon} text-xl`}></i>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1">{category.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{category.count} articles</p>
              </button>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          </div>
          <div className="p-6 space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between bg-gray-50 dark:bg-gray-700"
                >
                  <span className="font-medium text-gray-900 dark:text-white pr-4">{faq.question}</span>
                  <i className={`ri-arrow-${expandedFaq === index ? 'up' : 'down'}-s-line text-gray-400 flex-shrink-0`}></i>
                </button>
                {expandedFaq === index && (
                  <div className="p-4 bg-white dark:bg-gray-800">
                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Options */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Us</h2>
          </div>
          <div className="p-6 space-y-3">
            {contactOptions.map((option, index) => (
              <button
                key={index}
                disabled={!option.available}
                className={`w-full p-4 rounded-lg text-left ${
                  option.available 
                    ? 'bg-gray-50 dark:bg-gray-700' 
                    : 'bg-gray-100 dark:bg-gray-700/50 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <i className={`${option.icon} text-purple-600 dark:text-purple-400 text-xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{option.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{option.subtitle}</p>
                  </div>
                  {option.available && (
                    <i className="ri-arrow-right-s-line text-gray-400"></i>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Community */}
        <div className="mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <i className="ri-team-line text-2xl"></i>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Community Forum</h2>
              <p className="text-sm text-blue-100">Connect with other users</p>
            </div>
          </div>
          <button className="w-full bg-white/20 border border-white/30 rounded-lg py-3 font-medium mt-3">
            Visit Forum
          </button>
        </div>
      </main>
    </div>
  );
}
