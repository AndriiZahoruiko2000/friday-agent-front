import { LoginBody, RegisterBody } from "@/types/auth-types";
import { serverAPI } from "./server-config";

export const register = async (body: RegisterBody) => {
  const response = await serverAPI.post<{ message: string }>(
    "/auth/register",
    body,
  );
  return response.data;
};

export const login = async (body: LoginBody) => {
  const response = await serverAPI.post<{ accessToken: string }>(
    "/auth/login",
    body,
  );
  return response.data;
};

export const logout = async () => {
  const response = await serverAPI.post("/auth/logout");
  return response.data;
};

export const refresh = async () => {
  const response = await serverAPI.post("/auth/refresh");
  return response.data;
};

export const getMe = async () => {
  const response = await serverAPI.get("/auth/me");
  return response.data;
};

export const googlePayload = async (token: string) => {
  const response = await serverAPI.post<{ accessToken: string }>(
    "/auth/google",
    { token },
  );
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await serverAPI.post("/auth/forgot", { email });
  return response.data;
};

export const confirmPassword = async (token: string, newPassword: string) => {
  const response = await serverAPI.post("/auth/confirm-password", {
    token,
    newPassword,
  });
  return response.data;
};
