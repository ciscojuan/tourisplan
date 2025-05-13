import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import Image from "next/image";
import { IoAirplaneOutline, IoPersonOutline } from "react-icons/io5";
import { getServerSession } from "next-auth";

import { SideBarMenuItem } from "./SideBarMenuItem";
import { AuthButton } from "./AuthButton";

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
];

export const Sidebard = async () => {
  const session = await getServerSession(authOptions);
  const userRole = session?.user?.roles || ["user"];

  // Menú para todos los usuarios (autenticados y no autenticados)
  const publicMenuItems = [
    {
      path: "/planesTuristicos",
      icon: <IoAirplaneOutline size={20} />,
      title: "Planes turisticos",
      subtitle: "Ver Planes",
    },
  ];

  // Menú adicional solo para usuarios autenticados
  const privateMenuItems = [
    {
      path: "/mis-reservas",
      icon: <IoPersonOutline size={20} />,
      title: "Mis reservas",
      subtitle: "Gestiona tus reservas",
    },
  ];

  // Si no hay sesión, mostrar solo el menú público
  if (!session) {
    return (
      <div
        id="menu"
        className="bg-gray-900 min-h-screen z-10 text-slate-300 w-[400px] left-0 border-r-4 border-amber-700 flex flex-col"
      >
        <div id="logo" className="my-4 px-6">
          <h1 className="text-lg md:text-2xl font-bold text-white flex">
            <span className="text-center text-white animate-pulse ml-2">
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
                src={avatars[Math.floor(Math.random() * avatars.length)]}
                alt="Guest avatar"
              />
            </div>
            <h3 className="text-md md:text-base font-bold text-center mb-2">
              Invitado
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Explora nuestros planes
            </p>
          </div>
        </div>

        <div id="nav" className="w-full px-6">
          {publicMenuItems.map((item, index) => (
            <SideBarMenuItem key={index} {...item} />
          ))}
        </div>

        <div className="absolute bottom-0">
          <AuthButton />
        </div>
      </div>
    );
  }

  // Si hay sesión pero faltan datos del usuario
  if (!session.user || !session.user.name) {
    // Usar un avatar aleatorio
    const avatarIndex = Math.floor(Math.random() * avatars.length);
    const avatar = session.user?.image || avatars[avatarIndex];

    return (
      <div
        id="menu"
        className="bg-gray-900 min-h-screen z-10 text-slate-300 w-[400px] left-0 border-r-4 border-amber-700 flex flex-col"
      >
        <div id="logo" className="my-4 px-6">
          <h1 className="text-lg md:text-2xl font-bold text-white flex">
            <span className="text-center text-white animate-pulse ml-2">
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
              {userRole.join(",")}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Información incompleta
            </p>
          </div>
        </div>

        <div id="nav" className="w-full px-6">
          {[...publicMenuItems, ...privateMenuItems].map((item, index) => (
            <SideBarMenuItem key={index} {...item} />
          ))}
        </div>

        <div className="absolute bottom-0">
          <AuthButton />
        </div>
      </div>
    );
  }

  // Usuario completamente autenticado con todos los datos
  const avatarIndex = Math.floor(Math.random() * avatars.length);
  const avatar = session.user.image || avatars[avatarIndex];

  return (
    <div
      id="menu"
      className="bg-gray-900 min-h-screen z-10 text-slate-300 w-[400px] left-0 border-r-4 border-amber-700 flex flex-col"
    >
      <div id="logo" className="my-4 px-6">
        <h1 className="text-lg md:text-2xl font-bold text-white flex">
          <span className="text-center text-white animate-pulse ml-2">
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
            {session.user.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            {userRole.join(", ")}
          </p>
        </div>
      </div>
      <div id="nav" className="w-full px-6">
        {[...publicMenuItems, ...privateMenuItems].map((item, index) => (
          <SideBarMenuItem key={index} {...item} />
        ))}
      </div>

      <div className="absolute bottom-0">
        <AuthButton />
      </div>
    </div>
  );
};
