import React, { useState, useEffect } from "react";
import MonthCalendar from "./MonthCalendar";
import { prepareLeaveData } from "./utils";
import { getApiCall } from "@/service/apiCall";
import Loading from "@/Components/Loading";
import { useUserContext } from "@/app/context/userContext";

function StudentFacultyComponent() {
  const [leaveData, setLeaveData] = useState({});
  const [currentYear, setCurrentYear] = useState(2024);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); 
  const [loading, setLoading] = useState(true);
  const [user] = useUserContext();
  
  useEffect(() => {
    const fetchLeaveData = async (year: number, month: number) => {
      setLoading(true);
      try {
        let url = `/leave/userLeaveStatus?year=${year}&month=${month}&limit=200`;
        if (user.user == "faculty" || user.user == "admin") {
          url = `/leave/?year=${year}&month=${month}&limit=200`;
        }
        const response = await getApiCall(url);
        if (response.data.leaveStatus) {
          const processedLeaveData = prepareLeaveData(
            response.data.leaveStatus
          );
          setLeaveData(processedLeaveData);
        } else {
          console.error("Failed to fetch leave data", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching leave data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveData(currentYear, currentMonth);
  }, [currentYear, currentMonth, user?.user]);

  const handlePrevMonth = () => {
    const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleNextMonth = () => {
    const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleYearChange = (year: number) => {
    setCurrentYear(year);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="App mt-20">
            <MonthCalendar
              year={currentYear}
              month={currentMonth}
              leaveData={leaveData}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onYearChange={handleYearChange}
            />
          </div>
        </>
      )}
    </>
  );
}

export default StudentFacultyComponent;
