import Link from "next/link";
import React from "react";

interface Props {
  path: string;
  title: string;
}
export const ButtonComponent = ({ path, title }: Props) => {
  return (
    <Link href={path}>
      <div className="p-4 w-3xs text-center m-4 bg-amber-600 rounded-2xl text-white">
        {title}
      </div>
    </Link>
  );
};
