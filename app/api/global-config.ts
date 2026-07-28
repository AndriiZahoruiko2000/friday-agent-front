import axios from "axios";

export const globalAPI = axios.create({
  baseURL: "https://0ljwn2puxb.execute-api.us-east-1.amazonaws.com",
  withCredentials: true,
});
