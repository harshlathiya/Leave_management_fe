"use client";
import React, { useState, useEffect } from "react";
import { getApiCall, putApiCall, putApiCallBasic } from "@/service/apiCall";
import { getColumns } from "./columns";
import { LeaveDetails } from "@/Utils/types";
import { DataTable } from "../../../dashboard/data-table";
import Loading from "@/Components/Loading";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useFormik } from "formik";
import useInitialValues from "@/Components/ui/form/useInitialValues";
import useModelValidation from "@/Components/ui/form/formValidation";
import { toast } from "react-toastify";
import { LeaveBalanceState } from "@/lib/redux/reducers/leaveBalance";
import ModelTop from "@/Components/ui/model/model";
import FieldGroup from "@/Components/ui/form/useInputGroup";
import { editBalance } from "@/Components/ui/form/fields";
import Loading2 from "@/Components/Loading2";

function AdminComponent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<LeaveDetails[]>([]);
  const [pdfData, setPdfData] = useState<LeaveDetails[]>([]);
  const [viewModel, setViewModel] = useState(false);
  const [editUserData, setEditUserData] = useState<LeaveDetails | null>(null);

  const formik = useFormik({
    initialValues: useInitialValues("balance"),
    validationSchema: useModelValidation("balance"),
    onSubmit: async (values) => {
      try {
        if (editUserData) {
          setLoading(true);
          const remainingDays = values.totalWorkingDays - values.usedLeave;
          const attendancePercentage = (
            (remainingDays * 100) /
            values.totalWorkingDays
          ).toFixed(2);
          const data = {
            totalLeave: values.totalLeave,
            availableLeave: values.availableLeave,
            usedLeave: values.usedLeave,
            totalWorkingDays: values.totalWorkingDays,
            academicYear: values.academicYear,
            attendancePercentage: attendancePercentage,
          };
          const result = await putApiCallBasic(
            `/leave/editBalance/${editUserData?.id as any}`,
            data
          );
          if (result?.status == 200) {
            setLoading(false);
            toast.success("Update successful");
            await fetchLeaveData();
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

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const fetchLeaveData = async () => {
    setLoading(true);
    try {
      const result = await getApiCall("/leave/leaveReport");
      if (result?.data?.leaveReport) {
        setData(result?.data?.leaveReport);
        setPdfData(result?.data?.reportHtml);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching leave data:", error);
      setLoading(false);
    }
  };

  const generatePDF = async () => {
    const doc: any = new jsPDF();

    const headers = [
      [
        "User ID",
        "Name",
        "Email",
        "Total Leave",
        "Available Leave",
        "Used Leave",
        "Total Working Days",
        "Attendance Percentage",
      ],
    ];
    const rows = data.map((report) => [
      report.userId,
      report.user.name,
      report.user.email,
      report.totalLeave,
      report.availableLeave,
      report.usedLeave,
      report.totalWorkingDays,
      report.attendancePercentage,
    ]);

    doc.autoTable({
      head: headers,
      body: rows,
    });

    doc.save("leaveReport.pdf");
  };

  const fields = editBalance;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Leave Balance
            </h1>
            <div id="leave-report">
              <DataTable
                columns={getColumns(setViewModel, setEditUserData, formik)}
                data={data as any}
              />
            </div>
            {viewModel && (
              <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm">
                <div className="relative p-4 w-full max-w-md max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <ModelTop
                      setViewModel={setViewModel}
                      formik={formik}
                      ModelName={`Edit Leave balance ${editUserData?.userId} : ${editUserData?.user.name}`}
                    />
                    <div className=" bg-gray-100  flex items-center justify-center ">
                      <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8  w-full">
                        <form onSubmit={formik.handleSubmit}>
                          <FieldGroup
                            fields={fields}
                            formik={formik}
                            options={""}
                          />
                          <div className="flex justify-start mb-3"></div>
                          {loading ? (
                            <Loading2 />
                          ) : (
                            <div className="flex items-center justify-between">
                              <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              >
                                Update Balance
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
          </div>
        </>
      )}
    </>
  );
}

export default AdminComponent;
