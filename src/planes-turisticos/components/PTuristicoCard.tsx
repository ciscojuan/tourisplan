"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PlanTuristico } from "../interfaces";
import { IoArrowForwardOutline } from "react-icons/io5";
import Image from "next/image";

interface Props {
  planTuristico: PlanTuristico;
}

export const PTuristicoCard = ({ planTuristico }: Props) => {
  const DEFAULT_IMAGE =
    "https://hips.hearstapps.com/hmg-prod/images/macchu-pichu-sunset-royalty-free-image-1663587235.jpg?crop=1xw:1xh;center,top&resize=980:*";

  const [image, setImage] = useState(DEFAULT_IMAGE);
  const { id, images, name, description } = planTuristico;

  useEffect(() => {
    if (images && images.length > 0 && images[0]?.startsWith("http")) {
      setImage(images[0]);
    }
  }, [images]);

  const handleImageError = () => {
    setImage(DEFAULT_IMAGE);
  };

  return (
    <div
      key={id}
      className="flex flex-col items-center text-center max-w-sm  border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-8"
    >
      <div className="w-[200px] h-[200px] relative overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          onError={handleImageError}
          priority={true}
        />
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
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Ver Plan Turistico
          <IoArrowForwardOutline className="ml-4" />
        </Link>
      </div>
    </div>
  );
};
