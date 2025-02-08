"use client";
import { ColumnDef } from "@tanstack/react-table";
import { LeaveDetails } from "@/Utils/types";

export const columns: ColumnDef<LeaveDetails>[] = [
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
];
