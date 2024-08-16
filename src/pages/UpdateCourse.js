import React, { useState, useEffect } from 'react';
import { fetchCourseById, updateCourse } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCourse = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getCourse = async () => {
      try {
        const { data } = await fetchCourseById(id);
        setTitle(data.title);
        setDescription(data.description);
        setContent(data.content);
      } catch (error) {
        console.error('Failed to fetch course:', error);
      }
    };
    getCourse();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');  // Ensure token is retrieved correctly
        console.log(token);
        if (!token) {
            console.error('No token found');
            return;
        }
        await updateCourse(id, { title, description, content }, token);
        navigate('/courses');
    } catch (error) {
        console.error('Failed to update course:', error);
    }
};



  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Course</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Course Title"
          className="w-full p-2 border rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Course Description"
          className="w-full p-2 border rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Course Content"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
          Update Course
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
