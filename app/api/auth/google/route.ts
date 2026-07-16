import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { parseCookie } from "cookie";
import { globalAPI } from "../../global-config";

export const POST = async (req: NextRequest) => {
  const cookieStore = await cookies();
  const body = await req.json();
  const response = await globalAPI.post("/auth/google", body);

  const cookiesArray = response.headers["set-cookie"] || [];

  for (const token of cookiesArray) {
    const object = parseCookie(token);
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
  console.log(cookiesArray);

  return NextResponse.json(response.data);
};
