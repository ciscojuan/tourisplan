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
import { getTuristicPlan } from "@/utils/queries";
import PlaneImage from "@/components/PlaneImage";
import { ButtonComponent } from "@/components";

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

    const planTuristicoData = await getTuristicPlan(id);

    if (!planTuristicoData.ok) {
      console.error(
        "Error fetching plan:",
        planTuristicoData.status,
        planTuristicoData.statusText
      );
      notFound();
    }

    // Sanitize the JSON data to prevent XSS attacks
    const planTuristico: PlanTuristico = JSON.parse(
      sanitizeHtml(JSON.stringify(await planTuristicoData.json()))
    );
    const { name, description, images, city, department } = planTuristico;

    // Check if user is logged in
    const session = await getServerSession(authOptions);

    // Create a server action for reservation
    // For the createReservation server action:
    async function createReservation(formData: FormData) {
      "use server";

      try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
          redirect("/api/auth/signin");
        }

        // Validate ID
        const planId = parseInt(id);
        if (isNaN(planId)) {
          throw new Error("Invalid plan ID format");
        }

        // Use a transaction to prevent race conditions
        await prisma.$transaction(async (tx) => {
          const existingPlan = await tx.plan.findUnique({
            where: { id: planId },
          });

          if (!existingPlan) {
            // Validate required data
            if (!name) throw new Error("Plan name is required");

            // Safely access image URL
            const imageUrl =
              images &&
              images.length > 0 &&
              typeof images[0] === "string" &&
              images[0].startsWith("http")
                ? images[0]
                : "";

            await tx.plan.create({
              data: {
                id: planId,
                nombre_plan: name,
                image: imageUrl,
                descripcion: description || "",
              },
            });
          }

          // Create the reservation
          await tx.reserva.create({
            data: {
              planId: planId,
              userId: session.user?.id as string,
              estado: "pendiente",
            },
          });
        });

        revalidatePath("/mis-reservas");
        redirect("/mis-reservas");
      } catch (err) {
        // Improved error logging
        console.error("Reservation creation failed:", err);

        // Here you would typically return an error status
        // Since this is a server action, you might want to use a pattern
        // where you return { success: false, error: message }
        // and handle it in the UI
        throw err; // Re-throw to be handled by error boundary
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

          {/* Use a form with action instead of onClick */}

          {!session ? (
            <ButtonComponent
              path="/api/auth/signin"
              title="Inicia sesion para reservar"
              icon={<IoLogInSharp size={30} />}
            />
          ) : (
            <form action={createReservation} className="mt-6">
              <button
                type="submit"
                className="p-4 text-center my-4 bg-amber-600 rounded-2xl text-white flex justify-evenly items-center gap-6 cursor-pointer transition-transform hover:scale-105 "
              >
                <IoBook size={30} /> Reserva
              </button>
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
