"use client";

import { signIn, signOut } from "next-auth/react";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { ButtonComponent } from "./ButtonComponent";

export function SignOutButton() {
  return (
    <ButtonComponent
      title="Salir"
      path="#"
      icon={<IoLogOutOutline />}
      onClick={() => signOut()}
    />
  );
}

export function SignInButton() {
  return (
    <ButtonComponent
      title="Ingresar"
      path="#"
      icon={<IoLogInOutline />}
      onClick={() => signIn()}
    />
  );
}
