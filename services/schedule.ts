import { serverAPI } from "./server-config";
import {
  Schedule,
  ScheduleBody,
  SearcHParams,
  Shift,
  ShiftBody,
} from "@/types/schedule-types";

export const getSchedule = async (userParams: SearcHParams) => {
  const params = {
    startTime: new Date(0),
    endTine: new Date("2030"),
    ...userParams,
  };

  const response = await serverAPI.get<Schedule[]>("/schedule", { params });
  return response.data;
};

export const getScheduleById = async (id: string) => {
  const response = await serverAPI.get<Schedule>(`/schedule/${id}`);
  return response.data;
};

export const createSchedule = async (body: ScheduleBody) => {
  const response = await serverAPI.post<Schedule>("/schedule", body);
  return response.data;
};

export const updateSchedule = async (id: string, body: ScheduleBody) => {
  const response = await serverAPI.patch(`/schedule/${id}`, body);
  return response.data;
};

export const deleteSchedule = async (id: string) => {
  const response = await serverAPI.delete(`/schedule/${id}`);
  return response.data;
};

export const getShifts = async () => {
  const response = await serverAPI.get<Shift[]>("/schedule/shifts");
  return response.data;
};

export const getShiftsById = async (id: string) => {
  const response = await serverAPI.get<Shift>(`/schedule/shifts/${id}`);
  return response.data;
};

export const createShifts = async (body: ShiftBody) => {
  const response = await serverAPI.post<Shift>(`/schedule/shifts`, body);
  return response.data;
};

export const updateShifts = async (id: string, body: ShiftBody) => {
  const response = await serverAPI.patch<Shift>(`/schedule/shifts/${id}`, body);
  return response.data;
};

export const deleteShifts = async (id: string) => {
  const response = await serverAPI.delete<Shift>(`/schedule/shifts/${id}`);
  return response.data;
};
