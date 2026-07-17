import { NextRequest, NextResponse } from "next/server";
import { globalAPI } from "../../global-config";
import { AxiosError } from "axios";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const response = await globalAPI.post("/auth/confirm-password", body);
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
