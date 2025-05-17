"use client";
import { useState } from "react";
import { Reserva } from "@prisma/client";
import { PlanTuristico } from "../interfaces";
import { PTuristicoCard } from "./PTuristicoCard";

interface Props {
  planesTuristicos: PlanTuristico[];
  reservas?: Reserva[];
}

export const PTuristicosGrid = ({ planesTuristicos, reservas }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calcular el índice inicial y final para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = planesTuristicos.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(planesTuristicos.length / itemsPerPage);

  // Función para cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {currentItems.map((item, index) => (
          <PTuristicoCard key={index} planTuristico={item} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav>
            <ul className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i}>
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-amber-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};
