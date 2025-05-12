"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ReservasPage() {
  const session = useSession();

  if (!session) redirect("api/auth/signin");
  return (
    <div>
      <h1>Mis Reservas</h1>
    </div>
  );
}
