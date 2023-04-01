import axios from "axios";

const instatnce = axios.create({
  baseURL: "http://localhost:4444",
});

//при кодному запиті відправляти токен в хедерах

instatnce.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instatnce;
