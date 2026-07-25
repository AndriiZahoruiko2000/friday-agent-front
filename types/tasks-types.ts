export interface Task {
  habitId?: string;
  _id: string;
  title: string;
  isDaily: boolean;
  dateTime?: string;
  isCompleted: boolean;
  note?: string;
  color?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchTasksParams {
  habitId?: string;
  startDate?: string;
  endDate?: string;
  isCompleted?: boolean;
  title?: string;
  isDaily?: string;
  category?: string;
}

export interface TaskBody {
  habitId?: string;
  title: string;
  isDaily?: boolean;
  dateTime?: string;
  isCompleted?: boolean;
  note?: string;
  color?: string;
  category?: string;
}
