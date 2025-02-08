"use client";
import React, { useState, useEffect } from "react";
import { getApiCall } from "@/service/apiCall";
import { columns } from "./columns";
import { LeaveDetails } from "@/Utils/types";
import { DataTable } from "./data-table";
import LeaveChart from "./LeaveChart";
import Loading from "@/Components/Loading";
import StudentFacultyComponent from "./StudentFacultyDashboard";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function AdminComponent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<LeaveDetails[]>([]);
  const [pdfData, setPdfData] = useState<LeaveDetails[]>([]);

  useEffect(() => {
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

    fetchLeaveData();
  }, []);

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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <StudentFacultyComponent />
          <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Leave Report
            </h1>
            <div id="leave-report">
              <DataTable columns={columns} data={data} />
              <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                  Leave Report
                </h1>
                <div className="flex justify-center">
                  <LeaveChart leaveData={data} />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={generatePDF}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Download PDF
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AdminComponent;
