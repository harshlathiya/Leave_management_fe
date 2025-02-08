"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getApiCall, postApiCall } from "@/service/apiCall";
import { useUserContext } from "@/app/context/userContext";
import Link from "next/link";
import useModelValidation from "@/Components/ui/form/formValidation";
import useInitialValues from "@/Components/ui/form/useInitialValues";
import FieldGroup from "@/Components/ui/form/useInputGroup";
import { login } from "@/Components/ui/form/fields";
import Loading2 from "@/Components/Loading2";
function Login() {
  const [user, setUser] = useUserContext();
  const [signUpLoading, setSignUpLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: useInitialValues("login"),
    validationSchema: useModelValidation("login"),
    onSubmit: async (values) => {
      try {
        setSignUpLoading(true);
        const result = await postApiCall("/auth/", values);
        if (result?.data?.token) {
          localStorage.setItem("jwt", result.data.token);
        }
        if (result?.status == 200) {
          const findUser: any = await getApiCall("/user/");
          if (findUser?.data?.profile) {
            const loginUser = findUser?.data?.profile;
            setUser(loginUser);
            setSignUpLoading(false);
            formik.resetForm();
            router.push("/dashboard");
            toast.success("Login successful");
          } else {
            toast.error("Try again");
            return false;
          }
        } else {
          toast.error(result.message);
        }
      } catch (error: any) {
        console.error(
          "Login error:",
          error.response ? error.response.data : error.message
        );
        toast.error("Login Failed");
      } finally {
        setSignUpLoading(false);
      }
    },
  });
  const { handleSubmit } = formik;
  const fields = login;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="text-3xl text-black font-bold underline text-center mb-6">
          Login
        </div>
        <FieldGroup fields={fields} formik={formik} options={""} />
        <Link
          href="/password/forgetpassword"
          className="text-sm text-blue-700 "
        >
          Forget Password?
        </Link>
        {signUpLoading ? (
          <Loading2 />
        ) : (
          <div className="flex items-center justify-between mb-3">
            <button
              type="submit"
              className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Log In
            </button>
          </div>
        )}
        <Link href="/signUp" className="text-sm mt-10 text-blue-700 ">
          Have not an account ?
        </Link>
      </form>
    </div>
  );
}

export default Login;
