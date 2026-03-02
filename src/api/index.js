import axios from 'axios';

const API = axios.create({ baseURL: 'https://sdp2026backend.onrender.com/api' });

// Add token to headers for protected routes
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('userProfile'));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export const fetchCourses = () => API.get('/courses');
export const createCourse = (courseData) => API.post('/courses', courseData);