"use client";
import Image from "next/image";
import React from "react";
import { IoAirplaneOutline, IoLogoReact } from "react-icons/io5";
import { SideBarMenuItem } from "./SideBarMenuItem";

export const Sidebard = () => {
  const menuItems = [
    {
      path: "/planesTuristicos",
      icon: <IoAirplaneOutline size={40} />,
      title: "Planes turisticos",
      subtitle: "Ver Planes",
    },
  ];
  return (
    <div
      id="menu"
      className="bg-gray-900 min-h-screen z-10 text-slate-300 w-[400px] left-0 border-r-4 border-amber-700"
    >
      <div id="logo" className="my-4 px-6">
        <h1 className="text-lg md:text-2xl font-bold text-white flex items-center">
          <IoLogoReact className="animate-spin duration-2000" />
          <span className="text-white animate-pulse ml-2">Tourisplan</span>
        </h1>
        <p className="text-sm text-center text-amber-600">
          Realiza tu reserva facil y sencillo sin moverte de tu cama.
        </p>
      </div>
      <div id="profile" className="px-6 py-10">
        <p className="text-slate-500">Welcome back,</p>
        <div className="inline-flex space-x-2 items-center">
          <span>
            <Image
              className="rounded-full w-8 h-8"
              width={100}
              height={100}
              src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80"
              alt="User avatar"
            />
          </span>
          <span className="text-sm md:text-base font-bold text-center">
            Juan Ramírez
          </span>
        </div>
      </div>
      <div id="nav" className="w-full px-6">
        {menuItems.map((item, index) => (
          <SideBarMenuItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};
