export interface BudgetParams {
  userId?: string;
  ownerId?: string;
  title?: string;
  category?: string;
  currency?: number;
  page?: number;
  perPage?: number;
}

export interface Budget {
  _id: string;
  balance: number;
  ownerId: string;
  userIds: string[];
  title: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetBody {
  balance: number;
  userIds?: string[];
  title: string;
  currency: string;
}
