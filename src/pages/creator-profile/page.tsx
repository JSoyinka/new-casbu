import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function CreatorProfilePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { profile } = useAuth();
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestAmount, setRequestAmount] = useState('');
  const [requestMessage, setRequestMessage] = useState('');

  // Mock creator data - in real app, fetch from Supabase
  const creators: any = {
    '1': {
      id: '1',
      name: 'Sarah Johnson',
      category: 'Fitness & Wellness',
      bio: 'Certified personal trainer and nutrition coach helping you achieve your fitness goals. 10+ years of experience transforming lives through personalized workout plans and healthy lifestyle coaching.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20fitness%20influencer%20woman%20in%20athletic%20wear%2C%20bright%20studio%20lighting%2C%20confident%20pose%2C%20modern%20gym%20background%2C%20high-quality%20portrait%20photography%2C%20clean%20aesthetic%2C%20motivational%20atmosphere&width=400&height=400&seq=creator1profile&orientation=squarish',
      subscribers: '12.5K',
      tier1Price: 9.99,
      tier2Price: 19.99,
      tier3Price: 49.99,
      gradient: 'from-emerald-400 to-cyan-400',
      requestPrice: 15,
      requestExample: 'Create a personalized workout schedule'
    },
    '2': {
      id: '2',
      name: 'Marcus Chen',
      category: 'Tech & Innovation',
      bio: 'Senior software engineer at a leading tech company. Passionate about teaching coding, solving complex problems, and helping aspiring developers level up their skills.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20tech%20expert%20man%20in%20casual%20business%20attire%2C%20modern%20office%20background%2C%20friendly%20smile%2C%20laptop%20and%20gadgets%20visible%2C%20clean%20professional%20lighting%2C%20contemporary%20workspace&width=400&height=400&seq=creator2profile&orientation=squarish',
      subscribers: '8.2K',
      tier1Price: 14.99,
      tier2Price: 29.99,
      tier3Price: 79.99,
      gradient: 'from-blue-400 to-indigo-500',
      requestPrice: 50,
      requestExample: 'Solve a coding problem or review your code'
    },
    '3': {
      id: '3',
      name: 'Emma Rodriguez',
      category: 'Art & Design',
      bio: 'Professional digital artist and illustrator specializing in character design and branding. Let me help bring your creative vision to life with custom artwork and design consultation.',
      image: 'https://readdy.ai/api/search-image?query=Creative%20artist%20woman%20in%20art%20studio%2C%20colorful%20paintings%20in%20background%2C%20artistic%20lighting%2C%20paint%20brushes%20and%20palette%20visible%2C%20inspiring%20creative%20workspace%2C%20professional%20portrait&width=400&height=400&seq=creator3profile&orientation=squarish',
      subscribers: '15.8K',
      tier1Price: 12.99,
      tier2Price: 24.99,
      tier3Price: 59.99,
      gradient: 'from-pink-400 to-rose-500',
      requestPrice: 25,
      requestExample: 'Draw a new logo or custom illustration'
    }
  };

  const creator = creators[id || '1'];

  const handleSubscribe = async (tier: number) => {
    if (!profile) {
      navigate('/login');
      return;
    }

    setIsSubscribing(true);
    try {
      // Create subscription
      const { error } = await supabase
        .from('subscriptions')
        .insert({
          subscriber_id: profile.id,
          creator_id: creator.id,
          tier_level: tier,
          status: 'active'
        });

      if (error) throw error;

      navigate('/subscriptions');
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Failed to subscribe. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleSendRequest = async () => {
    if (!profile) {
      navigate('/login');
      return;
    }

    if (!requestMessage.trim()) {
      alert('Please enter your request message');
      return;
    }

    try {
      // Send paid request message
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: profile.id,
          receiver_id: creator.id,
          content: requestMessage,
          message_type: 'paid_request',
          amount: parseFloat(requestAmount),
          status: 'sent'
        });

      if (error) throw error;

      setShowRequestModal(false);
      setRequestMessage('');
      alert('Request sent successfully!');
      navigate('/messages');
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Failed to send request. Please try again.');
    }
  };

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
                <i className="ri-circuit-line text-white text-sm"></i>
              </div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '-0.02em' }}>Direct Line</h1>
            </div>
            <button className="w-8 h-8 flex items-center justify-center">
              <i className="ri-share-line text-gray-600 dark:text-gray-400 text-lg"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <main className="pt-16 pb-24">
        {/* Hero Section */}
        <div className={`relative bg-gradient-to-br ${creator.gradient} px-4 py-12 text-white`}>
          <div className="text-center">
            <img 
              src={creator.image} 
              alt={creator.name}
              className="w-32 h-32 rounded-3xl object-cover mx-auto mb-4 shadow-2xl border-4 border-white/30"
            />
            <h2 className="text-3xl font-bold mb-2">{creator.name}</h2>
            <p className="text-white/90 mb-4">{creator.category}</p>
            <div className="flex items-center justify-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <i className="ri-user-line mr-2"></i>
                {creator.subscribers} subscribers
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <i className="ri-star-fill text-yellow-300 mr-2"></i>
                4.9
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="px-4 py-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">About</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{creator.bio}</p>
          </div>
        </div>

        {/* Paid Request */}
        <div className="px-4 pb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Send a Paid Request</h3>
                <p className="text-blue-100 text-sm mb-3">{creator.requestExample}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-2xl font-bold">${creator.requestPrice}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setRequestAmount(creator.requestPrice.toString());
                setShowRequestModal(true);
              }}
              className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
            >
              <i className="ri-mail-send-line mr-2"></i>
              Send Request
            </button>
          </div>
        </div>

        {/* Subscription Tiers */}
        <div className="px-4 pb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Subscription Tiers</h3>
          <div className="space-y-4">
            {/* Basic Tier */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Basic</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Essential access</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">${creator.tier1Price}</div>
                  <div className="text-sm text-gray-500">/month</div>
                </div>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  Limited replies
                </li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  Weekly broadcasts
                </li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  Community access
                </li>
              </ul>
              <button
                onClick={() => handleSubscribe(1)}
                disabled={isSubscribing}
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-xl font-medium hover:scale-105 transition-transform"
              >
                Subscribe
              </button>
            </div>

            {/* Pro Tier */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border-2 border-purple-500">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Pro</h4>
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs px-2 py-1 rounded-full">Popular</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Enhanced features</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">${creator.tier2Price}</div>
                  <div className="text-sm text-gray-500">/month</div>
                </div>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  Occasional 1:1 access
                </li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  Monthly AMAs
                </li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  Priority support
                </li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  Exclusive content
                </li>
              </ul>
              <button
                onClick={() => handleSubscribe(2)}
                disabled={isSubscribing}
                className="w-full bg-purple-500 text-white py-3 rounded-xl font-medium hover:scale-105 transition-transform"
              >
                Subscribe
              </button>
            </div>

            {/* VIP Tier */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 shadow-2xl text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-xl font-bold">VIP</h4>
                    <i className="ri-vip-crown-fill text-yellow-300"></i>
                  </div>
                  <p className="text-sm text-purple-100">Premium experience</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">${creator.tier3Price}</div>
                  <div className="text-sm text-purple-100">/month</div>
                </div>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center text-sm text-purple-100">
                  <i className="ri-check-line text-yellow-300 mr-2"></i>
                  Unlimited messaging
                </li>
                <li className="flex items-center text-sm text-purple-100">
                  <i className="ri-check-line text-yellow-300 mr-2"></i>
                  Weekly 1:1 calls
                </li>
                <li className="flex items-center text-sm text-purple-100">
                  <i className="ri-check-line text-yellow-300 mr-2"></i>
                  Personalized content
                </li>
                <li className="flex items-center text-sm text-purple-100">
                  <i className="ri-check-line text-yellow-300 mr-2"></i>
                  Direct phone line
                </li>
                <li className="flex items-center text-sm text-purple-100">
                  <i className="ri-check-line text-yellow-300 mr-2"></i>
                  All Pro benefits
                </li>
              </ul>
              <button
                onClick={() => handleSubscribe(3)}
                disabled={isSubscribing}
                className="w-full bg-white text-purple-600 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
              >
                Subscribe to VIP
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
          <div className="w-full bg-white dark:bg-gray-800 rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Send Request</h3>
              <button onClick={() => setShowRequestModal(false)} className="w-8 h-8 flex items-center justify-center">
                <i className="ri-close-line text-gray-600 dark:text-gray-400 text-xl"></i>
              </button>
            </div>

            <div className="mb-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Request Fee</span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${requestAmount}</span>
                </div>
              </div>

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Request</label>
              <textarea
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Example: ${creator.requestExample}`}
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">{requestMessage.length}/500 characters</p>
            </div>

            <button
              onClick={handleSendRequest}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
            >
              Send Request - ${requestAmount}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
