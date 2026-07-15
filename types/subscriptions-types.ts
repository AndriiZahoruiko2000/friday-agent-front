export interface SubscriptionsParams {
  title?: string;
  amount?: number;
  budgetId?: string;
  subscriptionType?: string;
  dateOfWithdrawal?: string;
  isActive?: boolean;
  transactionType?: string;
  currency?: string;
  category?: string;
  tags?: string;
  userId?: string;
  note?: string;
}

export interface SubscriptionsBody {
  title: string;
  amount: number;
  budgetId: string;
  subscriptionType: string;
  dateOfWithdrawal: string;
  isActive: boolean;
  transactionType: string;
  currency: string;
  category: string;
  tags: string;
  note: string;
}

export interface Subscription {
  _id: string;
  title: string;
  amount: number;
  budgetId: string;
  subscriptionType: string;
  dateOfWithdrawal: string;
  isActive: boolean;
  transactionType: string;
  currency: string;
  category: string;
  tags: string;
  userId: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}
