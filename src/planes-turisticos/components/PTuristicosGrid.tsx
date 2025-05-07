import PlaneImage from "@/components/PlaneImage";
import { PlanTuristico } from "../interfaces";
import { IoArrowForwardOutline } from "react-icons/io5";

interface Props {
  planesTuristicos: PlanTuristico[];
}
export const PTuristicosGrid = ({ planesTuristicos }: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 ">
      {planesTuristicos.map((item, index) => {
        const imageUrl = item.images[0]?.startsWith("http")
          ? item.images[0]
          : "";
        return (
          <div
            key={item.id}
            className="flex flex-col items-center text-center max-w-sm  border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-8"
          >
            <PlaneImage
              key={item.id}
              src={imageUrl}
              alt={item.name}
              width={200}
              height={200}
            />

            <div className="p-5 flex flex-col items-center">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {item.description && item.description.length > 100
                  ? `${item.description.substring(0, 100)}...`
                  : item.description || "Sin descripción disponible"}
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Ver Plan Turistico
                <IoArrowForwardOutline className="ml-4" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
