"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { Product } from "@prisma/client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useDeleteSingleProductMutation } from "@/app/apis/_product_index.api";
import { toast } from "sonner";

const AdminSingleCard = ({
  brand,
  id,
  images,
  price,
  name,
  quantity,
}: Product) => {
  const [deleteSingleProduct] = useDeleteSingleProductMutation();
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    try {
      const res = await deleteSingleProduct(id);
      if (res.data.status === 200) {
        setOpen(false);
        toast.success(res.data.message);
      }
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" p-3 bg-gray-50/40 shadow-md rounded-md grid gap-3">
      <div className="w-[130px] h-[130px] relative mx-auto">
        <Image
          src={images[0]}
          alt=""
          fill
          className="object-cover rounded-full"
        />
      </div>
      <div className="grid gap-1">
        <span className="w-[65%] text-gray-600 capitalize">{name} </span>
        <span className="text-gray-600 capitalize">qty: {quantity} </span>
      </div>
      <div className="flex justify-between items-center">
        <Link href={`/admin/product/${id}`}>
          <CiEdit size={24} className="cursor-pointer text-gray-600" />
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Trash2
              onClick={() => setOpen(true)}
              size={24}
              className="cursor-pointer text-red-400"
            />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                product and remove its data from our servers.
              </SheetDescription>
              <Button
                onClick={handleDelete}
                className="text-white bg-red-600 hover:bg-red-700 capitalize text-lg cursor-pointer"
              >
                delete
              </Button>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default AdminSingleCard;
