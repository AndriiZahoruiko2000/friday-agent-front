export interface Habit {
  _id: string;
  title: string;
  userId: string;
  icon: string;
  color: string;
  isActive: boolean;
  lastCompleted: string;
  currentStreak: number;
  bestSteak: number;
}

export interface HabitBody {
  title: string;
  icon: string;
  color: string;
  isActive?: boolean;
  lastCompleted?: string;
  currentStreak?: number;
  bestSteak?: number;
}
