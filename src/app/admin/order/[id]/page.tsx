"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import {
  useFetchSingleOrderQuery,
  useUpdateOrderMutation,
} from "@/app/apis/_order_index.api";
import LoadingPage from "@/components/navbar/loading";
import Link from "next/link";

const OrderDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [updateOrder] = useUpdateOrderMutation();
  const { data, isLoading } = useFetchSingleOrderQuery(id);
  if (isLoading) {
    return <LoadingPage />;
  }
  const order = data?.message;

  const deliveryOptions = [
    { value: "one", label: "Processing" },
    { value: "two", label: "Shipped" },
    { value: "three", label: "Delivered" },
  ];

  const handleStatusChange = async (newStatus: string) => {
    try {
      const res = await updateOrder({ newStatus, id });
      if (res.data.status === 200) {
        router.refresh();
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full mx-auto my-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Order ID: {order.id}</CardTitle>
          {order.createdAt ? (
            <p className="text-sm text-muted-foreground">
              Placed on {format(new Date(order?.createdAt), "yyyy-MM-dd")}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Date not available</p>
          )}

          <Link
            href={`/order/${order?.id}`}
            className="text-lg font-semibold text-baseBlack"
          >
            Click here to view product
          </Link>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Username</p>
              <p className="font-medium">{order?.username}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{order?.useremail}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{order?.userPhone || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Status</p>
              <Badge variant="outline">{order?.paymentStatus}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="font-medium">₦{order?.amount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p className="font-medium">₦{order?.amount}</p>
              <p className="font-mono text-xs break-all">{order?.payStackId}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{order?.orderAddress}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Delivery Status</p>
              <Select
                value={order.deliveryStatus}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {deliveryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Products</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
              {order?.product?.map((item: any, index: number) => (
                <li key={index}>
                  {item.name} (x{item.quantity}) - ₦{item.price}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetails;
