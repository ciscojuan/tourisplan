"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("hola");
  }, []);
  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  );
}
