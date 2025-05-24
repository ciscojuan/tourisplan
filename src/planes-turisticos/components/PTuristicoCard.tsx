"use client";
import Link from "next/link";
import { PlanTuristico } from "../interfaces";
import { IoArrowForwardOutline } from "react-icons/io5";
import PlaneImage from "@/components/PlaneImage";
import { Reserva } from "@prisma/client";

interface Props {
  planTuristico: PlanTuristico;
  reserva?: Reserva;
}

export const PTuristicoCard = ({ planTuristico, reserva }: Props) => {
  const { id, images, name, description } = planTuristico;

  // Verificar si images existe y tiene elementos
  const imageUrl =
    images && images.length > 0 && images[0].startsWith("http")
      ? images[0]
      : "https://hips.hearstapps.com/hmg-prod/images/macchu-pichu-sunset-royalty-free-image-1663587235.jpg?crop=1xw:1xh;center,top&resize=980";

  return (
    <div
      key={id}
      className="flex flex-col items-center text-center max-w-sm  border border-amber-600 rounded-lg shadow-sm dark:bg-amber-600 p-8"
    >
      <div className="w-[150px] h-[150px] relative overflow-hidden rounded-lg">
        <div className="mb-3">
          <PlaneImage src={imageUrl} alt={name} width={800} height={400} />
        </div>
      </div>

      <div className="p-5 flex flex-col items-center">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description && description.length > 100
            ? `${description.substring(0, 100)}...`
            : description || "Sin descripción disponible"}
        </p>
        <Link
          href={`/plan-turistico/${id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-amber-600 focus:ring-4 focus:outline-none "
        >
          Ver Plan Turistico
          <IoArrowForwardOutline className="ml-4" />
        </Link>
      </div>
    </div>
  );
};
