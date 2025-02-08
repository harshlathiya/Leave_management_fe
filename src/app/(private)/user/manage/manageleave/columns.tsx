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
import { getApiCall } from "@/service/apiCall";
import { toast } from "react-toastify";
import { LeaveStatus } from "@/Utils/types";

export const getColumns = (setLoading:any) => [
  {
    accessorKey: "id",
    header: "Leave Id",
  },
  {
    accessorKey: "requestedBy.name",
    header: "Requested By name",
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
    accessorKey: "userLeave.usedLeave",
    header: "Used Leave",
  },
  {
    accessorKey: "userLeave.availableLeave",
    header: "Available Leave",
  },
  {
    accessorKey: "requestedTo.name",
    header: "Requested To name",
  },

  {
    header: "Action",
    id: "actions",
    cell: ({ row }: { row: { original: LeaveStatus } }) => {
      const leave = row.original;
      const updateLeaveData = async (url: string) => {
        try {
          toast.success("Processing...");
          setLoading(true)
          const result = await getApiCall(url);
          if (result?.status == 200) {
            toast.success(result.data.message);
            setLoading(false)
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
              {leave.status === "Pending" && (
                <>
                  <DropdownMenuItem
                    onClick={async () => {
                      await updateLeaveData(`/leave/leaveApproval/${leave.id}`);
                    }}
                  >
                    Approve
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => {
                      await updateLeaveData(`/leave/leaveReject/${leave.id}`);
                    }}
                  >
                    Reject
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
