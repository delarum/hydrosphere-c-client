// client/src/pages/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Register = () => {
  const navigate = useNavigate();
  const { register, googleLogin } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (parseInt(formData.age) < 18) {
      newErrors.age = 'You must be at least 18 years old to register';
    } else if (parseInt(formData.age) > 120) {
      newErrors.age = 'Please enter a valid age';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    const result = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      age: parseInt(formData.age)
    });
    
    setIsLoading(false);
    
    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      if (result.errors) {
        const serverErrors = {};
        result.errors.forEach(err => {
          serverErrors[err.param] = err.msg;
        });
        setErrors(serverErrors);
      } else {
        setErrors({ general: result.message });
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      
      // For Google users, we need to handle age verification differently
      // You might want to redirect to a page to collect age first
      // For now, we'll assume backend handles this or prompt for age
      
      const result = await googleLogin(credentialResponse.credential);
      
      if (result.success) {
        navigate('/dashboard', { replace: true });
      } else {
        setErrors({ general: result.message });
      }
    } catch (error) {
      setErrors({ general: 'Google login failed. Please try again.' });
    }
  };

  const getInitials = (first, last) => {
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="logo-section">
              <div className="logo-icon-large">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2 .9 2 2v1.18c.67.35 1.2.88 1.54 1.52.34.64.46 1.37.36 2.09-.1.72-.46 1.38-.99 1.86z" fill="currentColor"/>
                </svg>
              </div>
              <h1>Create Account</h1>
              <p>Join the Water Guardian community</p>
            </div>
          </div>

          {errors.general && (
            <div className="error-banner">
              <span className="error-icon">⚠️</span>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row two-col">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="25"
                min="18"
                max="120"
                className={errors.age ? 'error' : ''}
              />
              {errors.age && <span className="error-text">{errors.age}</span>}
              <span className="help-text">You must be at least 18 years old to register</span>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={errors.password ? 'error' : ''}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
              
              {/* Password strength indicator */}
              <div className="password-strength">
                <div className={`strength-bar ${formData.password.length >= 8 ? 'active' : ''}`}></div>
                <div className={`strength-bar ${/(?=.*[A-Z])/.test(formData.password) ? 'active' : ''}`}></div>
                <div className={`strength-bar ${/(?=.*\d)/.test(formData.password) ? 'active' : ''}`}></div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner-small"></span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <div className="social-login">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setErrors({ general: 'Google login failed' })}
              theme="filled_blue"
              size="large"
              width="100%"
              text="signup_with"
            />
          </div>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </div>

        <div className="auth-info">
          <div className="info-card">
            <h3>🌊 Why Join HYDROS-C?</h3>
            <ul>
              <li>Report pollution incidents securely</li>
              <li>Earn rewards for verified reports</li>
              <li>Access exclusive innovation lab</li>
              <li>Track your environmental impact</li>
              <li>Join a community of Water Guardians</li>
            </ul>
          </div>
          
          <div className="preview-initials">
            <p>Your profile will appear as:</p>
            <div className="initials-preview">
              {getInitials(formData.firstName || 'J', formData.lastName || 'D')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;