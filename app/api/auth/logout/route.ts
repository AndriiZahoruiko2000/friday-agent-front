import { cookies } from "next/headers";

import { NextResponse } from "next/server";
import { globalAPI } from "../../global-config";

export const POST = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const response = await globalAPI.post("/auth/logout", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  return NextResponse.json(response.data);
};
