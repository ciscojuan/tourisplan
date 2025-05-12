"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

interface Props {
  path: string;
  title: string;
  icon: React.ReactNode;
}
export const ButtonComponent = ({ path, title, icon }: Props) => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <Link href={path}>
      <div className="p-4 w-3xs text-center my-4 bg-amber-600 rounded-2xl text-white flex justify-evenly items-center">
        {title}
        <span className="">{icon}</span>
      </div>
    </Link>
  );
};
