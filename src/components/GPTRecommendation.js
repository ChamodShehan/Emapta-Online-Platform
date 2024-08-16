import React, { useState } from 'react';
import { getGPTRecommendations } from '../services/api';

const GPTRecommendation = () => {
  const [prompt, setPrompt] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading indicator
    const token = localStorage.getItem('token');
    try {
      const { data } = await getGPTRecommendations(prompt, token);
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      // Handle error, maybe display an error message to the user
      setRecommendations(
        'Error fetching recommendations. Please try again later.'
      );
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  const formatRecommendations = (recommendations) => {
    const courses = recommendations
      .split('. ')
      .filter((course) => course.trim() !== '');
    return courses.map((course, index) => <li key={index}>{course}.</li>); // Add period at the end
  };

  return (
    <div className='container mx-auto p-4 bg-gray-100 rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4 text-center text-blue-600'>
        Discover Your Path: Course Recommendations
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='prompt'
            className='block text-gray-700 font-bold mb-2'
          >
            Your Career Goal:
          </label>
          <input
            type='text'
            id='prompt'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='e.g., Become a Data Scientist, Learn Web Development'
            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50'
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Get Recommendations'}
        </button>
      </form>
      {recommendations && (
        <div className='mt-4'>
          <h3 className='text-xl font-semibold mb-2'>Recommended Courses:</h3>
          <ul className='list-disc list-inside pl-5 text-gray-800'>
            {formatRecommendations(recommendations)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GPTRecommendation;
