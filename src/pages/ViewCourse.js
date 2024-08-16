import React, { useState, useEffect } from 'react';
import { fetchCourseById } from '../services/api';
import { useParams } from 'react-router-dom';

const ViewCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const { data } = await fetchCourseById(id);
        setCourse(data);
      } catch (error) {
        console.error('Failed to fetch course:', error);
      }
    };
    getCourse();
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
      <p className="mb-4">{course.description}</p>
      <p className="text-sm text-gray-600 mb-4">Instructor: {course.instructor.username}</p>
      <div>{course.content}</div>
    </div>
  );
};

export default ViewCourse;
