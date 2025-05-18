import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth";
import { withAuthorization } from "@/auth/middlewares/auth";

export const GET = async () => {
  // Verificar autorización
  const auth = await withAuthorization(["admin", "user"]);
  if (!auth.authorized) return auth.error;

  const session = auth.session;

  // Get reservations with related data for logged in user
  const reservas = await prisma.reserva.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      user: true,
      plan: true,
    },
  });

  return NextResponse.json(reservas);
};
