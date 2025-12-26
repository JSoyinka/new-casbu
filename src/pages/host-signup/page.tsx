
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HostSignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    hostType: '',
    name: '',
    email: '',
    category: '',
    bio: '',
    assistantPersona: '',
    engagementLevel: '',
    tier1Price: '',
    tier2Price: '',
    tier3Price: ''
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
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // Here you would typically submit to your backend
    console.log('Host signup data:', formData);
    navigate('/host-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate('/')} className="w-8 h-8 flex items-center justify-center">
              <i className="ri-arrow-left-line text-gray-600 text-lg"></i>
            </button>
            <h1 className="text-lg font-semibold">Become a Creator</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="fixed top-16 w-full bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Step {step} of 4</span>
          <span className="text-sm text-gray-600">{Math.round((step / 4) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-32 pb-24 px-4">
        {/* Step 1: Host Type */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">What type of creator are you?</h2>
            <p className="text-gray-600 mb-6">This helps us customize your experience</p>
            
            <div className="space-y-3">
              {hostTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFormData({ ...formData, hostType: type.id })}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.hostType === type.id 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      formData.hostType === type.id ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <i className={`${type.icon} text-lg`}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{type.title}</h3>
                      <p className="text-sm text-gray-600">{type.description}</p>
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
            <h2 className="text-2xl font-bold mb-2">Tell us about yourself</h2>
            <p className="text-gray-600 mb-6">Basic information for your profile</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Tell your audience about yourself..."
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/500 characters</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: AI Assistant Setup */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Setup Your AI Assistant</h2>
            <p className="text-gray-600 mb-6">Configure your virtual assistant to help manage interactions</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assistant Persona</label>
                <textarea
                  value={formData.assistantPersona}
                  onChange={(e) => setFormData({ ...formData, assistantPersona: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describe how you want your AI assistant to communicate (tone, personality, style)..."
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.assistantPersona.length}/500 characters</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Engagement Level</label>
                <div className="space-y-3">
                  {engagementLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setFormData({ ...formData, engagementLevel: level.id })}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        formData.engagementLevel === level.id 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <h3 className="font-semibold mb-1">{level.title}</h3>
                      <p className="text-sm text-gray-600">{level.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Pricing */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Set Your Pricing</h2>
            <p className="text-gray-600 mb-6">Configure subscription tiers for your subscribers</p>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <i className="ri-user-line text-gray-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Tier 1 - Basic</h3>
                    <p className="text-sm text-gray-600">Limited replies, weekly broadcasts</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">$</span>
                  <input
                    type="number"
                    value={formData.tier1Price}
                    onChange={(e) => setFormData({ ...formData, tier1Price: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="9.99"
                    step="0.01"
                  />
                  <span className="text-gray-600">/month</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-purple-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-vip-line text-purple-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Tier 2 - Pro</h3>
                    <p className="text-sm text-gray-600">Occasional 1:1 access, monthly AMAs</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">$</span>
                  <input
                    type="number"
                    value={formData.tier2Price}
                    onChange={(e) => setFormData({ ...formData, tier2Price: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="19.99"
                    step="0.01"
                  />
                  <span className="text-gray-600">/month</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <i className="ri-vip-crown-line text-white"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Tier 3 - VIP</h3>
                    <p className="text-sm text-purple-100">Premium messaging, personalized attention</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">$</span>
                  <input
                    type="number"
                    value={formData.tier3Price}
                    onChange={(e) => setFormData({ ...formData, tier3Price: e.target.value })}
                    className="flex-1 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-purple-200 focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="49.99"
                    step="0.01"
                  />
                  <span className="text-purple-100">/month</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-4">
        <div className="flex space-x-3">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 py-3 border border-gray-300 rounded-lg font-medium text-gray-700"
            >
              Back
            </button>
          )}
          <button
            onClick={step === 4 ? handleSubmit : handleNext}
            disabled={
              (step === 1 && !formData.hostType) ||
              (step === 2 && (!formData.name || !formData.email || !formData.category)) ||
              (step === 3 && (!formData.assistantPersona || !formData.engagementLevel)) ||
              (step === 4 && (!formData.tier1Price || !formData.tier2Price || !formData.tier3Price))
            }
            className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 4 ? 'Complete Setup' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
