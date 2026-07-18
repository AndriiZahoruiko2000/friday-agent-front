export interface TransactionParams {
  amount?: number;
  budgetId?: string;
  transactionType?: string;
  currency?: string;
  category?: string;
  tags?: string;
  userId?: string;
  note?: string;
}
export interface TransactionBody {
  amount: number;
  budgetId: string;
  transactionType: string;
  currency: string;
  category: string;
  tags?: string;
  note: string;
}
export interface Transaction {
  _id: string;
  amount: number;
  budgetId: string;
  transactionType: string;
  currency: string;
  category: string;
  tags: string;
  note: string;
  userId: string;
  createdAt: string;
  updateAt: string;
}

export interface UpdateTransactionBody {
  amount?: number;
  transactionType?: string;
  currency?: string;
  category?: string;
  tags?: string;
  note?: string;
}
