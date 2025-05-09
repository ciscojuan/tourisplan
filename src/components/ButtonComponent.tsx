import Link from "next/link";
import React from "react";

interface Props {
  path: string;
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}
export const ButtonComponent = ({ path, title, icon, onClick }: Props) => {
  // Si hay un onClick, usar un botón en lugar de un Link
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="flex justify-center gap-5 items-center p-4 w-55 text-center m-4 bg-gray-800 hover:bg-amber-600 rounded-2xl text-white"
      >
        {title}
        {icon}
      </button>
    );
  }

  // Si no hay onClick, usar Link para navegación
  return (
    <Link href={path}>
      <div className="flex justify-center gap-5 items-center p-4 w-55 text-center m-4 bg-gray-800 hover:bg-amber-600 rounded-2xl text-white">
        {title}
        {icon}
      </div>
    </Link>
  );
};
