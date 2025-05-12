import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export const GET = async () => {
  const reservas = await prisma.reserva.findMany();
  return NextResponse.json(reservas);
};
