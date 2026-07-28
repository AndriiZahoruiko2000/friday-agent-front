import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { AxiosError } from "axios";
import { globalAPI } from "../../global-config";

interface Props {
  params: Promise<{ id: string }>;
}

export const DELETE = async (req: NextRequest, { params }: Props) => {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("accessToken")?.value;
    const { id } = await params;

    const response = await globalAPI.delete(`/habits/${id}`, {
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
        status: err.response?.status || 500,
      },
    );
  }
};
