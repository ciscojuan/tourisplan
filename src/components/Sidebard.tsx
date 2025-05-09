import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import Image from "next/image";
import { IoAirplaneOutline, IoPersonOutline } from "react-icons/io5";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { SideBarMenuItem } from "./SideBarMenuItem";
import { SignInButton, SignOutButton } from "./AuthButton";

const avatars: string[] = [
  "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ECA649992C3ECF9D41FEF7629CAA0E7561824A2F5811140849FCB0C27F8A5266/scale?width=300&aspectRatio=1.00&format=png",
  "https://ia903406.us.archive.org/5/items/49_20210404/100.png",
  "https://ia903406.us.archive.org/5/items/49_20210404/102.png",
  "https://ia803406.us.archive.org/5/items/49_20210404/106.png",
  "https://ia803406.us.archive.org/5/items/49_20210404/118.png",
  "https://ia903406.us.archive.org/5/items/49_20210404/120.png",
  "https://ia803406.us.archive.org/5/items/49_20210404/127.png",
  "https://ia903406.us.archive.org/5/items/49_20210404/129.png",
  "https://ia803406.us.archive.org/5/items/49_20210404/131.png",
  "https://ia803406.us.archive.org/5/items/49_20210404/25.png",
  "https://ia803406.us.archive.org/5/items/49_20210404/44.png",
  // "
];

export const Sidebard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin");

  const user = session.user;

  if (!user || !user.image || !user.name) {
    // Manejar el caso donde faltan datos de usuario
    return (
      <div className="flex flex-col p-4">
        <h1 className="text-5xl text-center">
          INFORMACIÓN DE USUARIO INCOMPLETA
        </h1>
      </div>
    );
  }

  const avatarIndex = Math.floor(Math.random() * avatars.length);
  const avatar = session.user?.image
    ? session.user.image
    : avatars[avatarIndex];

  const menuItems = [
    {
      path: "/planesTuristicos",
      icon: <IoAirplaneOutline size={20} />,
      title: "Planes turisticos",
      subtitle: "Ver Planes",
    },
    {
      path: "/profile",
      icon: <IoPersonOutline size={20} />,
      title: "Mis reservas",
      subtitle: "Gestiona tus reservas",
    },
  ];
  return (
    <div
      id="menu"
      className="bg-gray-900 min-h-screen z-10 text-slate-300 w-[400px] left-0 border-r-4 border-amber-700 flex flex-col"
    >
      <div id="logo" className="my-4 px-6">
        <h1 className="text-lg  md:text-2xl font-bold text-white flex ">
          <span className="text-center text-white  animate-pulse ml-2">
            Tourisplan
          </span>
        </h1>
        <p className="text-sm text-center text-white">
          Realiza tu reserva facil y sencillo sin moverte de tu cama.
        </p>
      </div>
      <div id="profile" className="px-6 py-10">
        <div className="flex flex-col space-x-2 items-center">
          <div className="border-2 border-amber-600 rounded-full p-2 mb-2">
            <Image
              className="rounded-full"
              width={80}
              height={80}
              src={avatar}
              alt="User avatar"
            />
          </div>
          <h3 className="text-md md:text-base font-bold text-center mb-2">
            Juan Ramírez
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Administrador
          </p>
        </div>
      </div>
      <div id="nav" className="w-full px-6">
        {menuItems.map((item, index) => (
          <SideBarMenuItem key={index} {...item} />
        ))}
      </div>

      <div className="absolute bottom-0">
        {
          <div className="absolute bottom-0">
            {session.user ? <SignOutButton /> : <SignInButton />}
          </div>
        }
      </div>
    </div>
  );
};
