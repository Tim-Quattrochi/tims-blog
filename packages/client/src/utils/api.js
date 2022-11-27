import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const getUserToken = () => {
  const savedUser = JSON.parse(localStorage.getItem('blogUser'));
  if (savedUser === undefined) {
    return;
  }
  return savedUser ? savedUser.token : '';
};

api.defaults.headers.post['Content-Type'] = 'application/json';
api.defaults.headers.common['Authorization'] = getUserToken();

api.interceptors.request.use(
  (req) => {
    const token = getUserToken();

    if (token) {
      req.headers['Authorization'] = `Bearer ${token}`;
    } // I want to know why having this else makes it so my user is not authorized, but works with it commented out. //else {
    //   delete api.defaults.headers.common['Authorization'];
    // }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    //applying token
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    //deleting the token from header
    delete api.defaults.headers.common['Authorization'];
  }
};

api.interceptors.response.use((response) => response.data);

export default api;
