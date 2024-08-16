import React from 'react';
import { Link } from 'react-router-dom';

// Sample image URLs (replace these with your actual images)
const heroImage =
  'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
const courseImage =
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80';

const Home = () => {
  return (
    <div className='container mx-auto p-4'>
      {/* Hero Section */}
      <div className='relative bg-gray-900 text-white overflow-hidden rounded-lg shadow-lg mb-8'>
        <img
          src={heroImage}
          alt='Learning'
          className='w-full h-96 object-cover opacity-70'
        />
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <h1 className='text-5xl font-extrabold text-center drop-shadow-lg'>
            Welcome to Our Learning Platform
          </h1>
          <p className='text-center mt-4 text-xl'>
            Discover new skills and achieve your goals.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='flex flex-col justify-center'>
          <h2 className='text-3xl font-bold leading-tight'>Why Choose Us?</h2>
          <p className='mt-4 text-lg text-gray-700'>
            We offer a curated selection of high-quality courses taught by
            industry experts. Learn at your own pace and achieve your
            professional goals.
          </p>
          <Link
            to='/about'
            className='mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300'
          >
            Learn More About Us
          </Link>
        </div>
        <div>
          <img
            src={courseImage}
            alt='Courses'
            className='w-full h-64 object-cover rounded-lg shadow-lg transform hover:scale-105 transition duration-300'
          />
        </div>
      </div>

      {/* Testimonials Section (Removed for brevity) */}
    </div>
  );
};

export default Home;
