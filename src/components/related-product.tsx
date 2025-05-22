"use client";
import React from "react";
import SingleCard from "./navbar/single-card";
import { Product } from "@prisma/client";

const RelatedProduct = ({ data }: { data: {
    relatedProduct: Product[];
}  }) => {
 
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
