import {
  Subscription,
  SubscriptionsBody,
  SubscriptionsParams,
} from "@/types/subscriptions-types";
import { serverAPI } from "./server-config";

export const getSubscriptions = async (params: SubscriptionsParams) => {
  const response = await serverAPI.get<Subscription[]>("/subscriptions", {
    params,
  });
  return response.data;
};

export const getSubscriptionsById = async (subscriptionsId: string) => {
  const response = await serverAPI.get<Subscription>(
    `/subscriptions/${subscriptionsId}`,
  );
  return response.data;
};

export const createSubscriptions = async (body: SubscriptionsBody) => {
  const response = await serverAPI.post<Subscription>("/subscriptions", body);
  return response.data;
};

export const updateSubscriptions = async (
  subscriptionsId: string,
  body: SubscriptionsBody,
) => {
  const response = await serverAPI.patch<Subscription>(
    `/subscriptions/${subscriptionsId}`,
    body,
  );
  return response.data;
};

export const deleteSubscriptions = async (subscriptionsId: string) => {
  const response = await serverAPI.delete<Subscription>(
    `/subscriptions/${subscriptionsId}`,
  );
  return response.data;
};
