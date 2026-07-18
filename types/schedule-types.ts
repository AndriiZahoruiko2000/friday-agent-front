export interface Schedule {
  _id: string;
  userId: string;
  scheduleShiftId: string;
  date: Date;
}

export interface ScheduleBody {
  scheduleShiftId: string;
  date: string;
}

export interface UpdateScheduleBody {
  scheduleShiftId?: string;
  date?: string;
}

export interface SearcHParams {
  startDate?: string;
  endDate?: string;
  shiftId?: string;
}

export interface Shift {
  _id: string;
  userId: string;
  title: string;
  startTime: string;
  endTime: string;
  duration: number;
  color: string;
  icon: string;
}

export interface ShiftBody {
  title?: string;
  startTime?: string;
  endTime?: string;
  duration?: number;
  color?: string;
  icon?: string;
}

export interface UpdateShiftBody {
  title?: string;
  startTime?: string;
  endTime?: string;
  duration?: number;
  color?: string;
  icon?: string;
}
