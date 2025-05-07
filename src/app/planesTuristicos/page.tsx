import { getTuristicPlans } from "@/utils/queries";
import { PTuristicosGrid } from "@/planes-turisticos";

export const metadata = {
  title: "Planes turísticos por COLOMBIA",
  description: "Descubre los mejores planes turísticos en Colombia",
};

export default async function PlanesTuristicosPage() {
  const planesTuristicos = await getTuristicPlans().then((res) => res.json());

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Planes Turísticos en Colombia
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <PTuristicosGrid planesTuristicos={planesTuristicos} />
      </div>
    </div>
  );
}
