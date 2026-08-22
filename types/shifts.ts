export interface Shift {
  _id: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  nightHours: number;
  pricePerHour: number;
}

export interface GetShiftsParams {
  startTime?: string;
  endTime?: string;
}

export interface ShiftBody {
  date: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  nightHours: number;
  pricePerHour: number;
}
