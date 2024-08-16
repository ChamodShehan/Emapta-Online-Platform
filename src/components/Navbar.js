import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className='bg-gray-800 p-4 font-roboto text-lg'>
      <div className='flex justify-between'>
        <ul className='flex space-x-6 text-white font-medium'>
          <li>
            <Link to='/' className='hover:text-gray-300'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/courses' className='hover:text-gray-300'>
              Courses
            </Link>
          </li>
          <li>
            <Link to='/gpt-recommendations' className='hover:text-gray-300'>
              GPT Recommendations
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to='/enrolled-courses' className='hover:text-gray-300'>
                Enrolled Courses
              </Link>
            </li>
          )}
        </ul>
        <ul className='flex space-x-6 text-white font-medium'>
          {!isLoggedIn && (
            <li>
              <Link to='/login' className='hover:text-gray-300'>
                Login
              </Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to='/signup' className='hover:text-gray-300'>
                Signup
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button
                onClick={handleLogout}
                className='hover:text-gray-300 focus:outline-none'
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
