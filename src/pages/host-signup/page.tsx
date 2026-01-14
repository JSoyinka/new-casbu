import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../lib/supabase';
import { supabase } from '../../lib/supabase';

export default function HostSignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pricingTab, setPricingTab] = useState<'subscription' | 'text'>('subscription');
  const [formData, setFormData] = useState({
    hostType: '',
    fullName: '',
    email: '',
    password: '',
    category: '',
    bio: '',
    dateOfBirth: '',
    assistantPersona: '',
    engagementLevel: '',
    tier1Price: '',
    tier2Price: '',
    tier3Price: '',
    simpleTextPrice: '',
    complexTextPrice: ''
  });

  const hostTypes = [
    { id: 'influencer', title: 'Influencer', description: 'Social media personality with a large following', icon: 'ri-star-line' },
    { id: 'expert', title: 'Expert', description: 'Professional with specialized knowledge', icon: 'ri-graduation-cap-line' },
    { id: 'creator', title: 'Content Creator', description: 'Artist, writer, or creative professional', icon: 'ri-palette-line' },
    { id: 'other', title: 'Other', description: 'Different type of creator or professional', icon: 'ri-user-line' }
  ];

  const categories = [
    'Fitness & Wellness', 'Technology', 'Art & Design', 'Music', 'Gaming', 
    'Cooking', 'Business', 'Education', 'Lifestyle', 'Entertainment'
  ];

  const engagementLevels = [
    { id: 'minimal', title: 'Minimal Engagement', description: 'Mostly automated responses, occasional personal touch' },
    { id: 'moderate', title: 'Moderate Engagement', description: 'Mix of automated and personal responses' },
    { id: 'high', title: 'High Engagement', description: 'Frequent personal interactions with subscribers' }
  ];

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create auth user and profile
      const authData = await signUp(formData.email, formData.password, {
        email: formData.email,
        full_name: formData.fullName,
        date_of_birth: formData.dateOfBirth,
        category: formData.category,
        bio: formData.bio,
        is_creator: true,
        host_type: formData.hostType,
        assistant_persona: formData.assistantPersona,
        engagement_level: formData.engagementLevel,
      });

      // Get the created user profile
      const { data: userProfile } = await supabase
        .from('users')
        .select('id')
        .eq('auth_id', authData.user?.id)
        .single();

      if (userProfile) {
        // Save pricing tiers
        await supabase.from('pricing_tiers').insert([
          { user_id: userProfile.id, tier_level: 1, price: parseFloat(formData.tier1Price) },
          { user_id: userProfile.id, tier_level: 2, price: parseFloat(formData.tier2Price) },
          { user_id: userProfile.id, tier_level: 3, price: parseFloat(formData.tier3Price) }
        ]);

        // Save text message pricing
        await supabase.from('text_message_pricing').insert({
          user_id: userProfile.id,
          simple_text_price: parseFloat(formData.simpleTextPrice),
          complex_text_price: parseFloat(formData.complexTextPrice)
        });

        // Create default user settings
        await supabase.from('user_settings').insert({
          user_id: userProfile.id
        });
      }

      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/host-dashboard');
      }, 2000);
    } catch (error: any) {
      console.error('Signup error:', error);
      alert(error.message || 'Failed to create account. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm z-[100] border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/login')} 
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
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="fixed top-16 w-full bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Step {step} of 5</span>
          <span className="text-sm text-gray-400">{Math.round((step / 5) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-32 pb-24 px-4">
        {/* Step 1: Host Type */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-white">What type of creator are you?</h2>
            <p className="text-gray-400 mb-6">This helps us customize your experience</p>
            
            <div className="space-y-3">
              {hostTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFormData({ ...formData, hostType: type.id })}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.hostType === type.id 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-gray-700 bg-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      formData.hostType === type.id ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                    }`}>
                      <i className={`${type.icon} text-lg`}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-white">{type.title}</h3>
                      <p className="text-sm text-gray-400">{type.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Basic Info */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-white">Create your account</h2>
            <p className="text-gray-400 mb-6">Basic information to get started</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create a password"
                />
                <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Profile Details */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-white">Tell us about yourself</h2>
            <p className="text-gray-400 mb-6">Help your audience get to know you</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="" className="bg-gray-800">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category} className="bg-gray-800">{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell your audience about yourself..."
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/500 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: AI Assistant Setup */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-white">Setup Your AI Assistant</h2>
            <p className="text-gray-400 mb-6">Configure your virtual assistant to help manage interactions</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Assistant Persona</label>
                <textarea
                  value={formData.assistantPersona}
                  onChange={(e) => setFormData({ ...formData, assistantPersona: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe how you want your AI assistant to communicate (tone, personality, style)..."
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.assistantPersona.length}/500 characters</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Engagement Level</label>
                <div className="space-y-3">
                  {engagementLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setFormData({ ...formData, engagementLevel: level.id })}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        formData.engagementLevel === level.id 
                          ? 'border-blue-500 bg-blue-500/10' 
                          : 'border-gray-700 bg-gray-800'
                      }`}
                    >
                      <h3 className="font-semibold mb-1 text-white">{level.title}</h3>
                      <p className="text-sm text-gray-400">{level.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Pricing with Tabs */}
        {step === 5 && (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-white">Set Your Pricing</h2>
            <p className="text-gray-400 mb-6">Configure how you want to monetize</p>
            
            {/* Pricing Tabs */}
            <div className="flex space-x-1 bg-gray-800 rounded-xl p-1 mb-6">
              <button
                onClick={() => setPricingTab('subscription')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                  pricingTab === 'subscription' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-400'
                }`}
              >
                Subscription Tiers
              </button>
              <button
                onClick={() => setPricingTab('text')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                  pricingTab === 'text' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-400'
                }`}
              >
                Text Messages
              </button>
            </div>

            {/* Subscription Pricing */}
            {pricingTab === 'subscription' && (
              <div className="space-y-6">
                <p className="text-gray-400 text-sm">Configure subscription tiers for your subscribers</p>
                
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                      <i className="ri-user-line text-gray-300"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Tier 1 - Basic</h3>
                      <p className="text-sm text-gray-400">Limited replies, weekly broadcasts</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-white">$</span>
                    <input
                      type="number"
                      value={formData.tier1Price}
                      onChange={(e) => setFormData({ ...formData, tier1Price: e.target.value })}
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="9.99"
                      step="0.01"
                    />
                    <span className="text-gray-400">/month</span>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-4 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <i className="ri-vip-line text-blue-400"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Tier 2 - Pro</h3>
                      <p className="text-sm text-gray-400">Occasional 1:1 access, monthly AMAs</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-white">$</span>
                    <input
                      type="number"
                      value={formData.tier2Price}
                      onChange={(e) => setFormData({ ...formData, tier2Price: e.target.value })}
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="19.99"
                      step="0.01"
                    />
                    <span className="text-gray-400">/month</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <i className="ri-vip-crown-line text-white"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Tier 3 - VIP</h3>
                      <p className="text-sm text-blue-100">Premium messaging, personalized attention</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-white">$</span>
                    <input
                      type="number"
                      value={formData.tier3Price}
                      onChange={(e) => setFormData({ ...formData, tier3Price: e.target.value })}
                      className="flex-1 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-white focus:border-transparent"
                      placeholder="49.99"
                      step="0.01"
                    />
                    <span className="text-blue-100">/month</span>
                  </div>
                </div>
              </div>
            )}

            {/* Text Message Pricing */}
            {pricingTab === 'text' && (
              <div className="space-y-6">
                <p className="text-gray-400 text-sm">Set threshold for receiving text messages</p>
                
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <i className="ri-message-2-line text-green-400"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Simple Text Message</h3>
                      <p className="text-sm text-gray-400">Quick questions and simple replies</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-white">$</span>
                    <input
                      type="number"
                      value={formData.simpleTextPrice}
                      onChange={(e) => setFormData({ ...formData, simpleTextPrice: e.target.value })}
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="5.00"
                      step="0.01"
                    />
                    <span className="text-gray-400">/message</span>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <i className="ri-chat-3-line text-purple-400"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Complex Message</h3>
                      <p className="text-sm text-gray-400">Detailed questions requiring longer responses</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-white">$</span>
                    <input
                      type="number"
                      value={formData.complexTextPrice}
                      onChange={(e) => setFormData({ ...formData, complexTextPrice: e.target.value })}
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="15.00"
                      step="0.01"
                    />
                    <span className="text-gray-400">/message</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 w-full bg-gray-800 border-t border-gray-700 px-4 py-4">
        <div className="flex space-x-3">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 py-3 border border-gray-600 rounded-lg font-medium text-gray-300 hover:bg-gray-700"
            >
              Back
            </button>
          )}
          <button
            onClick={step === 5 ? handleSubmit : handleNext}
            disabled={
              (step === 1 && !formData.hostType) ||
              (step === 2 && (!formData.fullName || !formData.email || !formData.password || formData.password.length < 6)) ||
              (step === 3 && (!formData.category || !formData.bio || !formData.dateOfBirth)) ||
              (step === 4 && (!formData.assistantPersona || !formData.engagementLevel)) ||
              (step === 5 && (!formData.tier1Price || !formData.tier2Price || !formData.tier3Price || !formData.simpleTextPrice || !formData.complexTextPrice)) ||
              isSubmitting
            }
            className="flex-1 py-3 bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating Account...' : step === 5 ? 'Complete Setup' : 'Continue'}
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 mx-4 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-check-line text-white text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome to Direct Line!</h3>
            <p className="text-gray-600 dark:text-gray-400">Your creator account has been created successfully</p>
          </div>
        </div>
      )}
    </div>
  );
}
