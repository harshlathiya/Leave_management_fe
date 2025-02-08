"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useUserContext } from "../context/userContext";
import NavBar from "@/Components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import fetchUser from "@/service/getUserDetails";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user] = useUserContext();
  const router = useRouter();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if(token) {
      router.push('/dashboard');
    }
    else{
      if(user == 'guest'){
        router.push('/logout');
      }
    }
  }, [router,user]);
 
  return (
    <>
      {user ? (
        <>
          <div className="top-nav-spacer"></div>
          <NavBar />
          <div className="side-bar-spacer sm:ms-60"><div className="sm:ms-4">{children}</div></div>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
    </>
  );
}
