import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetailPage from './pages/CourseDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import GPTRecommendationPage from './pages/GPTRecommendationPage';
import CourseList from './components/CourseList';
import CreateCourse from './pages/CreateCourse';
import ViewCourse from './pages/ViewCourse';
import UpdateCourse from './pages/UpdateCourse';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/courses/:id' element={<CourseDetailPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route
          path='/gpt-recommendations'
          element={<GPTRecommendationPage />}
        />
        <Route path='/courses' element={<CourseList />} />
        <Route path='/courses/create' element={<CreateCourse />} />
        <Route path='/courses/view/:id' element={<ViewCourse />} />
        <Route path='/courses/update/:id' element={<UpdateCourse />} />
      </Routes>
    </Router>
  );
}

export default App;
