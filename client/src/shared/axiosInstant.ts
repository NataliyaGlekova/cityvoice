import axios from "axios";

const axiosInstant = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 100000,
});

axiosInstant.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstant;
