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
  setEditUserData: (userData: User) => void,
  formik: any
) => [
  {
    accessorKey: "id",
    header: "User Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    accessorKey: "gender",
    header: "gender",
  },
  {
    header: "image",
    cell: ({ row }: { row: { original: User } }) => {
      const image = row.original.image;
      return (
        <>
          <Image
            src={image}
            alt="User Avatar"
            className="rounded "
            width={50}
            height={50}
          />
        </>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "phone",
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
    accessorKey: "address",
    header: "address",
    cell: ({ row }: any) => {
      const address = row.getValue("address");
      return (
        <div className="truncate" title={address}>
          {address}
        </div>
      );
    },
  },
  {
    accessorKey: "grNumber",
    header: "grNumber",
  },
  {
    accessorKey: "div",
    header: "div",
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }: { row: { original: User } }) => {
      const userData = row.original;
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
