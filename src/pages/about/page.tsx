import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full bg-white/10 backdrop-blur-xl shadow-sm z-[100] border-b border-white/20">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)} 
              className="w-8 h-8 flex items-center justify-center"
            >
              <i className="ri-arrow-left-line text-white text-lg"></i>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
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

      {/* Content */}
      <div className="pt-16 px-4 pb-8">
        <div className="max-w-md mx-auto">
          {/* Logo Section */}
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mb-6 shadow-2xl">
              <i className="ri-cpu-line text-white text-4xl"></i>
            </div>
            <img 
              src="https://readdy.ai/api/search-image?query=Modern%20technology%20logo%20design%20for%20DirectLine%20app%2C%20sleek%20futuristic%20typography%2C%20connected%20circuit%20lines%20integrated%20into%20letters%2C%20gradient%20blue%20to%20purple%20color%20scheme%2C%20tech%20startup%20aesthetic%2C%20minimalist%20design%2C%20transparent%20background%2C%20high%20contrast%2C%20professional%20branding%2C%20sans-serif%20font%20with%20geometric%20elements%2C%20digital%20communication%20theme&width=300&height=80&seq=directline-logo-main&orientation=landscape"
              alt="DirectLine"
              className="h-12 mx-auto mb-2"
            />
            <p className="text-purple-100 mb-4">Connecting creators with their biggest fans</p>
            <p className="text-sm text-purple-200">Version 1.0.0</p>
          </div>

          {/* About Content */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-3">Our Mission</h3>
              <p className="text-purple-100 text-sm leading-relaxed">
                We believe in empowering creators to build meaningful connections with their audience through personalized, tiered subscription experiences.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-3">What We Offer</h3>
              <ul className="space-y-3 text-purple-100 text-sm">
                <li className="flex items-start">
                  <i className="ri-check-line text-green-400 mr-2 mt-0.5"></i>
                  <span>Flexible subscription tiers for every budget</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-green-400 mr-2 mt-0.5"></i>
                  <span>Direct messaging with your favorite creators</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-green-400 mr-2 mt-0.5"></i>
                  <span>AI-powered personalized interactions</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-green-400 mr-2 mt-0.5"></i>
                  <span>Secure payment processing</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
              <div className="space-y-3 text-purple-100 text-sm">
                <p className="flex items-center">
                  <i className="ri-mail-line mr-3 text-purple-300"></i>
                  support@directline.app
                </p>
                <p className="flex items-center">
                  <i className="ri-global-line mr-3 text-purple-300"></i>
                  www.directline.app
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-3">Legal</h3>
              <div className="space-y-2">
                <button className="w-full text-left text-purple-100 text-sm py-2 hover:text-white transition-colors">
                  Terms of Service
                </button>
                <button className="w-full text-left text-purple-100 text-sm py-2 hover:text-white transition-colors">
                  Privacy Policy
                </button>
                <button className="w-full text-left text-purple-100 text-sm py-2 hover:text-white transition-colors">
                  Cookie Policy
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-purple-200 text-xs">
            <p>© 2024 DirectLine. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
