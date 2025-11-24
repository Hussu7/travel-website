import { Navigate } from 'react-router-dom';

function AdminProtectedRoute({ children }) {
  const adminToken = localStorage.getItem('adminToken');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  if (!adminToken || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
}

export default AdminProtectedRoute;