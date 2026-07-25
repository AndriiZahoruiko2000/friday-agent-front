import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { globalAPI } from "../global-config";
import { AxiosError } from "axios";

export const GET = async (req: NextRequest) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const params = Object.fromEntries(req.nextUrl.searchParams.entries());

    const response = await globalAPI.get("/tasks", {
      params,
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

export const POST = async (req: NextRequest) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const body = await req.json();

    const response = await globalAPI.post("/tasks", body, {
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
