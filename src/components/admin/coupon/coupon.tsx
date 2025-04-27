"use client";
import React, { useState } from "react";
import CreateCoupons from "./create-coupons";
import { Trash2 } from "lucide-react";
import {
  useDeleteCouponMutation,
  useGetCouponQuery,
} from "@/app/apis/_coupon_index_api";
import LoadingPage from "@/components/navbar/loading";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Coupon = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCouponQuery(null);
  const [deleteCoupon] = useDeleteCouponMutation();
  if (isLoading) {
    return <LoadingPage />;
  }

  const handleDeleteCoupon = async (id: string) => {
    try {
      const res = await deleteCoupon(id);
      if (res.data.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid gap-y-4">
      <CreateCoupons />
      <div className="grid gap-y-6 ">
        {isLoading ? (
          <span className="text-gray-700 ">Loading...</span>
        ) : (
          data &&
          data?.existingCoupon && (
            <div className="">
              <table className="w-full border-collapse border border-gray-300 table-fixed">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border  hidden lg:table-cell  border-gray-300 px-4 py-2  text-center capitalize">
                      Code
                    </th>
                    <th className="border hidden lg:table-cell border-gray-300 px-4 py-2  text-center capitalize">
                      Duration
                    </th>
                    <th className="border  border-gray-300 px-4 py-2  text-center capitalize">
                      expires
                    </th>
                    <th className="border border-gray-300 px-4 py-2  text-center capitalize">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-100 group">
                    <td className="border hidden lg:table-cell border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                      {data && (data.existingCoupon.code as string)}
                    </td>
                    <td className="border hidden lg:table-cell border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                      {data && (data.existingCoupon.duration as string)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                      {data &&
                      data.existingCoupon.expiryDate &&
                      new Date() > new Date(data.existingCoupon.expiryDate)
                        ? "Coupon has expired"
                        : "Coupon is still valid"}
                    </td>
                    <td className="border border-gray-300 px-4 whitespace-nowrap flex items-center justify-center text-center py-2 relative">
                      <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild className="cursor-pointer">
                          <Trash2
                            size={24}
                            className="cursor-pointer text-red-400"
                          />
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Are you absolutely sure?</SheetTitle>
                            <SheetDescription>
                              This action cannot be undone. This will
                              permanently delete your product and remove its
                              data from our servers.
                            </SheetDescription>
                            <Button
                              onClick={async () => {
                                await handleDeleteCoupon(
                                  data?.existingCoupon?.id
                                );
                                setOpen(false);
                              }}
                              className="text-white bg-red-600 hover:bg-red-700 capitalize text-lg cursor-pointer"
                            >
                              delete
                            </Button>
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Coupon;
