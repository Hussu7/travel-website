import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

function AdminNavbar({ isCollapsed, setIsCollapsed }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleAdminLogout = () => {
    if (window.confirm("Are you sure you want to logout from admin panel?")) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('isAdmin');
      navigate('/admin/login');
    }
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

  const navItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: '📊',
      description: 'Overview & Stats'
    },
    {
      name: 'Blog Management',
      path: '/admin/blogs',
      icon: '📝',
      description: 'Manage Content'
    },
    {
      name: 'Analytics',
      path: '/admin/analytics',
      icon: '📈',
      description: 'Site Analytics'
    },
    {
      name: 'Users',
      path: '/admin/users',
      icon: '👥',
      description: 'User Management'
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: '⚙️',
      description: 'Admin Settings'
    }
  ];

  return (
    <div className={`fixed left-0 top-0 h-full transition-all duration-300 z-40 ${
      isCollapsed ? 'w-16' : 'w-64'
    } shadow-xl ${
      isDarkMode 
        ? 'bg-gray-900 border-r border-gray-700 text-white' 
        : 'bg-white border-r border-gray-200 text-gray-900'
    }`}>
      
      {/* Header */}
      <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-xl text-white">✈️</span>
              </div>
              <div>
                <h2 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Travel8848</h2>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Admin Portal</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`w-8 h-8 rounded-lg transition-colors flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            <span className="text-sm">{isCollapsed ? '→' : '←'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? `${
                      isDarkMode 
                        ? 'bg-orange-500/20 border border-orange-500/30 text-orange-400' 
                        : 'bg-orange-100 border border-orange-200 text-orange-700'
                    }`
                  : `${
                      isDarkMode 
                        ? 'hover:bg-gray-700 text-gray-300 hover:text-white border border-transparent' 
                        : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900 border border-transparent'
                    }`
              }`}
              title={isCollapsed ? item.name : ''}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                isActive(item.path)
                  ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white'
                  : `${
                      isDarkMode 
                        ? 'bg-gray-700 group-hover:bg-gray-600' 
                        : 'bg-gray-200 group-hover:bg-gray-300'
                    }`
              }`}>
                <span className="text-lg">{item.icon}</span>
              </div>
              {!isCollapsed && (
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {item.description}
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="space-y-2">
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isDarkMode ? 'bg-yellow-500/20' : 'bg-gray-200'
              }`}>
                <span className="text-sm">{isDarkMode ? '🌙' : '☀️'}</span>
              </div>
              <span className="font-medium text-sm">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
            <Link
              to="/"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 hover:text-teal-200' 
                  : 'bg-teal-100 hover:bg-teal-200 text-teal-700 hover:text-teal-800'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isDarkMode ? 'bg-teal-500/30' : 'bg-teal-200'
              }`}>
                <span className="text-sm">🌍</span>
              </div>
              <span className="font-medium text-sm">View Website</span>
            </Link>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        {!isCollapsed ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div>
                <div className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Admin User</div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Administrator</div>
              </div>
            </div>
            <button
              onClick={handleAdminLogout}
              className={`w-full flex items-center justify-center space-x-2 p-3 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300' 
                  : 'bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800'
              }`}
            >
              <span>🚪</span>
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center justify-center p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-yellow-500/20 hover:bg-yellow-500/30' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <span className="text-lg">{isDarkMode ? '🌙' : '☀️'}</span>
            </button>
            <Link
              to="/"
              className={`w-full flex items-center justify-center p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-teal-500/20 hover:bg-teal-500/30' 
                  : 'bg-teal-100 hover:bg-teal-200'
              }`}
              title="View Website"
            >
              <span className="text-lg">🌍</span>
            </Link>
            <button
              onClick={handleAdminLogout}
              className={`w-full flex items-center justify-center p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400' 
                  : 'bg-red-100 hover:bg-red-200 text-red-700'
              }`}
              title="Logout"
            >
              <span className="text-lg">🚪</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminNavbar;