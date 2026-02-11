import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function ClaimPhoneNumberPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [accessCode, setAccessCode] = useState('');
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [claimedPhoneNumber, setClaimedPhoneNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Check if access code exists and is not taken
      const { data: claim, error: fetchError } = await supabase
        .from('phone_number_claims')
        .select('*')
        .eq('access_code', accessCode)
        .maybeSingle();

      if (fetchError) {
        throw new Error('Error checking access code');
      }

      if (!claim) {
        setError('Invalid access code. Please check and try again.');
        setLoading(false);
        return;
      }

      if (claim.taken) {
        setError('This access code has already been used.');
        setLoading(false);
        return;
      }

      // Verify current phone number matches
      if (claim.current_phone_number !== currentPhoneNumber) {
        setError('Current phone number does not match our records.');
        setLoading(false);
        return;
      }

      // Update the claim with user's email and taken date
      const { error: updateError } = await supabase
        .from('phone_number_claims')
        .update({
          email: user?.email || '',
          taken: new Date().toISOString()
        })
        .eq('id', claim.id);

      if (updateError) {
        throw new Error('Error claiming phone number');
      }

      // Success! Show the new phone number
      setClaimedPhoneNumber(claim.new_phone_number);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm z-[100] border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => navigate('/settings')} 
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
              <div className="w-8"></div>
            </div>
          </div>
        </header>

        {/* Success Content */}
        <main className="pt-20 pb-6 px-4 flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-check-line text-green-600 dark:text-green-400 text-4xl"></i>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Phone Number Claimed!
              </h1>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your new phone number has been successfully claimed
              </p>
              
              <div className="bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 rounded-xl p-6 mb-6">
                <p className="text-sm text-blue-100 mb-2">Your New Phone Number</p>
                <p className="text-3xl font-bold text-white tracking-wider">
                  {claimedPhoneNumber}
                </p>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Save this number for your records. You can now use it to receive calls and messages from your subscribers.
              </p>
              
              <button
                onClick={() => navigate('/settings')}
                className="w-full bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 text-white rounded-xl py-3 font-semibold"
              >
                Back to Settings
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm z-[100] border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/settings')} 
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
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-6 px-4">
        <div className="max-w-md mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="ri-phone-line text-white text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Claim Your Phone Number
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your access code and current phone number to claim your new dedicated number
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              {/* Access Code Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Access Code
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                    <i className="ri-key-line text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Enter your access code"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              {/* Current Phone Number Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Phone Number
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                    <i className="ri-smartphone-line text-gray-400"></i>
                  </div>
                  <input
                    type="tel"
                    value={currentPhoneNumber}
                    onChange={(e) => setCurrentPhoneNumber(e.target.value)}
                    placeholder="Enter your current phone number"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start space-x-3">
                <i className="ri-error-warning-line text-red-600 dark:text-red-400 text-xl flex-shrink-0 mt-0.5"></i>
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 text-white rounded-xl py-4 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <i className="ri-loader-4-line animate-spin"></i>
                  <span>Verifying...</span>
                </span>
              ) : (
                'Claim Phone Number'
              )}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <i className="ri-information-line text-blue-600 dark:text-blue-400 text-xl flex-shrink-0 mt-0.5"></i>
              <div>
                <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-1">
                  How it works
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Enter the access code you received and your current phone number. If they match our records and the code hasn't been used, you'll receive your new dedicated phone number.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
