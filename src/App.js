import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EducatorPanel from './pages/EducatorPanel';

/**
 * PROTECTED ROUTE COMPONENT
 * This acts as a security gate. If someone tries to type /admin or /educator
 * without being logged in, it force-redirects them to /login.
 */
const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // If no user is found in storage, send to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user exists but has the wrong role, send back to home
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 selection:bg-indigo-500/30">
        {/* Navbar stays visible across all pages */}
        <Navbar />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Secure Admin Route */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Secure Educator Route */}
          <Route 
            path="/educator" 
            element={
              <ProtectedRoute allowedRole="educator">
                <EducatorPanel />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all: Redirect unknown URLs to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;