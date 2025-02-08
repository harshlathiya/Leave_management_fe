"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useUserContext } from "@/app/context/userContext";
import FieldGroup from "@/Components/ui/form/useInputGroup";
import useInitialValues from "@/Components/ui/form/useInitialValues";
import useModelValidation from "@/Components/ui/form/formValidation";
import { getApiCall, putApiCall } from "@/service/apiCall";
import { updateProfile } from "@/Components/ui/form/fields";
import Loading from "@/Components/Loading";
import ModelTop from "@/Components/ui/model/model";
import InfoItem from "@/Components/profile";
function Profile() {
  const [loading, setLoading] = useState(false);
  const [viewModel, setViewModel] = useState(false);
  const [user, setUser] = useUserContext();
  const {
    name,
    grNumber,
    email,
    gender,
    image,
    phone,
    department,
    address,
    div,
  } = user;

  const fields = updateProfile;

  const formik = useFormik({
    initialValues: useInitialValues("update_profile"),
    validationSchema: useModelValidation("update_profile"),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const result = await putApiCall("/user/", values);
        if (result?.status == 200) {
          if (typeof values.image == "object") {
            const userData = await getApiCall("/user/");
            setUser(userData.data.profile);
          } else {
            setUser((v: any) => {
              return { ...v, ...values };
            });
          }
          setLoading(false);
          toast.success("Update successful");
          setViewModel(false);
          formik.resetForm();
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("SignUp failed");
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <>
      {!user ? (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <main className="profile-page ">
            <section className="relative block h-[500px] top-0">
              <div
                className="absolute top-0 w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
                }}
              >
                <span
                  id="blackOverlay"
                  className="w-full h-full absolute opacity-50 bg-black"
                ></span>
              </div>
              <div
                className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-[70px]"
                style={{ transform: "translateZ(0px)" }}
              >
                <svg
                  className="absolute bottom-0 overflow-hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="text-blueGray-200 fill-current"
                    points="2560 0 2560 100 0 100"
                  ></polygon>
                </svg>
              </div>
            </section>
            <section className="relative py-16 bg-gray-500">
              <div className="container mx-auto px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                  <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                        <div className="relative flex justify-center w-full">
                          <Image
                            src={user.image}
                            alt="User Avatar"
                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                            width={150}
                            height={150}
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                        <div className="py-6 px-3 mt-32 sm:mt-0">
                          <button
                            className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => {
                              formik.setValues(user);
                              setViewModel(true);
                            }}
                          >
                            Edit Profile
                          </button>
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4 lg:order-1">
                        <div className="flex justify-center py-4 lg:pt-4 pt-8"></div>
                      </div>
                    </div>
                    <div className="text-center mt-12">
                      <h3 className="text-4xl font-semibold leading-normal  text-blueGray-700 mb-2">
                        {user.name}
                      </h3>
                      <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                        <i className="mr-2 text-lg text-blueGray-400"></i>
                        {email}
                      </div>
                      <div className="text-center">
                        <table className="mx-auto w-80">
                          <tbody>
                            <InfoItem label="Div" value={div} />
                            <InfoItem label="GrNumber" value={grNumber} />
                            <InfoItem label="Address" value={address} />
                            <InfoItem label="Phone No" value={phone} />
                            <InfoItem label="Gender" value={gender} />
                            <InfoItem label="Department" value={department} />
                            <InfoItem label="Role" value={user?.user} />
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center"></div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      )}
      {viewModel && (
        <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full  backdrop-blur-sm">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <ModelTop
                setViewModel={setViewModel}
                formik={formik}
                ModelName={`Edit Profile`}
              />
              <div className=" bg-gray-100  flex items-center justify-center ">
                <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8  w-full">
                  <form onSubmit={formik.handleSubmit}>
                    <FieldGroup fields={fields} formik={formik} options={""} />
                    <div className="flex justify-start mb-3">
                      <Image
                        src={image}
                        alt="User Avatar"
                        className="rounded "
                        width={50}
                        height={50}
                      />
                    </div>
                    {loading ? (
                      <Loading />
                    ) : (
                      <div className="flex items-center justify-between">
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Update Profile
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
