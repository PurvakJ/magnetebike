import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/auth';
import { useAuth } from '../contexts/AuthContext';
import { FaLock, FaUser, FaBicycle } from 'react-icons/fa';
import './AdminLogin.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (adminLogin(credentials.username, credentials.password)) {
        login(); // Update auth state
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <FaBicycle className="login-icon" />
            <h1>Magnet eBike</h1>
            <h2>Admin Dashboard</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                required
              />
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
              />
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;