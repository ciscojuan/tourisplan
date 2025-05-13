"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { CiLogin, CiLogout } from "react-icons/ci";
import { usePathname } from "next/navigation";

export const AuthButton = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "unauthenticated") {
    return (
      <button
        onClick={() => signIn()}
        className="flex justify-center gap-5 items-center p-4 w-55 text-center m-4 bg-gray-800 hover:bg-amber-600 rounded-2xl text-white"
      >
        <span className=" items-center space-x-4 text-white group">
          Ingresar
        </span>
        <CiLogin />
      </button>
    );
  }
  return (
    <button
      onClick={() => signOut()}
      className="flex justify-center gap-5 items-center p-4 w-55 text-center m-4 bg-gray-800 hover:bg-amber-600 rounded-2xl text-white"
    >
      <span className=" items-center space-x-4 text-white group">Salir</span>
      <CiLogout />
    </button>
  );
};
