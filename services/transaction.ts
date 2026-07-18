import {
  Transaction,
  TransactionBody,
  TransactionParams,
  UpdateTransactionBody,
} from "@/types/transaction-types";
import { serverAPI } from "./server-config";

export const getTransaction = async (params: TransactionParams) => {
  const response = await serverAPI.get<Transaction[]>("/transactions", {
    params,
  });
  return response.data;
};

export const getTransactionById = async (transactionId: string) => {
  const response = await serverAPI.get<Transaction>(
    `/transactions/${transactionId}`,
  );
  return response.data;
};

export const createTransaction = async (body: TransactionBody) => {
  const response = await serverAPI.post<Transaction>("/transactions", body);
  return response.data;
};

export const updateTransaction = async (
  transactionId: string,
  body: UpdateTransactionBody,
) => {
  const response = await serverAPI.patch<Transaction>(
    `/transactions/${transactionId}`,
    body,
  );
  return response.data;
};

export const deleteTransaction = async (transactionId: string) => {
  const response = await serverAPI.delete<Transaction>(
    `/transactions/${transactionId}`,
  );
  return response.data;
};
