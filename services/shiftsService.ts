import { GetShiftsParams, Shift, ShiftBody } from "@/types/shifts";
import { serverAPI } from "./server-config";

export const getShifts = async (params: GetShiftsParams) => {
  const response = await serverAPI.get<Shift[]>("/shifts", { params });

  return response.data;
};

export const getShiftsById = async (shiftId: string) => {
  const response = await serverAPI.get<Shift>(`/shifts/${shiftId}`);
  return response.data;
};

export const createShifts = async (body: ShiftBody) => {
  const response = await serverAPI.post<Shift>("/shifts", body);
  return response.data;
};

export const updateShifts = async (shiftId: string, body: ShiftBody) => {
  const response = await serverAPI.patch<Shift>(`/shifts/${shiftId}`, body);
  return response.data;
};

export const deleteShifts = async (shiftId: string) => {
  const response = await serverAPI.delete<Shift>(`/shifts/${shiftId}`);
  return response.data;
};
