import { globalAPI } from "@/app/api/global-config";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}

export const GET = async (req: NextRequest, { params }: Props) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const { id } = await params;

    const response = await globalAPI.get(`/schedule/shifts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return NextResponse.json({
      error: err.response?.data.message || err.message,
    });
  }
};

export const PATCH = async (req: NextRequest, { params }: Props) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const { id } = await params;
    const body = await req.json();

    const response = await globalAPI.patch(`/schedule/shifts/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return NextResponse.json({
      error: err.response?.data.message || err.message,
    });
  }
};

export const DELETE = async (req: NextRequest, { params }: Props) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const { id } = await params;

    const response = await globalAPI.delete(`/schedule/shifts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return NextResponse.json({
      error: err.response?.data.message || err.message,
    });
  }
};
