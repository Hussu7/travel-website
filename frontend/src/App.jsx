import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Dashboard from "./Dashboard/Dashboard";
import Destinations from "./pages/Destinations";
import EditBlog from "./Dashboard/EditBlog";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AdminLogin from "./Dashboard/AdminLogin";
import AdminProtectedRoute from "./Dashboard/AdminProtectedRoute";
import AdminLayout from "./Dashboard/AdminLayout";
import SingleBlog from "./pages/SingleBlog";
import TravelTips from "./pages/TravelTips";
import BlogManagement from "./Dashboard/BlogManagement";
import Analytics from "./Dashboard/Analytics";
import Settings from "./Dashboard/Settings";
import Users from "./Dashboard/Users";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes with Navbar */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } />
          <Route path="/destinations" element={
            <>
              <Navbar />
              <Destinations />
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          } />
          <Route path="/blog" element={
            <>
              <Navbar />
              <Blog />
              <Footer />
            </>
          } />
          <Route path="/blog/:id" element={
            <>
              <Navbar />
              <SingleBlog />
              <Footer />
            </>
          } />
          <Route path="/tips" element={
            <>
              <Navbar />
              <TravelTips />
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          } />
          
          {/* Admin Routes without main Navbar */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/blogs" 
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <BlogManagement />
                </AdminLayout>
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/analytics" 
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <Analytics />
                </AdminLayout>
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <Users />
                </AdminLayout>
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <Settings />
                </AdminLayout>
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/dashboard/edit/:id" 
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <EditBlog />
                </AdminLayout>
              </AdminProtectedRoute>
            } 
          />
          
          {/* Legacy dashboard routes - redirect to admin */}
          <Route path="/dashboard" element={<AdminLogin />} />
          <Route path="/dashboard/edit/:id" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;