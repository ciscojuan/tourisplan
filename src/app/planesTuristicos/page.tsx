import { IoPlanetOutline } from "react-icons/io5";
import { PlanTuristico } from "../../planes-turisticos/interfaces";
import PlaneImage from "@/components/PlaneImage";
import { PTuristicosGrid } from "@/planes-turisticos";

export const metadata = {
  title: "Planes turísticos por COLOMBIA",
  description: "Descubre los mejores planes turísticos en Colombia",
  icon: <IoPlanetOutline />,
};

const getTuristicPlanes = async (
  limit = 20,
  offset = 0
): Promise<PlanTuristico[]> => {
  try {
    const response = await fetch(
      `https://api-colombia.com/api/v1/TouristicAttraction?limit=${limit}&offset=${offset}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data: any[] = await response.json();

    const planesTuristicos: PlanTuristico[] = data.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description || "",
      images: Array.isArray(item.images) ? item.images : [],
      city: item.city,
      department: item.department,
    }));

    return planesTuristicos;
  } catch (error) {
    console.error("Error fetching touristic plans:", error);
    return [];
  }
};

export default async function PlanesTuristicosPage() {
  const planesTuristicos = await getTuristicPlanes(10);

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
