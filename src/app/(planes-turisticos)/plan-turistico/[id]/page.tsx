import prisma from "@/lib/prisma";
import { PlanTuristico } from "@/planes-turisticos/interfaces";
import { getTuristicPlan } from "@/utils/queries";
import { Metadata } from "next";
import React from "react";
import PlaneImage from "@/components/PlaneImage";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { IoBook, IoLogInSharp } from "react-icons/io5";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { ButtonComponent } from "@/components";
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

    // Check if user is logged in
    const session = await getServerSession(authOptions);

    // Create a server action for reservation
    async function createReservation(formData: FormData) {
      "use server";

      const session = await getServerSession(authOptions);
      if (!session?.user) {
        redirect("/api/auth/signin");
      } else {
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

          {/* Use a form with action instead of onClick */}

          {!session ? (
            <ButtonComponent
              path="/api/auth/signin"
              title="Inicia sesion para reservar"
              icon={<IoLogInSharp size={30} />}
            />
          ) : (
            <form action={createReservation} className="mt-6">
              <ButtonComponent
                title="Reserva"
                path="/mis-reservas"
                icon={<IoBook size={30} />}
              />
            </form>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in PlanTuristicopage:", error);
    notFound();
  }
}
