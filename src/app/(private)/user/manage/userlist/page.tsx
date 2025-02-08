"use client";
import { deleteApiCall, getApiCall } from "@/service/apiCall";
import { getColumns } from "./columns"; // Import the function
import { DataTable } from "@/Components/DataTable/data-table";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import Image from "next/image";
import FieldGroup from "@/Components/ui/form/useInputGroup";
import useInitialValues from "@/Components/ui/form/useInitialValues";
import useModelValidation from "@/Components/ui/form/formValidation";
import { putApiCall } from "@/service/apiCall";
import { editUser } from "@/Components/ui/form/fields";
import { toast } from "react-toastify";
import Loading from "@/Components/Loading";
import { useUserContext } from "@/app/context/userContext";
import { SortType, User } from "@/Utils/types";
import Loading2 from "@/Components/Loading2";
import ModelTop from "@/Components/ui/model/model";
import Pagination from "@/Components/DataTable/Pagination";
export default function DemoPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [reloadData, setReloadData] = useState(false);
  const [query, setQuery] = useState("");
  const [getSorting, setGetSorting] = useState("");
  const [editUserData, setEditUserData] = useState<User | null>(null);
  const [viewModel, setViewModel] = useState(false);
  const [user] = useUserContext();

  const deleteUser = async (url: string) => {
    try {
      const results = await deleteApiCall(url);
      if (results?.status == 200) {
        toast.success("Deleted");
        const url = `/user/studentList?&page=${currentPage}`;
        const result = await getApiCall(url);
        if (result?.data?.userList) {
          setData(result.data.userList);
          setMaxPage(result.data.maxPage);
          setLoading(false);
        }
      } else {
        toast.error(results.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  useEffect(() => {
    const fetchLeaveData = async () => {
      setLoading(true);
      try {
        const searchQuery: string = `search=${encodeURIComponent(query)}`;
        const sorting: any = getSorting;
        const sortParams: string[] = sorting.map(
          (sort: SortType) =>
            `${sort.id.replace("_", ".")}:${sort.desc ? "desc" : "asc"}`
        );
        const url = `/user/studentList?${searchQuery}&page=${currentPage}&sort=${sortParams.join(",")}`;
        const result = await getApiCall(url);
        if (result?.data?.userList) {
          setData(result.data.userList);
          setMaxPage(result.data.maxPage);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching leave data:", error);
        setLoading(false);
      }
    };
    fetchLeaveData();
  }, [currentPage, reloadData]);

  const formik = useFormik({
    initialValues: useInitialValues("editUser"),
    validationSchema: useModelValidation("editUser"),
    onSubmit: async (values) => {
      try {
        if (editUserData) {
          setLoading(true);
          const result = await putApiCall(
            `/user/${editUserData?.id}`,
            values
          );
          if (result?.status == 200) {
            setLoading(false);
            toast.success("Update successful");
            setViewModel(false);
            formik.resetForm();
          } else {
            toast.error(result.message);
          }
        }
      } catch (error) {
        toast.error("SignUp failed");
      } finally {
        setLoading(false);
      }
    },
  });
  const fields = editUser;

  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    formik;
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="p-4">
            <DataTable
              columns={getColumns(setViewModel, setEditUserData, formik)}
              data={data}
              setData={setData}
              currentPage={currentPage}
              setMaxPage={setMaxPage}
              setCurrentPage={setCurrentPage}
              setQuery={setQuery}
              query={query}
              setGetSorting={setGetSorting}
              getSorting={getSorting}
              urlType={"studentList"}
            />
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              maxPage={maxPage}
            />
          </div>

          {viewModel && (
            <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm">
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <ModelTop
                    setViewModel={setViewModel}
                    formik={formik}
                    ModelName={`Edit Student ${editUserData?.id} : ${editUserData?.name}`}
                  />
                  <div className=" bg-gray-100  flex items-center justify-center ">
                    <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8  w-full">
                      <form onSubmit={formik.handleSubmit}>
                        <FieldGroup
                          fields={fields}
                          formik={formik}
                          options={""}
                        />
                        Current Image
                        <div className="flex justify-start mb-3">
                          {editUserData && (
                            <Image
                              src={editUserData.image}
                              alt="User Avatar"
                              className="rounded "
                              width={400}
                              height={200}
                            />
                          )}
                        </div>
                        {loading ? (
                          <Loading2 />
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
                        {user?.user == "admin" ? (
                          <>
                            <button
                              type="button"
                              className="mt-7 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              onClick={() => {
                                let sure = confirm(
                                  "Are you sure you want to Delete User?"
                                );
                                if (sure) {
                                  deleteUser(
                                    `/user/${editUserData?.id}`
                                  );
                                  setViewModel(false);
                                }
                              }}
                            >
                              Delete User
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
