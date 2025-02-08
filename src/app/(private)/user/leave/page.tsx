"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { getApiCall, postApiCall } from "@/service/apiCall";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setLeaveBalance } from "@/lib/redux/actions/leaveBalance";
import FieldGroup from "@/Components/ui/form/useInputGroup";
import { applyLeave } from "@/Components/ui/form/fields";
import useInitialValues from "@/Components/ui/form/useInitialValues";
import useModelValidation from "@/Components/ui/form/formValidation";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Loading from "@/Components/Loading";
import { setUsers } from "@/lib/redux/actions/userActions";
import Loading2 from "@/Components/Loading2";
import ModelTop from "@/Components/ui/model/model";
import InfoCard from "@/Components/leave/Div";
function convertNegativeToZero(number: number) {
  if (number < 0) {
    return 0;
  } else {
    return number;
  }
}
const FecultyFetcher = () => {
  const dispatch = useAppDispatch();
  let url = "/user/userList?limit=100&roleType=3";

  useEffect(() => {
    const getApi = async (url: string) => {
      try {
        const result = await getApiCall(url);
        if (result?.data?.userList) {
          dispatch(setUsers(result?.data?.userList));
        }
      } catch (error) {
        console.error("Error fetching user Role:", error);
      }
    };

    getApi(url);
  }, [dispatch, url]);

  return null;
};

function Leave() {
  const [loading, setLoading] = useState(true);
  const [viewModel, setViewModel] = useState(false);
  const router = useRouter();
  const leaveData = useAppSelector((state) => state.leaveBalance);
  const facultyList = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const fields = applyLeave;
  useEffect(() => {
    const fetchLeaveData = async () => {
      setLoading(true);
      try {
        const result = await getApiCall("/leave/leaveBalance");
        if (result?.data?.leaveBalance) {
          dispatch(setLeaveBalance(result?.data?.leaveBalance));
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching leave data:", error);
        setLoading(false);
      }
    };

    fetchLeaveData();
  }, [dispatch]);

  const formik = useFormik({
    initialValues: useInitialValues("apply_leave"),
    validationSchema: useModelValidation("apply_leave"),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const result = await postApiCall("/leave/", values);
        if (result?.status == 201) {
          setLoading(false);
          toast.success("Apply leave successful");
          setViewModel(false);
          formik.resetForm();
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Apply leave failed");
      } finally {
        setLoading(false);
      }
    },
  });

  const options = {
    requestToId: [] as { label: string; value: string }[],
  };
  if (Array.isArray(facultyList?.userList)) {
    for (let i = 0; i < facultyList?.userList.length; i++) {
      options.requestToId.push({
        label: `${facultyList?.userList[i]?.name}`,
        value: `${facultyList?.userList[i]?.id}`,
      });
    }
  }
  const pieData = {
    labels: ["Attendance", "Used Leave"],
    datasets: [
      {
        data: [
          leaveData?.totalWorkingDays - leaveData?.usedLeave,
          leaveData?.usedLeave,
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };
  const pieData1 = {
    labels: ["Total Leave", "AvailableLeave Leave"],
    datasets: [
      {
        data: [
          leaveData?.totalLeave,
          convertNegativeToZero(leaveData?.availableLeave),
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };
  const remainingLeave = convertNegativeToZero(leaveData?.availableLeave);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-gray-100  items-center  p-3">
         <div className="text-center ">
              
              <div className="mt-6 flex">
                <InfoCard title="Total Leave" value={leaveData.totalLeave} />
                <InfoCard title="Available Leave" value={remainingLeave} />
                <InfoCard title="Used Leave" value={leaveData.usedLeave} />
                <InfoCard
                  title="Working Days"
                  value={leaveData.totalWorkingDays}
                />
                <InfoCard
                  title="Attendance Percentage"
                  value={`${leaveData.attendancePercentage}%`}
                />
                <InfoCard
                  title="Academic Year"
                  value={leaveData.academicYear}
                />
                
              </div>
              <div className="mb-9 flex justify-center space-x-4">
                  {/* <button
                    onClick={() => {
                      router.push("/user/leavestatus");
                    }}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                  >
                    Leave Status
                  </button> */}
                  <button
                    onClick={() => {
                      setViewModel(true);
                    }}
                    className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                  >
                    Apply Leave
                  </button>
                </div>
            </div>
          <div className="bg-white py-40 px-6 flex justify-evenly rounded-lg shadow-lg w-full  gap-8">
            
            
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Attendance
              </h2>
              <Pie data={pieData} className="max-w-xs" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Available Leave
              </h2>
              <Pie data={pieData1} className="max-w-xs" />
            </div>
            {viewModel && (
              <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm">
                <FecultyFetcher />
                <div className="relative p-4 w-full max-w-md max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <ModelTop
                      setViewModel={setViewModel}
                      formik={formik}
                      ModelName={`Apply Leave`}
                    />
                    <div className="bg-gray-100 flex items-center justify-center">
                      <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 w-full">
                        <form onSubmit={formik.handleSubmit}>
                          <FieldGroup
                            fields={fields}
                            formik={formik}
                            options={options}
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
                                Apply Leave
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
        </div>
      )}
    </>
  );
}

export default Leave;
