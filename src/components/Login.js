import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext'; // Import useAuth
import { loginUser } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    try {
      const { data } = await loginUser({ username, password });
      localStorage.setItem('token', data.token); // Save the token to local storage
      login(); // Call login function from context
      setMessage('Login successful!');
      navigate('/'); // Redirect to home page
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>
          Login
        </h2>
        <form onSubmit={handleLogin} className='space-y-6'>
          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-700'
            >
              Username
            </label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your username'
              className='mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500'
              required
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              className='mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500'
              required
            />
          </div>
          <button
            type='submit'
            disabled={isSubmitting}
            className={`w-full py-3 text-white font-semibold rounded-lg shadow-lg transition duration-300 ${
              isSubmitting
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {message && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              message.includes('successful')
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            } text-center`}
          >
            {message}
          </div>
        )}
        <div className='mt-6 text-center'>
          <p className='text-gray-600'>
            Don't have an account?{' '}
            <a href='/register' className='text-blue-500 hover:underline'>
              <Link to='/signup' className='hover:text-gray-300'>
                Signup
              </Link>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
