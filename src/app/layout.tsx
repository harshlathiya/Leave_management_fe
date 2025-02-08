"use client";
import { Inter } from "next/font/google";

import {
  ModelContext,
  UserContextProvider,
  useUserContext,
} from "@/app/context/userContext";
import { useCallback, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import fetchUser from "@/service/getUserDetails";
import NavBar from "@/Components/Navbar";
import { StoreProvider } from "../../StoreProvider";
const inter = Inter({ subsets: ["latin"] });
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import TopNavBar from "@/Components/TopNav";
config.autoAddCss = false;

const UserFetcher = () => {
  const [, setUser] = useUserContext();

  const fetchUserAndUpdate = useCallback(async () => {
    try {
      const result = await fetchUser();
      setUser(result);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [setUser]);

  useEffect(() => {
    fetchUserAndUpdate();
  }, [fetchUserAndUpdate]);

  return null;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserContextProvider>
        <StoreProvider>
          <html lang="en">
            <body className={inter.className}>
              <UserFetcher />

              <div className="">{children}</div>

              <ToastContainer />
            </body>
          </html>
        </StoreProvider>
      </UserContextProvider>
    </>
  );
}
