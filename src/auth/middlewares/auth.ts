import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const withAuthorization = async (
  allowedRoles: string[] = ["admin", "user"]
) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      authorized: false,
      error: new NextResponse("Unauthorized", { status: 401 }),
    };
  }

  const userRoles = session.user.roles || [];
  const hasPermission = allowedRoles.some((role) => userRoles.includes(role));

  if (!hasPermission) {
    return {
      authorized: false,
      error: new NextResponse("Forbidden", { status: 403 }),
    };
  }

  return { authorized: true, session };
};
