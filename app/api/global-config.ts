import axios from "axios";

export const globalAPI = axios.create({
  baseURL: "http://localhost:3009",
  withCredentials: true,
});
