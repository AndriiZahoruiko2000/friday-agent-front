import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { globalAPI } from "../../global-config";
import { AxiosError } from "axios";

interface Props {
  params: Promise<{ id: string }>;
}

export const GET = async (req: NextRequest, { params }: Props) => {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const response = await globalAPI.get(`/budget/${id}`, {
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
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const body = await req.json();
  const response = await globalAPI.patch(`/budget/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  try {
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
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const response = await globalAPI.delete(`/budget/${id}`, {
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
