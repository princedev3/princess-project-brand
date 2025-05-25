"use client"
import CardSection from "@/components/navbar/card-section";
import CarouselComponent from "@/components/navbar/carousel";
import BrowseByCategory from "@/components/navbar/carousel-product";
import HeroSection from "@/components/navbar/hero-section";
import Newsletter from "@/components/navbar/newsletter";
import TrendingNow from "@/components/navbar/trending-now";
import React from "react";
import { useGetAllProductQuery, useGetProductByTrendingQuery } from "./apis/_product_index.api";
import LoadingPage from "@/components/navbar/loading";
import { Product } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useGetCommentForSiderQuery } from "./apis/_comment_index_api";
import { SliderCommentType } from "@/static-data/types";


const Home = () => {
    const page = useSearchParams().get("page") as string
    const { data, isLoading} = useGetProductByTrendingQuery(null);
    const { data:commentData, isLoading:commentIsLoading } = useGetCommentForSiderQuery(null);
    const { data:allProductData, isLoading:productIsLoading } = useGetAllProductQuery(
    parseInt((page as string) || "1")
  );

   if(isLoading || productIsLoading || commentIsLoading){
    return <LoadingPage/>
   }

  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <TrendingNow  page={page as string} data={data as {message:Product[]}} />
     <BrowseByCategory/>
      <CardSection page={page as string} data={allProductData as {message:{ allProducts:Product[], count:number }} } />
      <CarouselComponent data={commentData as  { sliderComment: SliderCommentType[]}} />
      <Newsletter />
    </div>
  );
};

export default Home;
