"use client";
import React from "react";
import { useGetLikedProductsQuery } from "../apis/like_index_api";
import LoadingPage from "@/components/navbar/loading";
import SingleCard from "@/components/navbar/single-card";

const LikePage = () => {
  const { data, isLoading } = useGetLikedProductsQuery(null);
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <div className="wave-text my-7 text-2xl flex items-center font-semibold text-teal-600 capitalize mx-auto justify-center">
        <span className="wave mr-1">liked </span>
        <span className="wave  mr-1"> products</span>
      </div>
      <div className="grid gap-8  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
        {data && data?.message.length ? (
          data?.message.map((item) => <SingleCard key={item.id} {...item} />)
        ) : (
          <div className="my-7 text-2xl flex items-center font-semibold text-baseGreen capitalize mx-auto justify-center">
            Like cart Empty
          </div>
        )}
      </div>
    </div>
  );
};

export default LikePage;
