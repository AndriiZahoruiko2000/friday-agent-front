import { SearchParams } from "next/dist/server/request/search-params";
import { serverAPI } from "./server-config";
import {
  Schedule,
  ScheduleBody,
  Shift,
  ShiftBody,
} from "@/types/schedule-types";

export const getSchedule = async (userParams: SearchParams) => {
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
  const response = await serverAPI.get(`/schedule/${id}`);
  return response.data;
};

export const getShifts = async () => {
  const response = await serverAPI.get<Shift[]>("/shifts");
  return response.data;
};

export const getShiftsById = async (id: string) => {
  const response = await serverAPI.get<Shift>(`/shifts/${id}`);
  return response.data;
};

export const createShifts = async (body: ShiftBody) => {
  const response = await serverAPI.post<Shift>(`/shifts`, body);
  return response.data;
};

export const updateShifts = async (id: string, body: ShiftBody) => {
  const response = await serverAPI.patch<Shift>(`/shifts/${id}`, body);
  return response.data;
};

export const deleteShifts = async (id: string) => {
  const response = await serverAPI.delete<Shift>(`/shifts/${id}`);
  return response.data;
};
