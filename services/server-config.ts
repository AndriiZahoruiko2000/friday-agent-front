import { site_url } from "@/helpers/constants";
import axios from "axios";

export const serverAPI = axios.create({
  baseURL: `${site_url}/api`,
  withCredentials: true,
});
