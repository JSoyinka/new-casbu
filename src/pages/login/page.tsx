import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setDemoUser, user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Navigate to home when user is authenticated
  useEffect(() => {
    if (!loading && user) {
      console.log('User authenticated, navigating to home');
      navigate('/');
    }
  }, [user, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Attempting login with email:', email);
      const result = await signIn(email, password);
      
      console.log('Login result:', result);
      
      if (!result?.user) {
        console.error('No user in result');
        setError('Login failed. Please try again.');
        setIsLoading(false);
      }
      // Don't navigate here - let the useEffect handle it when auth state updates
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err?.message || 'Failed to sign in. Please check your credentials.');
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    // Mark the session as a demo user and navigate home
    setDemoUser(true);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 rounded-3xl mb-4 shadow-2xl">
            <i className="ri-cpu-line text-white text-3xl"></i>
          </div>
          <h1
            className="text-4xl font-bold text-white mb-2"
            style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.05em' }}
          >
            DirectLine
          </h1>
          <p className="text-gray-400">Connect with amazing creators</p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Welcome Back</h2>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-6">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button className="text-gray-400 text-sm hover:text-white">
              Forgot password?
            </button>
          </div>
        </div>

        {/* Demo User Button */}
        <div className="mt-6">
          <button
            onClick={handleDemoLogin}
            className="w-full bg-gray-800 border border-gray-700 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-all"
          >
            <i className="ri-user-smile-line mr-2"></i>
            Sign in as Demo User
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 mb-3">Want to become a creator?</p>
          <button
            onClick={() => navigate('/host-signup')}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            Create Creator Account
          </button>
        </div>
      </div>
    </div>
  );
}
