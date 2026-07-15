import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { parseCookie } from "cookie";
import { globalAPI } from "../../global-config";

export const POST = async (req: NextRequest) => {
  const cookieStore = await cookies();
  const response = await globalAPI.post("/auth/refresh", null, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const cookieArray = response.headers["set-cookie"] || [];

  for (const item of cookieArray) {
    const object = parseCookie(item);
    const options = {
      expires: object.Expires ? new Date(object.Expires) : undefined,
      path: object.Path,
      maxAge: Number(object["Max-Age"]),
    };

    if (object.accessToken) {
      cookieStore.set("accessToken", object.accessToken, options);
    }
    if (object.refreshToken) {
      cookieStore.set("refreshToken", object.refreshToken, options);
    }
  }

  return NextResponse.json(response.data);
};
