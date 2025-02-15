"use client";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { User } from "@/Utils/types";

export const getColumns = (
  setViewModel: (value: boolean) => void,
  setEditUserData: (userData: any) => void,
  formik: any
) => [
  {
    accessorKey: "userId",
    header: "userId",
  },
  {
    accessorKey: "user.name",
    header: "User Name",
  },
  {
    accessorKey: "user.email",
    header: "User Email",
  },
  {
    accessorKey: "usedLeave",
    header: "Used Leave",
  },
  {
    accessorKey: "availableLeave",
    header: "Available Leave",
  },
  {
    accessorKey: "totalLeave",
    header: "Total Leave",
  },
  {
    accessorKey: "totalWorkingDays",
    header: "Total WorkingDays",
  },
  {
    accessorKey: "attendancePercentage",
    header: "Attendance Percentage",
  },
  {
    accessorKey: "academicYear",
    header: "Academic Year",
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }: { row: { original: User } }) => {
      const userData = row.original;
      console.log(userData);
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <>
                <DropdownMenuItem
                  onClick={async () => {
                    setEditUserData(userData);
                    formik.setValues(userData);
                    setViewModel(true);
                  }}
                >
                  Edit
                </DropdownMenuItem>
              </>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
