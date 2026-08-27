import axios from "axios";

export const globalAPI = axios.create({
  baseURL: "http://localhost:3009",
  withCredentials: true,
});

// https://0ljwn2puxb.execute-api.us-east-1.amazonaws.com
