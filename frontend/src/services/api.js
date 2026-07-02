import axios from 'axios';

// Ready-to-go Axios instance configurations for future backend attachment
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.rideshare-clone.local/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Structural Interceptors for seamless authentication header injections
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('rs_user');
    if (user) {
      const { token } = JSON.parse(user);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;