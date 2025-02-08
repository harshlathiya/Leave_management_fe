import Link from "next/link";
import React from "react";
import A from "./a";
import { User } from "@/Utils/types";

function SideBarLi({ user }: { user: { user: User } }) {
  const userRole = user?.user?.user || "Guest";
  const userName = user?.user?.name;

  const student: { title: string; href: string }[] = [
    {
      title: "Leave",
      href: "/user/leave",
    },
    {
      title: "Leave Status",
      href: "/user/leavestatus",
    },
  ];

  const faculty: { title: string; href: string }[] = [
    {
      title: "Add User",
      href: "/user/manage/adduser",
    },
    {
      title: "Leave Requests",
      href: "/user/manage/manageleave",
    },
    {
      title: "Student List",
      href: "/user/manage/userlist",
    },
  ];
  const admin: { title: string; href: string }[] = [
    {
      title: "Add User",
      href: "/user/manage/adduser",
    },
    {
      title: "Leave Requests",
      href: "/user/manage/manageleave",
    },
    {
      title: "Student List",
      href: "/user/manage/userlist",
    },
    {
      title: "Faculty List",
      href: "/user/admin/facultylist",
    },
  ];
  const loginCommune: { title: string; href: string }[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
  ];
 

  const guest: { title: string; href: string }[] = [
    {
      title: "Sign In",
      href: "/login",
    },
    {
      title: "Sign Up",
      href: "/signUp",
    },
  ];

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
  return (
    <>
      {userRole !== "Guest" ? (
        <>
          <A links={{ linkDetails: loginCommune }} />
          <A links={{ linkDetails: components }} />
        </>
      ) : (
        <>
          <A links={{ linkDetails: guest }} />
        </>
      )}
    </>
  );
}

export default SideBarLi;
