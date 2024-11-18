import axios from "axios";
import { message } from "antd";
const BASE_URL = `${process.env.REACT_APP_BASE_URL}api`;

const api = axios.create({
  baseURL: BASE_URL,
});

const current = (skipAuth = false) => {
  const currentAPI = api;

  const requestInterceptorId = currentAPI.interceptors.request.use(
    async (config) => {
      if (skipAuth) {
        return config;
      }
      const accessToken = window.localStorage.getItem("token");

      if (accessToken) {
        config.params = {
          // token: accessToken,
        };
      }

      return config;
    }
  );

  return () => {
    currentAPI.interceptors.request.eject(requestInterceptorId);
    //currentAPI.interceptors.response.eject(responseInterceptorId);
  };
};

const response = () => {
  const currentAPI = api;
  currentAPI.interceptors.response.use(
    function (response) {
      if (response.data.status === 2) {
        window.localStorage.removeItem("token");
        message.error(response.data.message);

        setTimeout(() => {
          window.location.assign("/");
        }, 2000);
      }

      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};

current();
response();

export default api;
