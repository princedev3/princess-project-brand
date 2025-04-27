"use client";
import { useGetProductByBrandQuery } from "@/app/apis/_product_index.api";
import React from "react";
import SingleCard from "./navbar/single-card";

const RelatedProduct = ({ brand }: { brand: string }) => {
  const { data, isLoading } = useGetProductByBrandQuery(brand);
  if (isLoading) {
    return;
  }
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-medium text-baseBlack mb-6 ">
        Related Product
      </h1>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-5">
        {data &&
          data.relatedProduct.length &&
          data.relatedProduct.map((item) => (
            <SingleCard key={item.id} {...item} />
          ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
