"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  path: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export const SideBarMenuItem = ({ path, icon, title, subtitle }: Props) => {
  const currentPath = usePathname();
  return (
    <Link
      href={path}
      className={`w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-2 hover:bg-amber-600 transition ease-linear duration-150 rounded-2xl mb-2 ${
        currentPath === path && "bg-white/9"
      } `}
    >
      <div>{icon}</div>
      <div className="flex flex-col">
        <span className="text-md font-bold leading-5 text-white text-center">
          {title}
        </span>
        <span className="text-sm text-white/50 hidden md:block text-center">
          {subtitle}
        </span>
      </div>
    </Link>
  );
};
