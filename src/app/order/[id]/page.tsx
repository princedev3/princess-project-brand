"use client";
import { useFetchSingleOrderQuery } from "@/app/apis/_order_index.api";
import LoadingPage from "@/components/navbar/loading";
import { ProductOrder } from "@/static-data/types";
import { Product } from "@prisma/client";
import {
  HouseIcon,
  MessageCircleWarning,
  PackageCheckIcon,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const SngleOrderPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchSingleOrderQuery(id as string);
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="grid gap-y-6 my-4 p-3">
      <p className="mx-auto flex text-gray-600">
        <MessageCircleWarning className="text-gray-600 text-lg" />
        kindly check mail inbox/spam for your copy
      </p>
      <div className="flex justify-between text-lg">
        <div
          className="grid gap-x-4 gap-y-3"
          style={{ gridTemplateColumns: "auto minmax(auto,1fr)" }}
        >
          <span className="capitalize text-gray-700 text-sm font-medium">
            user Name
          </span>
          <span className="capitalize text-gray-700 text-sm">
            {data.message.username}{" "}
          </span>
          <span className="capitalize text-gray-700 text-sm font-medium">
            User email
          </span>
          <span className="capitalize text-gray-700 text-sm">
            {data.message.useremail}{" "}
          </span>
          <span className="capitalize text-gray-700 text-sm font-medium">
            User phone
          </span>
          <span className="capitalize text-gray-700 text-sm">
            {data.message.userPhone}{" "}
          </span>
          <span className="capitalize text-gray-700 text-sm font-medium">
            delivery address
          </span>
          <span className="capitalize text-gray-700 text-sm ">
            {data.message.orderAddress}{" "}
          </span>
          {/* <span className="capitalize text-gray-700 text-sm font-medium">
            orderId
          </span>
          <span className="capitalize text-gray-700 text-sm ">
            {data.message.id}{" "}
          </span> */}
          <span className="capitalize text-gray-700 text-sm font-medium">
            product Qty
          </span>
          <span className="capitalize text-gray-700 text-sm">
            {data.message.product.reduce(
              (acc: number, cur: Product) => acc + cur.quantity,
              0
            )}{" "}
          </span>
          <span className="capitalize text-gray-700 text-sm font-medium">
            amount
          </span>

          <span className="capitalize text-gray-700 text-sm">
            ₦{data.message.amount}{" "}
          </span>
          <span className="capitalize text-gray-700 text-sm font-medium">
            payment status
          </span>
          <span className="capitalize text-gray-700 text-sm">
            {data.message.paymentStatus}{" "}
          </span>
        </div>
        <div className="hidden md:block border rounded-md self-start h-fit p-3  ">
          <Link
            href={"/product"}
            className="cursor-pointer text-lg text-gray-600"
          >
            Continue shopping
          </Link>
        </div>
      </div>
      <div className="w-full">
        <input
          className="w-full transition-all duration-1000 ease-in-out accent-baseGreen range-input"
          type="range"
          min="10"
          max="100"
          readOnly
          value={
            data.message.deliveryStatus === "one"
              ? 0
              : data.message.deliveryStatus === "two"
                ? 50
                : 100
          }
        />
        <div className="flex justify-between text-xs mt-1">
          <span className="text-gray-600">
            <PackageCheckIcon size={24} />
          </span>
          <span className="text-gray-600">
            <Truck size={24} />
          </span>
          <span className="text-gray-600">
            <HouseIcon size={24} />
          </span>
        </div>
      </div>
      <div className="">
        <table className="w-full border-collapse border border-gray-300 table-fixed">
          <thead>
            <tr className="bg-gray-200">
              <th className="border  hidden lg:table-cell  border-gray-300 px-4 py-2  text-center capitalize">
                ID
              </th>
              <th className="border  border-gray-300 px-4 py-2  text-center capitalize">
                Price ₦
              </th>
              <th className="border hidden lg:table-cell border-gray-300 px-4 py-2  text-center capitalize">
                name
              </th>
              <th className="border border-gray-300 px-4 py-2  text-center capitalize">
                quantity
              </th>
              <th className="border border-gray-300 px-4 py-2  text-center capitalize">
                size
              </th>
              <th className="border hidden lg:table-cell border-gray-300 px-4 py-2  text-center capitalize">
                color
              </th>
            </tr>
          </thead>
          {data.message.product.map((item: ProductOrder) => (
            <tbody key={item.id}>
              <tr className="hover:bg-gray-100 group" key={item.id}>
                <td className="border hidden lg:table-cell border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                  {item?.id.slice(0, 10)}
                </td>
                <td className="border  border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                  {item?.price}
                </td>
                <td className="border hidden lg:table-cell border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                  {item?.name}
                </td>
                <td className="border  border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                  {item?.quantity}
                </td>
                <td className="border  border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                  {item?.size}
                </td>
                <td
                  style={{ backgroundColor: item.color }}
                  className="border hidden lg:table-cell text-white border-gray-300 px-4 py-2 whitespace-nowrap text-center"
                >
                  {item?.color}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="flex gap-2 flex-wrap">
        {data.message.product.map((item: ProductOrder) => (
          <Image
            key={item.image}
            src={item.image}
            width={60}
            height={60}
            alt=""
            className="object-cover min-w-[60px] min-h-[60px] rounded-sm "
          />
        ))}
      </div>
    </div>
  );
};

export default SngleOrderPage;
