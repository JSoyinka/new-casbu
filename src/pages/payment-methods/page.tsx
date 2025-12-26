import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentMethodsPage() {
  const navigate = useNavigate();
  const [showAddCard, setShowAddCard] = useState(false);

  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      brand: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true,
      icon: 'ri-visa-line'
    },
    {
      id: 2,
      type: 'card',
      brand: 'Mastercard',
      last4: '8888',
      expiry: '09/26',
      isDefault: false,
      icon: 'ri-mastercard-line'
    },
    {
      id: 3,
      type: 'paypal',
      email: 'john.doe@email.com',
      isDefault: false,
      icon: 'ri-paypal-line'
    }
  ];

  const transactions = [
    { id: 1, creator: 'Sarah Johnson', amount: 29.99, date: '2024-01-15', status: 'completed', type: 'subscription' },
    { id: 2, creator: 'Marcus Chen', amount: 19.99, date: '2024-01-14', status: 'completed', type: 'subscription' },
    { id: 3, creator: 'Emma Rodriguez', amount: 5.00, date: '2024-01-12', status: 'completed', type: 'tip' },
    { id: 4, creator: 'Alex Thompson', amount: 24.99, date: '2024-01-10', status: 'completed', type: 'subscription' },
    { id: 5, creator: 'Sarah Johnson', amount: 10.00, date: '2024-01-08', status: 'completed', type: 'tip' }
  ];

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
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Payment Methods</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-6 px-4">
        {/* Spending Summary */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white mb-6">
          <h2 className="text-sm text-purple-100 mb-2">Total Spent This Month</h2>
          <p className="text-4xl font-bold mb-4">$92.97</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-purple-100">Subscriptions</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-2xl font-bold">$15</p>
              <p className="text-xs text-purple-100">Tips Sent</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-purple-100">Transactions</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Saved Payment Methods</h2>
            <button 
              onClick={() => setShowAddCard(!showAddCard)}
              className="text-purple-600 dark:text-purple-400 font-medium text-sm"
            >
              {showAddCard ? 'Cancel' : '+ Add New'}
            </button>
          </div>

          {showAddCard && (
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Add New Card</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium">
                  Add Card
                </button>
              </div>
            </div>
          )}

          <div className="p-6 space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white dark:bg-gray-600 rounded-lg flex items-center justify-center">
                      <i className={`${method.icon} text-2xl text-purple-600 dark:text-purple-400`}></i>
                    </div>
                    <div>
                      {method.type === 'card' ? (
                        <>
                          <h3 className="font-medium text-gray-900 dark:text-white">{method.brand} •••• {method.last4}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Expires {method.expiry}</p>
                        </>
                      ) : (
                        <>
                          <h3 className="font-medium text-gray-900 dark:text-white">PayPal</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{method.email}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <button className="w-8 h-8 flex items-center justify-center">
                    <i className="ri-more-2-fill text-gray-400"></i>
                  </button>
                </div>
                {method.isDefault && (
                  <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-full">
                    Default Payment Method
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
            <button className="text-purple-600 dark:text-purple-400 font-medium text-sm">
              View All
            </button>
          </div>
          <div className="p-6 space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.type === 'subscription' 
                      ? 'bg-purple-100 dark:bg-purple-900/30' 
                      : 'bg-pink-100 dark:bg-pink-900/30'
                  }`}>
                    <i className={`${
                      transaction.type === 'subscription' 
                        ? 'ri-vip-crown-line text-purple-600 dark:text-purple-400' 
                        : 'ri-gift-line text-pink-600 dark:text-pink-400'
                    } text-lg`}></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{transaction.creator}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">${transaction.amount}</p>
                  <p className="text-xs text-green-600 dark:text-green-400 capitalize">{transaction.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Settings */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Billing Settings</h2>
          <div className="space-y-3">
            <button className="w-full p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <i className="ri-file-list-line text-purple-600 dark:text-purple-400"></i>
                  <span className="font-medium text-gray-900 dark:text-white">Billing Address</span>
                </div>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
              </div>
            </button>
            <button className="w-full p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <i className="ri-download-line text-purple-600 dark:text-purple-400"></i>
                  <span className="font-medium text-gray-900 dark:text-white">Download Invoices</span>
                </div>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
