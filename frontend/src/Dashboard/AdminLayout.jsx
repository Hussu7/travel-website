import { useState } from 'react';
import AdminNavbar from './AdminNavbar';

function AdminLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Admin Navbar */}
      <AdminNavbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;