import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import PlaneImage from "@/components/PlaneImage";
import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function MisReservasPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const reservas = await prisma.reserva.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      plan: true,
    },
  });

  // Manejar searchParams de forma segura
  const success =
    typeof searchParams.success === "string"
      ? searchParams.success === "true"
      : false;
  const error =
    typeof searchParams.error === "string" ? searchParams.error : undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          ¡Reserva creada exitosamente!
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {decodeURIComponent(error)}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">Mis Reservas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reservas.length > 0 ? (
          reservas.map((reserva) => (
            <div
              key={reserva.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="w-full h-48 relative overflow-hidden rounded-lg mb-4">
                <PlaneImage
                  src={
                    reserva.plan.image && reserva.plan.image.startsWith("http")
                      ? reserva.plan.image
                      : ""
                  }
                  alt={reserva.plan.nombre_plan}
                  width={800}
                  height={400}
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">
                {reserva.plan.nombre_plan}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Estado: {reserva.estado}
              </p>
              <Link
                href={`/plan-turistico/${reserva.plan.id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-amber-600 focus:ring-4 focus:outline-none"
              >
                Ver Plan Turístico
                <IoArrowForwardOutline className="ml-2" />
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <h2 className="text-2xl">No has realizado ninguna Reserva</h2>
          </div>
        )}
      </div>
    </div>
  );
}
