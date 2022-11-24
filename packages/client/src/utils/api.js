import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const getUserToken = () => {
  const savedUser = JSON.parse(localStorage.getItem('kickoff_user'));
  return savedUser ? savedUser.token : '';
};

api.defaults.headers.post['Content-Type'] = 'application/json';
api.defaults.headers.common['Authorization'] = getUserToken();

api.interceptors.request.use(
  (req) => {
    const token = getUserToken();

    if (token) {
      req.headers['Authorization'] = `Bearer ${token}`;
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

api.interceptors.response.use((response) => response.data);

export default api;
