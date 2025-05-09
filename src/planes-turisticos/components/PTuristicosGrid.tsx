import { PlanTuristico } from "../interfaces";
import { PTuristicoCard } from "./PTuristicoCard";

interface Props {
  planesTuristicos: PlanTuristico[];
}
export const PTuristicosGrid = ({ planesTuristicos }: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 ">
      {planesTuristicos.map((item, index) => (
        <PTuristicoCard key={index} planTuristico={item} />
      ))}
    </div>
  );
};
