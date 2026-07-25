import { SearchTasksParams, Task, TaskBody } from "@/types/tasks-types";
import { serverAPI } from "./server-config";

export const getTasks = async (params: SearchTasksParams) => {
  const response = await serverAPI.get<Task[]>("/tasks", { params });
  return response.data;
};

export const getTaskById = async (taskId: string) => {
  const response = await serverAPI.get<Task>(`/tasks/${taskId}`);
  return response.data;
};

export const createTask = async (body: TaskBody) => {
  const response = await serverAPI.post<Task>("/tasks", body);
  return response.data;
};

export const updateTask = async (taskId: string, body: TaskBody) => {
  const response = await serverAPI.patch(`/tasks/${taskId}`, body);
  return response.data;
};

export const deleteTask = async (taskId: string) => {
  const response = await serverAPI.delete(`/tasks/${taskId}`);
  return response.data;
};
