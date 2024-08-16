import React, { useState, useEffect } from 'react';
import { fetchCourses, deleteCourse } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    const getCourses = async () => {
      const { data } = await fetchCourses();
      setCourses(data);
    };
    getCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      await deleteCourse(id, token);
      setCourses(courses.filter((course) => course._id !== id));
      toast.success('Course deleted successfully');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('You are not authorized to delete this course.');
      } else {
        toast.error('Failed to delete course. Please try again later.');
      }
      console.error('Error deleting course:', error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/courses/update/${id}`);
  };

  const handleView = (id) => {
    navigate(`/courses/view/${id}`);
  };

  const handleCreate = () => {
    navigate('/courses/create');
  };

  const handleEnroll = (courseTitle) => {
    // Show toast notification when enrolling in a course
    toast.success(`You have successfully enrolled in "${courseTitle}"!`);
    console.log(`Enrolling in course: ${courseTitle}`);
  };

  return (
    <div className='container mx-auto p-4'>
      <ToastContainer />
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold text-blue-500'>
          Explore Our Courses
        </h2>
        {userRole === 'instructor' && (
          <button
            onClick={handleCreate}
            className='bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md'
          >
            Create New Course
          </button>
        )}
      </div>
      <ul className='space-y-4'>
        {courses.map((course) => (
          <li
            key={course._id}
            className='bg-white p-4 shadow-md rounded-lg flex justify-between items-center'
          >
            <div>
              <h3 className='text-xl font-bold text-gray-800'>
                {course.title}
              </h3>
              <p className='text-gray-600'>{course.description}</p>
              <p className='text-sm text-gray-500'>
                Instructor: {course.instructor.username}
              </p>
            </div>
            <div className='space-x-2'>
              <button
                onClick={() => handleView(course._id)}
                className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md'
              >
                View Details
              </button>
              {userRole === 'instructor' ? (
                <>
                  <button
                    onClick={() => handleUpdate(course._id)}
                    className='bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 px-4 rounded-md'
                  >
                    Edit Course
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className='bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md'
                  >
                    Delete Course
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleEnroll(course.title)} // Pass the course title to the handleEnroll function
                  className='bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md'
                >
                  Enroll Now
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
