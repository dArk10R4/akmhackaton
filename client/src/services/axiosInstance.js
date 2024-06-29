import axios from "axios";
import authService from "./authService";

const API_URL = import.meta.env.VITE_API_URL;
const token = authService.getToken();

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
  withCredentials: true,
});

export default axiosInstance;