"use client";
import { getApiCall } from "@/service/apiCall";
import { getColumns } from "./columns"; // Import the function
import React from "react";
import { DataTable } from "@/Components/DataTable/data-table";
import { useState, useEffect } from "react";
import Loading from "@/Components/Loading";
import { SortType, User } from "@/Utils/types";
import Pagination from "@/Components/DataTable/Pagination";
import { useUserContext } from "@/app/context/userContext";
export default function DemoPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [reloadData, setReloadData] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [query, setQuery] = useState("");
  const [getSorting, setGetSorting] = useState("");
  const [user] = useUserContext();
  const role: any = user?.user;

  const fetchLeaveData = async () => {
    setLoading(true);
    try {
      const searchQuery: string = `search=${encodeURIComponent(query)}`;
      const sorting: any = getSorting;
      const sortParams: string[] =
        sorting.length > 0 &&
        sorting?.map(
          (sort: SortType) =>
            `${sort.id.replace("_", ".")}:${sort.desc ? "desc" : "asc"}`
        );
      const url = `/leave/userLeaveStatus?${searchQuery}&page=${currentPage}&sort=${
        !sortParams ? "" : sortParams?.join(",")
      }`;
      const result = await getApiCall(url);
      if (result?.data?.leaveStatus) {
        setData(result.data.leaveStatus);
        setMaxPage(result.data.maxPage);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching leave data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveData();
  }, [currentPage, reloadData, setReloadData, refresh]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="p-4">
            <DataTable
              columns={getColumns(setReloadData, role, setRefresh)}
              data={data}
              setData={setData}
              currentPage={currentPage}
              setMaxPage={setMaxPage}
              setCurrentPage={setCurrentPage}
              setQuery={setQuery}
              query={query}
              setGetSorting={setGetSorting}
              getSorting={getSorting}
              urlType={"leaveStatus"}
            />
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              maxPage={maxPage}
            />
          </div>
        </>
      )}
    </>
  );
}
