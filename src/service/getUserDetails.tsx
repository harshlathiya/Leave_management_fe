"use client"
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

const fetchUser = async () => {
  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return "guest";
    }
    let url = "/user/";

    const userProfile = await axios.get(`${baseUrl + url}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (userProfile?.data?.profile) {
      return userProfile?.data?.profile;
    } else {
      return "guest";
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default fetchUser;
