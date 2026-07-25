import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { globalAPI } from "../../global-config";
import { AxiosError } from "axios";

interface Props {
  params: Promise<{ id: string }>;
}

export const GET = async (req: NextRequest, { params }: Props) => {
  try {
    const cookieStore = await cookies();
    const { id } = await params;
    const token = cookieStore.get("accessToken")?.value;
    const response = await globalAPI.get(`/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return NextResponse.json(
      {
        error: err.response?.data.message || err.message,
      },
      {
        status: err.status || 500,
      },
    );
  }
};

export const PATCH = async (req: NextRequest, { params }: Props) => {
  try {
    const cookieStore = await cookies();
    const { id } = await params;
    const body = await req.json();
    const token = cookieStore.get("accessToken")?.value;
    const response = await globalAPI.patch(`/tasks/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return NextResponse.json(
      {
        error: err.response?.data.message || err.message,
      },
      {
        status: err.status || 500,
      },
    );
  }
};

export const DELETE = async (req: NextRequest, { params }: Props) => {
  try {
    const cookieStore = await cookies();
    const { id } = await params;
    const token = cookieStore.get("accessToken")?.value;
    const response = await globalAPI.delete(`/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return NextResponse.json(
      {
        error: err.response?.data.message || err.message,
      },
      {
        status: err.status || 500,
      },
    );
  }
};
