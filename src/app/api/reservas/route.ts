import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async () => {
  const reservas = await prisma.reserva.findMany();
  return NextResponse.json(reservas);
};

export const POST = async (request: Request) => {
  const data = await request.json();
  const reserva = await prisma.reserva.create({ data });
  return NextResponse.json(reserva);
};
