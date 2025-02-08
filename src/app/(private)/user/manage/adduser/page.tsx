"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import useModelValidation from "@/Components/ui/form/formValidation";
import useInitialValues from "@/Components/ui/form/useInitialValues";
import { postApiCallWithImage } from "@/service/apiCall";
import { toast } from "react-toastify";
import FieldGroup from "@/Components/ui/form/useInputGroup";
import { addUser } from "@/Components/ui/form/fields";
import { useUserContext } from "@/app/context/userContext";
import Loading2 from "@/Components/Loading2";
const SignUp = () => {
  const [user] = useUserContext();
  const [signUpLoading, setSignUpLoading] = useState(false);
  const formik = useFormik({
    initialValues: useInitialValues("add_User"),
    validationSchema: useModelValidation("add_User"),
    onSubmit: async (values) => {
      try {
        setSignUpLoading(true);
        const result = await postApiCallWithImage("/user/addUser", values);
        if (result?.status == 201) {
          setSignUpLoading(false);
          toast.success("Add User successful");
          formik.resetForm();
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Add User failed");
      } finally {
        setSignUpLoading(false);
      }
    },
  });
  const fields = addUser;
  let options = {
    role: [{ label: "Student", value: "4" }],
  };
  if (user?.user == "admin") {
    options = {
      role: [
        { label: "Student", value: "4" },
        { label: "Faculty", value: "3" },
      ],
    };
  }
  return (
    <div className="p-8  bg-gray-100 min-h-screen flex items-center justify-center ">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
        <div className="text-3xl font-bold underline text-center mb-6">
          Add User
        </div>
        <form onSubmit={formik.handleSubmit}>
          <FieldGroup fields={fields} formik={formik} options={options} />

          {signUpLoading ? (
            <Loading2 />
          ) : (
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add User
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
