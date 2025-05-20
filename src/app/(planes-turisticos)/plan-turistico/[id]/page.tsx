import prisma from "@/lib/prisma";
import { PlanTuristico } from "@/planes-turisticos/interfaces";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { IoBook, IoLogInSharp } from "react-icons/io5";
import { revalidatePath } from "next/cache";
import createDOMPurify from "isomorphic-dompurify";
import { encode } from "html-entities";
import sanitizeHtml from "sanitize-html";

import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getTturisticPlanById, getTuristicPlan } from "@/utils/queries";
import PlaneImage from "@/components/PlaneImage";
import { ButtonComponent } from "@/components";
import ReservationForm from "@/components/ReservationForm";
import { randomUUID } from "crypto";

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
    const planTuristicoRaw: PlanTuristico = await planTuristicoData.json();
    const planTuristico = {
      ...planTuristicoRaw,
      name: encode(createDOMPurify.sanitize(planTuristicoRaw.name)),
      description: encode(
        createDOMPurify.sanitize(planTuristicoRaw.description || "")
      ),
      city: {
        ...planTuristicoRaw.city,
        name: encode(
          createDOMPurify.sanitize(planTuristicoRaw.city?.name || "")
        ),
      },
    };

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

    let planTuristico;
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) {
      const response = await getTuristicPlan(id);
      if (!response.ok) {
        console.error(
          "Error fetching plan:",
          response.status,
          response.statusText
        );
        notFound();
      }
      planTuristico = await response.json();
    } else {
      const result = await getTturisticPlanById(id);
      if (!result) {
        console.error("Plan not found with ID:", id);
        notFound();
      }

      // Adaptar la estructura del resultado de Prisma al formato esperado de PlanTuristico
      planTuristico = {
        id: result.id,
        name: result.nombre_plan,
        description: result.descripcion,
        images: result.image ? [result.image] : [],
        // Proporcionar valores predeterminados para city y department si no existen
        city: { name: "No disponible" },
        department: { name: "No disponible" },
      };
    }

    // Sanitize the data to prevent XSS attacks
    planTuristico = JSON.parse(sanitizeHtml(JSON.stringify(planTuristico)));

    const { name, description, images, city, department } = planTuristico;

    // Check if user is logged in
    const session = await getServerSession(authOptions);

    // Create a server action for reservation
    async function createPlan(formData: FormData) {
      "use server";

      try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
          redirect("/api/auth/signin");
        }

        // Generar un ID único para el plan
        const planId = randomUUID();

        // Safely access image URL
        const imageUrl =
          images &&
          images.length > 0 &&
          typeof images[0] === "string" &&
          images[0].startsWith("http")
            ? images[0]
            : null;

        // Crear el plan con el ID generado
        await prisma.plan.create({
          data: {
            id: planId,
            nombre_plan: name,
            image: imageUrl,
            descripcion: description || "",
          },
        });

        // Crear la reserva con el mismo ID del plan
        await prisma.reserva.create({
          data: {
            planId: planId,
            userId: session.user.id as string,
            estado: "pendiente",
          },
        });

        revalidatePath("/mis-reservas");
        redirect("/mis-reservas");
      } catch (err) {
        console.error("Reservation creation failed:", err);
        redirect("/mis-reservas");
      }
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">{name}</h1>
          {images && Array.isArray(images) && images.length > 0 && (
            <div className="mb-6">
              <PlaneImage
                src={
                  typeof images[0] === "string" && images[0].startsWith("http")
                    ? images[0]
                    : ""
                }
                alt={name || "Plan turístico"}
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

          {!session ? (
            <ButtonComponent
              path="/api/auth/signin"
              title="Inicia sesion para reservar"
              icon={<IoLogInSharp size={30} />}
            />
          ) : (
            <ReservationForm createPlan={createPlan} />
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in PlanTuristicopage:", error);
    notFound();
  }
}
