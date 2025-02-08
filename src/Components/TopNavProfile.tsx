import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import A from "./ui/a";
import { User } from "@/Utils/types";

function TopNavProfile({ user }: { user: { user: User } }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const userRole = user?.user?.user || "Guest";
  const userName = user?.user?.name;
  const student: { title: string; href: string }[] = [];

  const faculty: { title: string; href: string }[] = [];
  const admin: { title: string; href: string }[] = [];
  const guest: { title: string; href: string }[] = [
    {
      title: "Sign in",
      href: "/login",
    },
    {
      title: "Sign Up",
      href: "/signUp",
    },
  ];
  const commune: { title: string; href: string }[] = [
    {
      title: userName || "Profile",
      href: "/profile",
    },
    {
      title: "Logout",
      href: "/logout",
    },
  ];
  const communeForAll: { title: string; href: string }[] = [];
  const communeComponents = commune;
  const components =
    userRole === "Guest"
      ? guest
      : userRole === "student"
      ? student
      : userRole === "faculty"
      ? faculty
      : userRole === "admin"
      ? admin
      : null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <>
      <A links={{ linkDetails: communeForAll }} />

      {userRole !== "Guest" ? (
        <>
          <div className="ms-4"></div>
          <div>
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-expanded={isUserMenuOpen}
              onClick={toggleUserMenu}
            >
              <span className="sr-only">Open user menu</span>
              <Image
                src={user?.user?.image}
                alt="Profile Picture"
                width={32}
                height={32}
              />
            </button>
          </div>

          {isUserMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 top-4 mt-10 w-48  rounded-lg shadow-lg bg-gray-800"
            >
              <div className="py-1">
                <A links={{ linkDetails: components }} />
                <A links={{ linkDetails: communeComponents }} />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <A links={{ linkDetails: guest }} />
          <div className="ms-4"></div>
          <div>
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-expanded={isUserMenuOpen}
              onClick={toggleUserMenu}
            >
              <span className="sr-only">Open user menu</span>
              <Image
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="Profile Picture"
                width={32}
                height={32}
              />
            </button>
          </div>
          {isUserMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 top-4 mt-10 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-800"
            >
              <div className="py-1">
                <p className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                  Hello Guest
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default TopNavProfile;
