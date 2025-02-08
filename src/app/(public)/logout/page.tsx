"use client";
import { useUserContext } from "@/app/context/userContext";
import { getApiCall } from "@/service/apiCall";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Logout = () => {
  const router = useRouter();
  const [, setUser] = useUserContext();
  useEffect(() => {
    const logout = async () => {
      try {
        const result = await getApiCall("/auth");
        if (result?.status === 200) {
          setUser(null);
          localStorage.removeItem("jwt");
          toast.success("Logout successful");
          router.push("/login");
        } else {
          toast.error("Try again");
        }
      } catch (error) {
        toast.error("Try again");
      }
    };

    logout();
  }, [router, setUser]);

  return <></>;
};

export default Logout;
