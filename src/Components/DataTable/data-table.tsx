"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import { useEffect, useState } from "react";
import Loading from "@/Components/Loading";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getApiCall } from "@/service/apiCall"; // Make sure this is correctly imported
import { DataTableProps, SortType } from "@/Utils/types";

export function DataTable<T>({
  columns,
  data,
  setData,
  currentPage,
  setMaxPage,
  setCurrentPage,
  setQuery,
  query,
  setGetSorting,
  getSorting,
  urlType,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state

  const fetchFilteredData = async (query: string, sorting: any) => {
    setLoading(true);
    try {
      if (urlType == "studentList") {
        const sortParams = sorting.map(
          (sort: SortType) =>
            `${sort.id.replace("_", ".")}:${sort.desc ? "desc" : "asc"}`
        );

        const result = await getApiCall(
          `/user/studentList?search=${query}&page=${currentPage}&sort=${sortParams.join(
            ","
          )}`
        );

        if (result?.data?.userList) {
          setData(result.data.userList); // Update the data with the result from API call
          setMaxPage(result.data.maxPage);
        }
      }
      if (urlType == "manageLeave") {
        const sortParams = sorting.map(
          (sort: SortType) =>
            `${sort.id.replace("_", ".")}:${sort.desc ? "desc" : "asc"}`
        );
        const result = await getApiCall(
          `/leave?search=${query}&page=${currentPage}&sort=${sortParams.join(
            ","
          )}`
        );
        if (result?.data?.leaveStatus) {
          setData(result.data.leaveStatus);
          setMaxPage(result.data.maxPage);
        }
      }
      if (urlType == "leaveStatus") {
        const sortParams = sorting.map(
          (sort: SortType) =>
            `${sort.id.replace("_", ".")}:${sort.desc ? "desc" : "asc"}`
        );
        const result = await getApiCall(
          `/leave/userLeaveStatus?search=${query}&page=${currentPage}&sort=${sortParams.join(
            ","
          )}`
        );

        if (result?.data?.leaveStatus) {
          setData(result.data.leaveStatus);
          setMaxPage(result.data.maxPage);
        }
      }
      if (urlType == "facultyList") {
        const sortParams = sorting.map(
          (sort: SortType) =>
            `${sort.id.replace("_", ".")}:${sort.desc ? "desc" : "asc"}`
        );
        const result = await getApiCall(
          `/user/facultyList?search=${query}&page=${currentPage}&sort=${sortParams.join(
            ","
          )}`
        );

        if (result?.data?.userList) {
          setData(result.data.userList); // Update the data with the result from API call
          setMaxPage(result.data.maxPage);
        }
      }
    } catch (error) {
      console.log("Error fetching filtered data:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchData = (query: string) => {
    fetchFilteredData(query, sorting);
    setQuery(query);
    setGetSorting(sorting);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  useEffect(() => {
    fetchFilteredData(query, sorting);
  }, [currentPage, sorting, urlType]);
  return (
    <div className="max-w-fit">
      <div className=" items-center py-4 flex">
        <Input
          placeholder="Filter Name..."
          onChange={(event) => debouncedFetchData(event.target.value)}
          className="max-w-sm mb-2"
          value={query}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns().map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="rounded-md border overflow-scroll">
          <table className=" divide-y divide-gray-200" style={{ width: 200 }}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      const data = flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      );
                      console.log(data);
                      return (
                        <td
                          key={cell.id}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                        >
                          {data || "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-4 text-center text-sm font-medium text-gray-500"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
