import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();

  const appInfo = {
    version: '2.1.0',
    buildNumber: '2024.01.15',
    lastUpdate: 'January 15, 2024'
  };

  const legalLinks = [
    { icon: 'ri-file-text-line', title: 'Terms of Service', subtitle: 'User agreement and terms' },
    { icon: 'ri-shield-check-line', title: 'Privacy Policy', subtitle: 'How we protect your data' },
    { icon: 'ri-copyright-line', title: 'Copyright Policy', subtitle: 'DMCA and content rights' },
    { icon: 'ri-scales-line', title: 'Community Guidelines', subtitle: 'Rules and standards' },
    { icon: 'ri-cookie-line', title: 'Cookie Policy', subtitle: 'How we use cookies' }
  ];

  const teamMembers = [
    { name: 'Engineering Team', role: 'Building the platform', icon: 'ri-code-line' },
    { name: 'Design Team', role: 'Crafting the experience', icon: 'ri-palette-line' },
    { name: 'Support Team', role: 'Helping our community', icon: 'ri-customer-service-line' },
    { name: 'Creator Success', role: 'Empowering creators', icon: 'ri-star-line' }
  ];

  const socialLinks = [
    { icon: 'ri-twitter-x-line', name: 'Twitter', handle: '@CreatorConnect' },
    { icon: 'ri-instagram-line', name: 'Instagram', handle: '@creatorconnect' },
    { icon: 'ri-facebook-line', name: 'Facebook', handle: 'CreatorConnect' },
    { icon: 'ri-linkedin-line', name: 'LinkedIn', handle: 'CreatorConnect' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full bg-white dark:bg-gray-800 shadow-sm z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/profile')} 
              className="w-8 h-8 flex items-center justify-center"
            >
              <i className="ri-arrow-left-line text-gray-600 dark:text-gray-400 text-lg"></i>
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">About</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-6 px-4">
        {/* App Logo & Info */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-8 text-white text-center mb-6">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold" style={{ fontFamily: '"Pacifico", serif' }}>CC</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Direct Line</h2>
          <p className="text-purple-100 mb-4">Connecting creators with their biggest fans</p>
          <div className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm">
            Version {appInfo.version}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Direct Line empowers creators to build meaningful relationships with their audience through exclusive content, 
            direct messaging, and AI-powered engagement tools. We believe in putting creators first and giving them the tools 
            they need to succeed.
          </p>
        </div>

        {/* App Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">App Information</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Version</span>
              <span className="font-medium text-gray-900 dark:text-white">{appInfo.version}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Build Number</span>
              <span className="font-medium text-gray-900 dark:text-white">{appInfo.buildNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Last Update</span>
              <span className="font-medium text-gray-900 dark:text-white">{appInfo.lastUpdate}</span>
            </div>
            <button className="w-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 py-3 rounded-lg font-medium border border-purple-200 dark:border-purple-800">
              <i className="ri-refresh-line mr-2"></i>
              Check for Updates
            </button>
          </div>
        </div>

        {/* Team */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Our Team</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-3">
            {teamMembers.map((member, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className={`${member.icon} text-purple-600 dark:text-purple-400 text-xl`}></i>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1">{member.name}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Links */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Legal & Policies</h2>
          </div>
          <div className="p-6 space-y-3">
            {legalLinks.map((link, index) => (
              <button key={index} className="w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                    <i className={`${link.icon} text-gray-600 dark:text-gray-400`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{link.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{link.subtitle}</p>
                  </div>
                  <i className="ri-arrow-right-s-line text-gray-400"></i>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Follow Us</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-3">
            {socialLinks.map((social, index) => (
              <button key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <i className={`${social.icon} text-purple-600 dark:text-purple-400 text-lg`}></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">{social.name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{social.handle}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Credits */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white text-center">
          <i className="ri-heart-fill text-3xl mb-3 block"></i>
          <h3 className="font-semibold mb-2">Made with love for creators</h3>
          <p className="text-sm text-purple-100">
            © 2024 Direct Line. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}
