import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getApiCall } from "@/service/apiCall";
import { toast } from "react-toastify";
import { LeaveStatus } from "@/Utils/types";

interface TableColumn {
  accessorKey?: string;
  header: string;
  id?: string;
  cell?: (props: { row: any }) => JSX.Element;
}
export const getColumns = (
  setReloadData: (value: any) => void
): TableColumn[] => [
  {
    accessorKey: "id",
    header: "Leave Id",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    accessorKey: "leaveType",
    header: "Leave Type",
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }: any) => {
      const reason = row.getValue("reason");
      return (
        <div className="truncate" title={reason}>
          {reason}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Create Date",
    cell: ({ row }: any) => {
      const timestamp = row.getValue("createdAt");
      const date = moment(timestamp);
      const formatted = date.format("YYYY-MM-DD");
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "requestedTo.name",
    header: "Requested To",
  },
  {
    accessorKey: "requestedTo.email",
    header: "Requested To Email",
  },

  {
    header: "Action",
    id: "actions",
    cell: ({ row }: { row: { original: LeaveStatus } }) => {
      const leave = row.original;
      const updateLeaveData = async (url: string) => {
        try {
          toast.success("Processing...");
          const result = await getApiCall(url);
          if (result?.status == 200) {
            toast.success(result.data.message);
            setReloadData((prev: boolean) => !prev);
          } else {
            toast.error(result.message);
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error("An error occurred. Please try again.");
        }
      };
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
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
