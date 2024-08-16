import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api',  // Update with your backend URL if deployed
});

// Course APIs
export const fetchCourses = () => API.get('/courses');
export const fetchCourseById = (id) => API.get(`/courses/${id}`);
export const createCourse = (courseData, token) => API.post('/courses', courseData, {
  headers: { Authorization: `Bearer ${token}` },
});
export const updateCourse = (id, courseData, token) => {
  return API.put(`/courses/${id}`, courseData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteCourse = (id, token) => API.delete(`/courses/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});


// Auth APIs
export const loginUser = (userData) => API.post('/auth/login', userData);
export const signupUser = (userData) => API.post('/auth/register', userData);

// GPT Recommendations API
export const getGPTRecommendations = (prompt, token) => API.post('/gpt/recommendations', { prompt }, {
  headers: { Authorization: `Bearer ${token}` },
});


export default API;
