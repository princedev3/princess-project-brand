"use client";
import { useGetAllUserQuery } from "@/app/apis/_user_index.api";
import LoadingPage from "@/components/navbar/loading";
import React from "react";
import { DataTable } from "./user-data-table";
import { userColumns } from "./user-column";
import { PaginationWithLinks } from "@/components/navbar/paginationwithlinks";
import { useSearchParams } from "next/navigation";

const AllUser = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const { data, isLoading } = useGetAllUserQuery(null);
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold my-4 text-baseGreen capitalize">
        Manage user
      </h1>
      <div className="">
        <DataTable data={data?.allUser} columns={userColumns} />
        {data && data?.count && (
          <PaginationWithLinks
            pageSize={Number(process.env.NEXT_PUBLIC_POST_PER_PAGE)}
            page={parseInt((page as string) || "1")}
            totalCount={data?.count as number}
          />
        )}
      </div>
    </div>
  );
};

export default AllUser;
