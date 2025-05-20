"use client";

import { IoBook } from "react-icons/io5";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ReservationFormProps {
  createPlan: (
    formData: FormData
  ) => Promise<{ success: boolean; error?: string }>;
}

export default function ReservationForm({ createPlan }: ReservationFormProps) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const result = await createPlan(formData);
    if (result.success) {
      toast.success("¡Reserva creada exitosamente!");
      router.push("/mis-reservas");
    } else {
      toast.error(result.error || "Error al crear la reserva");
    }
  };

  return (
    <form action={handleSubmit} className="mt-6">
      <button
        type="submit"
        className="p-4 text-center my-4 bg-amber-600 rounded-2xl text-white flex justify-evenly items-center gap-6 cursor-pointer transition-transform hover:scale-105"
      >
        <IoBook size={30} /> Reserva
      </button>
    </form>
  );
}
