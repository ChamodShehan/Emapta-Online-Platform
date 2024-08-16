import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../services/api';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role is student
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    try {
      await signupUser({ username, password, role });
      setMessage('Signup successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500); // Redirect after 1.5 seconds
    } catch (error) {
      setMessage('Signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>
          Create an Account
        </h2>
        <form onSubmit={handleSignup} className='space-y-6'>
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

          <div className='flex justify-center space-x-6'>
            <label className='flex items-center text-gray-700'>
              <input
                type='radio'
                value='student'
                checked={role === 'student'}
                onChange={(e) => setRole(e.target.value)}
                className='mr-2'
              />
              <span className='text-md'>Student</span>
            </label>
            <label className='flex items-center text-gray-700'>
              <input
                type='radio'
                value='instructor'
                checked={role === 'instructor'}
                onChange={(e) => setRole(e.target.value)}
                className='mr-2'
              />
              <span className='text-md'>Instructor</span>
            </label>
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
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
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
            Already have an account?{' '}
            <a href='/login' className='text-blue-500 hover:underline'>
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
