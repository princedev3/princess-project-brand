"use client";
import {
  useDeleteAUserMutation,
  useUpdateAUserMutation,
} from "@/app/apis/_user_index.api";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Copy, MoreHorizontal, Trash2, UserRound } from "lucide-react";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "sonner";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: () => <div className="">Email</div>,
    cell: ({ row }) => {
      const email = row.getValue("email");
      return <div className="">{email as string}</div>;
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="hidden md:block">Name</div>,
    cell: ({ row }) => {
      const name = row.getValue("name");
      return <div className="hidden md:block">{name as string}</div>;
    },
  },
  {
    accessorKey: "role",
    header: () => <div className="hidden md:block">Role</div>,
    cell: ({ row }) => {
      const role = row.getValue("role");
      return <div className="hidden md:block">{role as string}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const [deleteAUser] = useDeleteAUserMutation();
      const [updateAUser] = useUpdateAUserMutation();
      const handleDelete = async () => {
        const res = await deleteAUser(user.id);
        if (res?.data?.status === 200) {
          toast.success("user deleted");
        }
      };
      const handleUpdate = async (item: "ADMIN" | "USER") => {
        const res = await updateAUser({ id: user?.id, role: item });
        if (res?.data.status === 200) {
          toast.success("user updated");
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(user.id);
                toast.success("id copied");
              }}
            >
              <Copy /> <span className="">copy</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleUpdate("ADMIN")}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-1">
                <UserRound size={20} />
                <span className="">Admin</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleUpdate("USER")}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-1">
                <UserRound size={20} />
                <span className="">User</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleDelete}>
              <Trash2 className="text-gray-700" />{" "}
              <span className="">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
