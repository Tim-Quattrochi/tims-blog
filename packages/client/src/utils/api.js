import axios from "axios";
import { API_URL } from "../config/constants";

const api = axios.create({
  baseURL: API_URL,
});

const getUserToken = () => {
  const savedUserUserToken = JSON.parse(
    localStorage.getItem("blogUserToken")
  );

  if (savedUserUserToken === undefined) {
    return;
  }
  return savedUserUserToken ? savedUserUserToken : "";
};

api.defaults.headers.post["Content-Type"] = "application/json";
api.defaults.headers.common["Authorization"] = getUserToken();

api.interceptors.request.use(
  (req) => {
    const token = getUserToken();

    if (token) {
      req.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    //applying token
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    //deleting the token from header
    delete api.defaults.headers.common["Authorization"];
  }
};

api.interceptors.response.use((response) => response.data);

export default api;
