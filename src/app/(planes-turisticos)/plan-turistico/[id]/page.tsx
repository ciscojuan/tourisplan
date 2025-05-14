import prisma from "@/lib/prisma";
import { PlanTuristico } from "@/planes-turisticos/interfaces";
import { getTuristicPlan } from "@/utils/queries";
import { Metadata } from "next";
import React from "react";
import PlaneImage from "@/components/PlaneImage";
import { notFound, redirect } from "next/navigation";

import { IoBook } from "react-icons/io5";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { revalidatePath } from "next/cache";

type PageParams = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const planTuristicoData = await getTuristicPlan(id);
    if (!planTuristicoData.ok) {
      return {
        title: "Plan Turístico no encontrado",
        description: "El plan turístico solicitado no existe",
      };
    }
    const planTuristico: PlanTuristico = await planTuristicoData.json();

    return {
      title: `${planTuristico.name}`,
      description:
        planTuristico.description ||
        `Plan turístico en ${planTuristico.city?.name || "Colombia"}`,
    };
  } catch (error) {
    return {
      title: "Error",
      description: "Error al cargar el plan turístico",
    };
  }
}

export default async function PlanTuristicopage({
  params,
}: {
  params: PageParams;
}) {
  try {
    const { id } = await params;
    const planTuristicoData = await getTuristicPlan(id);
    const session = await getServerSession(authOptions);

    if (!planTuristicoData.ok) {
      console.error(
        "Error fetching plan:",
        planTuristicoData.status,
        planTuristicoData.statusText
      );
      notFound();
    }

    const planTuristico: PlanTuristico = await planTuristicoData.json();
    const { name, description, images, city, department } = planTuristico;
    //Server Action para crear plan turistico
    async function createReservation(formData: FormData) {
      "use server";

      if (!session?.user) {
        throw new Error("Debe iniciar sesión para reservar");
      }

      try {
        // First, check if the plan exists in our database, if not create it
        const existingPlan = await prisma.plan.findUnique({
          where: { id: parseInt(id) },
        });

        if (!existingPlan) {
          await prisma.plan.create({
            data: {
              id: parseInt(id),
              nombre_plan: name,
              image: images && images.length > 0 ? images[0] : "",
              descripcion: description,
            },
          });
        }

        // Create the reservation
        await prisma.reserva.create({
          data: {
            planId: parseInt(id),
            userId: session.user.id as string,
            estado: "pendiente",
          },
        });

        revalidatePath("/mis-reservas");
        redirect("/mis-reservas");
      } catch (error) {
        console.error("Error creating reservation:", error);
        // Instead of returning an error object, we could throw an error
        // or handle it differently
      }
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">{name}</h1>
          {images && images.length > 0 && (
            <div className="mb-6">
              <PlaneImage
                src={images[0].startsWith("http") ? images[0] : ""}
                alt={name}
                width={800}
                height={400}
              />
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Ubicación</h2>
            <div className="text-gray-600 dark:text-gray-300 mb-6">
              {city && <p>Ciudad: {city.name}</p>}
              {department && <p>Departamento: {department.name}</p>}
            </div>

            <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {description || "No hay descripción disponible"}
            </p>
          </div>

          <form action={createReservation} className="mt-6">
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={!session?.user}
            >
              <IoBook /> Reservar
            </button>
          </form>

          {!session && (
            <p className="mt-4 text-red-500">
              Debe iniciar sesión para poder reservar este plan
            </p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in PlanTuristicopage:", error);
    notFound();
  }
}
