"use client";
import { useState, useEffect, useRef } from "react";
import { useUserContext } from "@/app/context/userContext";
import TopNavProfile from "./TopNavProfile";
import SideBarLi from "./ui/SideBarli";
import downArrow from "@/app/assets/images/down.png";
import menuIcon from "@/app/assets/images/menus.png";
import Image from "next/image";
import Link from "next/link";
const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useUserContext();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full  border-b text-white bg-gray-800 border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex w-9 sm:hidden  items-center p-2 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Open sidebar</span>
                <Image
                  src={menuIcon}
                  alt="Profile Picture"
                  width={40}
                  height={40}
                />
              </button>
              <Link href="/dashboard" className="flex ms-2 md:me-24">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Lms
                </span>
              </Link>
              
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <TopNavProfile user={{ user: user }} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 text-white transition-transform ${isSidebarOpen ? "sm:translate-x-0" : "-translate-x-full"}  border-r border-gray-200 bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto text-white bg-gray-800">
          <ul className="space-y-2 font-medium">
            <SideBarLi user={{ user: user }} />
            
          </ul>
        </div>
      </aside>
    </>
  );
};

export default NavBar;
