import { Budget, BudgetBody, BudgetParams } from "@/types/budget-types";
import { serverAPI } from "./server-config";

export const getBudget = async (params: BudgetParams) => {
  const response = await serverAPI.get<Budget[]>("/budget", { params });
  return response.data;
};

export const getBudgetById = async (budgetId: string) => {
  const response = await serverAPI.get<Budget>(`/budget/${budgetId}`);
  return response.data;
};

export const createBudget = async (body: BudgetBody) => {
  const response = await serverAPI.post<Budget>("/budget", body);
  return response.data;
};

export const updateBudget = async (budgetId: string, body: BudgetBody) => {
  const response = await serverAPI.patch<Budget>(`/budget/${budgetId}`, body);
  return response.data;
};

export const deleteBudget = async (budgetId: string) => {
  const response = await serverAPI.delete<Budget>(`/budget/${budgetId}`);
  return response.data;
};
