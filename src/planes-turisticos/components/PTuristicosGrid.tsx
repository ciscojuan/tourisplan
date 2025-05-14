import { Reserva } from "@prisma/client";
import { PlanTuristico } from "../interfaces";
import { PTuristicoCard } from "./PTuristicoCard";

interface Props {
  planesTuristicos: PlanTuristico[];
  reservas?: Reserva[];
}
export const PTuristicosGrid = ({ planesTuristicos, reservas }: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 ">
      {planesTuristicos.map((item, index) => (
        <PTuristicoCard key={index} planTuristico={item} />
      ))}
    </div>
  );
};
