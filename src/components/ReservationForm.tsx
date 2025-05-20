"use client";

import { IoBook } from "react-icons/io5";

interface ReservationFormProps {
  createPlan: (formData: FormData) => Promise<void>;
}

export default function ReservationForm({ createPlan }: ReservationFormProps) {
  return (
    <form action={createPlan} className="mt-6">
      <button
        type="submit"
        className="p-4 text-center my-4 bg-amber-600 rounded-2xl text-white flex justify-evenly items-center gap-6 cursor-pointer transition-transform hover:scale-105"
      >
        <IoBook size={30} /> Reserva
      </button>
    </form>
  );
}
