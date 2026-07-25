import { Habit, HabitBody } from "@/types/habits-types";
import { serverAPI } from "./server-config";

export const getHabits = async () => {
  const response = await serverAPI.get<Habit[]>("/habits");
  return response.data;
};

export const createHabits = async (body: HabitBody) => {
  const response = await serverAPI.post<Habit>("/habits", body);
  return response.data;
};

export const deleteHabits = async (habitId: string) => {
  const response = await serverAPI.delete(`/habits/${habitId}`);
  return response.data;
};
