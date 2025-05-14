import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth";

export const GET = async () => {
  // Get user session
  const session = await getServerSession(authOptions);
  // Return unauthorized if no session
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Get reservations with related data for logged in user
  const reservas = await prisma.reserva.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      user: true,
      plan: true,
    },
  });

  return NextResponse.json(reservas);
};
