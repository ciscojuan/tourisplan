"use client";
import PlaneImage from "@/components/PlaneImage";

import { Plan, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";

interface Reserva {
  id: string;
  fecha: string;
  plan: Plan;
  user: User;
  hora: string;
  servicio: string;
  estado: string;
}

export default function ReservasPage() {
  const session = useSession();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  console.log(reservas);
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch("/api/reservas");
        const data = await response.json();
        setReservas(data);
      } catch (error) {
        console.error("Error fetching reservas:", error);
      }
    };

    fetchReservas();
  }, []);

  if (!session) redirect("api/auth/signin");

  return (
    <div className=" justify-center items-center">
      <h1 className="text-5xl text-center">Mis Reservas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {reservas.map((reserva) => (
          <div
            key={reserva.id}
            className="flex flex-col items-center text-center max-w-sm  border border-amber-600 rounded-lg shadow-sm dark:bg-amber-600 p-8"
          >
            <div className="w-[200px] h-[200px] relative overflow-hidden rounded-lg">
              <div className="mb-6">
                <PlaneImage
                  src={
                    reserva.plan.image[0].startsWith("http")
                      ? reserva.plan?.image[0]
                      : ""
                  }
                  alt={reserva.plan.nombre_plan}
                  width={800}
                  height={400}
                />
              </div>
            </div>

            <div className="p-5 flex flex-col items-center">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {reserva.plan.nombre_plan}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {reserva.plan.descripcion &&
                reserva.plan.descripcion.length > 100
                  ? `${reserva.plan.descripcion.substring(0, 100)}...`
                  : reserva.plan.descripcion || "Sin descripción disponible"}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Nombre: {reserva.user.name}
              </p>
              <Link
                href={`/plan-turistico/${reserva.plan.id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-amber-600 focus:ring-4 focus:outline-none "
              >
                Ver Plan Turistico
                <IoArrowForwardOutline className="ml-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
