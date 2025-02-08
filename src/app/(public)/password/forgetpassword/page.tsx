"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postApiCall } from "@/service/apiCall";
import useModelValidation from "@/Components/ui/form/formValidation";
import useInitialValues from "@/Components/ui/form/useInitialValues";
import FieldGroup from "@/Components/ui/form/useInputGroup";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  sendEmail,
  otpInput,
  resetPassword,
} from "@/Components/ui/form/fields";
import Loading from "@/Components/Loading";
import Loading2 from "@/Components/Loading2";
function ForgetPassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showEmail, setShowEmail] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const apiCall = async (url: string, method: string) => {
    try {
      if (method === "sendOtp") {
        const values = { email: formik?.values?.email };
      }
      if (method === "verifyOtp") {
        const values = {
          email: formik?.values?.email,
          otp: Number(formik?.values?.otp),
        };
      }
      if (method === "resetPassword") {
        const values = { password: formik?.values?.password };
      }

      setLoading(true);
      const result = await postApiCall(url, values);

      if (result?.status == 201) {
        setShowEmail(false);
        setShowOtp(true);
        toast.success(result.data.message);
      }
      if (result?.status == 200) {
        setShowEmail(false);
        if (method === "verifyOtp") {
          setShowOtp(false);
          setShowPassword(true);
          localStorage.setItem("jwt", result.data.token);
          toast.success(result.data.message);
        }
        if (method === "resetPassword") {
          toast.success(result.data.message);
          router.push("/login");
        }
      }
      if (result?.message) {
        router.push("/password/forgetpassword");
        toast.error(result.message);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: useInitialValues("forget_password"),
    validationSchema: useModelValidation("forget_password"),
    onSubmit: async (values) => {
      try {
      } catch (error: any) {
        toast.error("Reset  Failed");
      } finally {
        setLoading(false);
      }
    },
  });
  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    formik;
  const sendEmailInputs = sendEmail;
  const resetPasswordInputs = resetPassword;
  const otpInputs = otpInput;
  return (
    <div className="p-8  bg-gray-100 min-h-screen flex items-center justify-center ">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
        <div className="text-3xl font-bold underline text-center mb-6">
          Forget Password
        </div>
        <form onSubmit={formik.handleSubmit}>
          {showEmail && (
            <>
              <FieldGroup
                fields={sendEmailInputs}
                formik={formik}
                options={""}
              />
              {formik?.values.email && (
                <>
                  <div className="flex items-center justify-center mt-5">
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => {
                        apiCall("/auth/forgetPassword", "sendOtp");
                      }}
                    >
                      Send Otp
                    </button>
                  </div>
                </>
              )}
            </>
          )}
          {showOtp && (
            <>
              <div className="justify-center flex">
                <InputOTP
                  maxLength={4}
                  value={otp}
                  onChange={(otp) => {
                    formik.setValues((v: any) => {
                      return { ...v, otp };
                    });
                  }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
                <div className="text-center text-sm">
                  {otp === "" && <>Enter your one-time password.</>}
                </div>
              </div>

              {formik?.values.otp && (
                <>
                  <div className="flex items-center justify-center mt-5">
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => {
                        apiCall("/auth/verifyOtp", "verifyOtp");
                      }}
                    >
                      Verify Otp
                    </button>
                  </div>
                </>
              )}
            </>
          )}
          {showPassword && (
            <>
              <FieldGroup
                fields={resetPasswordInputs}
                formik={formik}
                options={""}
              />
            </>
          )}

          {loading ? (
            <Loading2 />
          ) : (
            <>
              {showPassword && (
                <>
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => {
                        apiCall("/auth/resetPassword", "resetPassword");
                      }}
                    >
                      Reset Password
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
