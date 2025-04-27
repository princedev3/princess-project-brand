"use client";
import React, { useState } from "react";
import { DataTable } from "./sales-data-table";
import { orderColumns } from "./sales-column";
import { useGetAllOrderQuery } from "@/app/apis/_order_index.api";
import { PaginationWithLinks } from "@/components/navbar/paginationwithlinks";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import LoadingPage from "@/components/navbar/loading";

const Sales = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const page = searchParams.get("page") || "1";
  const { data, isLoading } = useGetAllOrderQuery({ page, search });
  const debouncedSetAddress = useDebouncedCallback((val: string) => {
    setSearch(val);
  }, 500);
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4 text-baseGreen">
        Manage Sales
      </h1>

      <div className="relative my-4">
        <input
          type="text"
          name="search"
          onChange={(e) => debouncedSetAddress(e.target.value)}
          className="outline-none border w-full rounded-md  p-2 flex-1"
        />
        <Search className="absolute right-2 text-gray-600 z-10 bottom-0 -translate-y-[40%] " />
      </div>

      {data && data?.allOrders?.length > 0 ? (
        <DataTable columns={orderColumns} data={data?.allOrders} />
      ) : (
        <span className="text-center mx-auto grid">No Order Found</span>
      )}
      {data && data?.allOrders?.length > 0 && (
        <PaginationWithLinks
          pageSize={Number(process.env.NEXT_PUBLIC_POST_PER_PAGE)}
          page={parseInt((page as string) || "1")}
          totalCount={data?.count as number}
        />
      )}
    </div>
  );
};

export default Sales;
