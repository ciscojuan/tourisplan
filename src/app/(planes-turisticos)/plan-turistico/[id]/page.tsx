import { PlanTuristico } from "@/planes-turisticos/interfaces";
import { getTuristicPlan } from "@/utils/queries";
import { Metadata } from "next";
import React from "react";
import PlaneImage from "@/components/PlaneImage";
import { notFound } from "next/navigation";

import { ButtonComponent } from "@/components";
import { IoBook } from "react-icons/io5";

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
          <ButtonComponent
            path="/mis-reservas"
            title="Reservar"
            icon={<IoBook />}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in PlanTuristicopage:", error);
    notFound();
  }
}
