import type { Metadata } from "next";
import "./globals.css";
import { Sidebard } from "@/components";
import { AuthProvider } from "../auth";

export const metadata: Metadata = {
  title: "Planes Turistico por Colombia",
  description:
    "Planes turisticos por COLOMBIA Realiza tu reserva facil y sencillo sin salir de tu casa. 🏖️ Aplicación web para la consulta y reserva de planes turísticos en Colombia, desarrollada con Next.js y enfocada en prácticas ágiles, CI/CD y seguridad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <div className=" overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
            <div className="flex">
              <Sidebard />
              <div className="w-full text-slate-900">{children}</div>
            </div>
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
