import { useRouter } from "next/navigation";
import apiClient from "./apiClient"; // Adjust the import path as needed
import { toast } from "react-toastify";

export const HandleLogout = async () => {
  toast.success("Login Again");
  location.href = "/logout";
};

export const getApiCall = async (url: string) => {
  try {
    const res: any = await apiClient.get(url);
    return res;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      await HandleLogout();
    }
    console.log(error);
    return error?.response?.data;
  }
};
export const deleteApiCall = async (url: string) => {
  try {
    const res: any = await apiClient.delete(url);
    return res;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      await HandleLogout();
    }
    console.log(error);
    return error?.response?.data;
  }
};
export const postApiCallWithImage = async (url: string, data: any) => {
  try {
    const res: any = await apiClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error: any) {
    console.error(error);
    if (error?.response?.status === 401) {
      await HandleLogout();
    }
    return error?.response?.data;
  }
};

export const postApiCall = async (url: string, data: any) => {
  try {
    const res: any = await apiClient.post(url, data);
    return res;
  } catch (error: any) {
    console.error(error);
    if (error?.response?.status === 401) {
      await HandleLogout();
    }
    return error?.response?.data;
  }
};

export const putApiCall = async (url: string, data: any) => {
  try {
    const res: any = await apiClient.put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error: any) {
    console.error(error);
    if (error?.response?.status === 401) {
      await HandleLogout();
    }
    return error?.response?.data;
  }
};
