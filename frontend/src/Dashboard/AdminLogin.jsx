import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function AdminLogin() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is already logged in
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      navigate('/admin/dashboard');
      return;
    }
  }, [navigate]);

  const handleClose = () => {
    navigate('/');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate admin login API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check for admin credentials
      if (loginData.email === 'admin@travel8848.com' && loginData.password === 'admin123') {
        localStorage.setItem('adminToken', 'admin-token-456');
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid admin credentials. Use admin@travel8848.com / admin123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Main Content - Full Viewport */}
      <div className="h-full flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20 overflow-hidden">
            {/* Minimal Header */}
            <div className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
              <h1 className="text-2xl font-bold mb-1">Admin Login</h1>
              <p className="text-orange-100 text-sm">Travel8848 Portal</p>
            </div>
            
            {/* Content Area - Compact */}
            <div className="p-6 space-y-5">

              {error && (
                <div className="p-3 bg-red-500/20 border border-red-400/50 text-red-100 rounded-lg text-sm">
                  ⚠️ {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleInputChange}
                    placeholder="👤 Admin Email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl focus:outline-none focus:border-orange-400 transition-colors text-white placeholder-white/70"
                    required
                  />
                </div>

                <div>
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    placeholder="🔐 Password"
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl focus:outline-none focus:border-orange-400 transition-colors text-white placeholder-white/70"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "🛡️ Admin Access"}
                </button>
              </form>

              {/* Compact Demo Info */}
              <div className="text-center pt-4 border-t border-white/20">
                <div className="bg-white/5 p-3 rounded-lg mb-3">
                  <p className="text-xs text-white/80 mb-1">Demo: admin@travel8848.com / admin123</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    to="/profile"
                    className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white text-sm text-center"
                  >
                    👤 User
                  </Link>
                  <Link
                    to="/"
                    className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white text-sm text-center"
                  >
                    🌍 Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;