import React, { useState, useEffect } from 'react';
import { fetchCourseById } from '../services/api';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const getCourse = async () => {
      const { data } = await fetchCourseById(id);
      setCourse(data);
    };
    getCourse();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      {course && (
        <>
          <h2 className="text-3xl font-bold mb-2">{course.title}</h2>
          <p className="text-lg mb-4">{course.description}</p>
          <div className="prose">{course.content}</div>
        </>
      )}
    </div>
  );
};

export default CourseDetail;
