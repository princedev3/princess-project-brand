"use client";
import React from "react";
import SingleCard from "./single-card";
import { PaginationWithLinks } from "./paginationwithlinks";
import { useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { Product } from "@prisma/client";

const CardSection = ({ page,data }: { page: string,data:{message:{ allProducts:Product[], count:number }} }) => {


  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

 
  return (
    <div className="mb-7  px-5 md:px-20">
      <h1 className="text-[30px] font-semibold capitalize text-baseBlack  mx-auto my-5">
        Our Products
      </h1>
      <motion.div
        className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-5 "
      >
        {(data &&
          data?.message.allProducts.length) ?
          data?.message.allProducts.map((item) => (
            <SingleCard key={item.id} {...item} />
          )):null}
      </motion.div>

      {data?.message.count ? (
        <PaginationWithLinks
          pageSize={Number(process.env.NEXT_PUBLIC_POST_PER_PAGE)}
          page={parseInt((page as string) || "1")}
          totalCount={data?.message.count as number}
        />
      ):null}
    </div>
  );
};

export default CardSection;
