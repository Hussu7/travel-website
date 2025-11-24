import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    siteName: 'Travel8848',
    siteTagline: 'Discover Amazing Destinations',
    adminEmail: 'admin@travel8848.com',
    contactEmail: 'info@travel8848.com',
    socialLinks: {
      facebook: 'https://facebook.com/travel8848',
      instagram: 'https://instagram.com/travel8848',
      twitter: 'https://twitter.com/travel8848'
    },
    seoSettings: {
      metaTitle: 'Travel8848 - Your Ultimate Travel Companion',
      metaDescription: 'Discover amazing travel destinations, tips, and stories from around the world with Travel8848.',
      keywords: 'travel, destinations, adventure, vacation, tourism'
    },
    emailNotifications: true,
    autoSave: true,
    publicRegistration: false
  });

  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);

  const handleSettingsChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' 
        ? { ...prev[section], [field]: value }
        : value
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    localStorage.setItem('travel8848-settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('travel8848-settings');
    if (savedSettings) {
      setSettings({ ...settings, ...JSON.parse(savedSettings) });
    }
  }, []);

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'appearance', name: 'Appearance', icon: '🎨' },
    { id: 'seo', name: 'SEO', icon: '🔍' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'account', name: 'Account', icon: '👤' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="px-6 py-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your Travel8848 administration preferences
          </p>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Success Message */}
          {saved && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="font-medium">Settings saved successfully!</span>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {/* Tabs Navigation */}
              <div className="w-64 bg-gray-50 dark:bg-gray-700/50 p-4">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 border border-orange-200 dark:border-orange-800'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600/50'
                      }`}
                    >
                      <span className="text-lg">{tab.icon}</span>
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Settings Content */}
              <div className="flex-1 p-8">
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Site Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Site Name
                          </label>
                          <input
                            type="text"
                            value={settings.siteName}
                            onChange={(e) => handleSettingsChange('siteName', null, e.target.value)}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Tagline
                          </label>
                          <input
                            type="text"
                            value={settings.siteTagline}
                            onChange={(e) => handleSettingsChange('siteTagline', null, e.target.value)}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Contact Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Admin Email
                          </label>
                          <input
                            type="email"
                            value={settings.adminEmail}
                            onChange={(e) => handleSettingsChange('adminEmail', null, e.target.value)}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Contact Email
                          </label>
                          <input
                            type="email"
                            value={settings.contactEmail}
                            onChange={(e) => handleSettingsChange('contactEmail', null, e.target.value)}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'appearance' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Theme Settings
                      </h3>
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Dark Mode</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Switch between light and dark themes
                          </p>
                        </div>
                        <button
                          onClick={toggleTheme}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            isDarkMode ? 'bg-orange-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              isDarkMode ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Social Media Links
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(settings.socialLinks).map(([platform, url]) => (
                          <div key={platform}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
                              {platform}
                            </label>
                            <input
                              type="url"
                              value={url}
                              onChange={(e) => handleSettingsChange('socialLinks', platform, e.target.value)}
                              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
                              placeholder={`https://${platform}.com/travel8848`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        SEO Configuration
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Meta Title
                          </label>
                          <input
                            type="text"
                            value={settings.seoSettings.metaTitle}
                            onChange={(e) => handleSettingsChange('seoSettings', 'metaTitle', e.target.value)}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Meta Description
                          </label>
                          <textarea
                            value={settings.seoSettings.metaDescription}
                            onChange={(e) => handleSettingsChange('seoSettings', 'metaDescription', e.target.value)}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Keywords
                          </label>
                          <input
                            type="text"
                            value={settings.seoSettings.keywords}
                            onChange={(e) => handleSettingsChange('seoSettings', 'keywords', e.target.value)}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
                            placeholder="travel, destinations, adventure"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Notification Preferences
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              Receive email updates for new blog posts and comments
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingsChange('emailNotifications', null, !settings.emailNotifications)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.emailNotifications ? 'bg-orange-600' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Auto Save</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              Automatically save blog posts while editing
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingsChange('autoSave', null, !settings.autoSave)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.autoSave ? 'bg-orange-600' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'account' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Account Management
                      </h3>
                      <div className="space-y-6">
                        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                          <div className="flex items-center space-x-3 mb-4">
                            <span className="text-2xl">👤</span>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">Admin Account</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Travel8848 Administrator</p>
                            </div>
                          </div>
                          <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            Sign Out
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Public Registration</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              Allow new users to register on the website
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingsChange('publicRegistration', null, !settings.publicRegistration)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.publicRegistration ? 'bg-orange-600' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.publicRegistration ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
                  <button
                    onClick={handleSave}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <span>💾</span>
                    <span>Save Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;