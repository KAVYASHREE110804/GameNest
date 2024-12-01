import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignInSignUp.css';

function SignInSignUp() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthday: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      if (isSignUp) {
        await validateSignUp();
      } else {
        await validateSignIn();
      }
    } catch (err) {
      console.error('Error during form submission:', err);
      setError("An unexpected error occurred.");
    }
  };

  const validateSignUp = async () => {
    const { username, email, password, confirmPassword, birthday } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username, email, password, birthday
      });
      console.log('Sign up response:', response.data);
      alert("Sign up successful! You can now sign in.");
      toggleForms();
    } catch (error) {
      console.error('Sign up error:', error);
      setError(error.response?.data?.error || "Error signing up.");
    }
  };

  const validateSignIn = async () => {
    const { username, password } = formData;

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', {
        username, password
      });
      console.log('Sign in response:', response.data);
      localStorage.setItem('userToken', response.data.token);
      navigate('/home');
    } catch (error) {
      console.error('Sign in error:', error);
      setError("Invalid username or password.");
    }
  };

  const toggleForms = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1>{isSignUp ? 'Create an Account' : 'Sign In'}</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          {isSignUp && (
            <>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="birthday">Date of Birth:</label>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </form>
        <button onClick={toggleForms}>
          {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
        </button>
      </div>
    </div>
  );
}

export default SignInSignUp;
