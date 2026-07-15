import { cookies } from "next/headers";

import { NextResponse } from "next/server";
import { globalAPI } from "../../global-config";

export const GET = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const response = await globalAPI.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return NextResponse.json(response.data.user);
};
