"use client";
import React, { useState } from "react";
import { useFormik } from "formik";

import useModelValidation from "@/Components/ui/form/formValidation";
import useInitialValues from "@/Components/ui/form/useInitialValues";
import { postApiCallWithImage } from "@/service/apiCall";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FieldGroup from "@/Components/ui/form/useInputGroup";
import { signUp } from "@/Components/ui/form/fields";
import Loading2 from "@/Components/Loading2";
import Link from "next/link";
const SignUp = () => {
  const router = useRouter();
  const [signUpLoading, setSignUpLoading] = useState(false);
  const formik = useFormik({
    initialValues: useInitialValues("add_student"),
    validationSchema: useModelValidation("add_student"),
    onSubmit: async (values) => {
      try {
        setSignUpLoading(true);
        const result = await postApiCallWithImage("/user/", values);
        if (result?.status == 201) {
          setSignUpLoading(false);
          toast.success("SignUp successful");
          formik.resetForm();
          router.push("/login");
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("SignUp failed");
      } finally {
        setSignUpLoading(false);
      }
    },
  });
  const fields = signUp;
  return (
    <div className="p-8  bg-gray-100 min-h-screen flex items-center justify-center ">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
        <div className="text-3xl font-bold underline text-center mb-6">
          SignUp Page
        </div>
        <form onSubmit={formik.handleSubmit}>
          <FieldGroup fields={fields} formik={formik} options={""} />

          {signUpLoading ? (
            <Loading2 />
          ) : (
            <div className="flex items-center justify-between mb-5">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </button>
              <Link href="/login" className="text-sm mt-10 text-blue-700 ">
                 Already have an Account Login ?
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
