import { User } from "@/Utils/types";
import Link from "next/link";
import React from "react";

const student: { title: string; href: string }[] = [
  
];

const faculty: { title: string; href: string }[] = [
  
];
const admin: { title: string; href: string }[] = [
  
];

function SideBarUl({ role }: { role: string }) {
  const user = role;
  const components =
    user === "student"
      ? student
      : user === "faculty"
        ? faculty
        : user === "admin"
          ? admin
          : student;
  return (
    <>
      <ul id="dropdown-example" className="py-2 space-y-2">
        {components.map((component, i) => (
          <li key={i}>
            <Link
              href={component.href}
              className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 ps-11 dark:text-white dark:hover:bg-gray-700"
            >
              {component.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default SideBarUl;
