import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../assets/doctorappointment.jpeg';
import './AuthPage.css'; 
import config from '../config';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const baseUrl = `${config}/api/auth/patient`;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/login`, loginData, {
        headers: { "Content-Type": "application/json" }
      });
      if (!response.data) {
        console.error("❌ No response data received");
        setMessage("Server returned an empty response");
        return;
      }
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      window.location.href = '/';
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/register`, signupData);
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      navigate('/');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="image-section">
        <img src={defaultImage} alt="Doctor Appointment" />
      </div>
      <div className="form-section">
        <div className="form-container">
          <div className="tabs">
            <button
              className={`tab-button ${isLogin ? 'active' : ''}`}
              onClick={() => { setIsLogin(true); setMessage(''); }}
            >
              Login
            </button>
            <button
              className={`tab-button ${!isLogin ? 'active' : ''}`}
              onClick={() => { setIsLogin(false); setMessage(''); }}
            >
              Sign Up
            </button>
          </div>
          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="form">
              <input
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
                className="form-input"
              />
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
                className="form-input"
              />
              <button type="submit" className="submit-button">Login</button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="form">
              <input
                type="text"
                placeholder="Full Name"
                value={signupData.name}
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                required
                className="form-input"
              />
              <input
                type="email"
                placeholder="Email"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                required
                className="form-input"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={signupData.phone}
                onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                required
                className="form-input"
              />
              <input
                type="password"
                placeholder="Password"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                required
                className="form-input"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={signupData.confirmPassword}
                onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                required
                className="form-input"
              />
              <button type="submit" className="submit-button">Sign Up</button>
            </form>
          )}
          {message && <p className="error-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
