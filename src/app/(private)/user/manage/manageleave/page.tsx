"use client";
import { getApiCall } from "@/service/apiCall";
import { useState, useEffect } from "react";
import { getColumns } from "./columns";
import { DataTable } from "@/Components/DataTable/data-table";
import Loading from "@/Components/Loading";
import { SortType, User } from "@/Utils/types";
import Pagination from "@/Components/DataTable/Pagination";
import Loading2 from "@/Components/Loading2";
export default function DemoPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [reloadData, setReloadData] = useState(false);
  const [query, setQuery] = useState("");
  const [getSorting, setGetSorting] = useState("");
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
        const url = `/leave?${searchQuery}&page=${currentPage}&sort=${sortParams.join(
          ","
        )}`;
        const result = await getApiCall(url);
        if (result?.data?.leaveStatus) {
          setData(result.data.leaveStatus);
          setMaxPage(result.data.maxPage);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchLeaveData();
  }, [currentPage, setReloadData]);
  return (
    <>
      {loading ? (
        <Loading2 />
      ) : (
        <>
          <div className="p-4">
            <div>Leave Requests</div>
            <DataTable
              columns={getColumns(setLoading)}
              data={data}
              setData={setData}
              currentPage={currentPage}
              setMaxPage={setMaxPage}
              setCurrentPage={setCurrentPage}
              setQuery={setQuery}
              query={query}
              setGetSorting={setGetSorting}
              getSorting={getSorting}
              urlType={"manageLeave"}
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
