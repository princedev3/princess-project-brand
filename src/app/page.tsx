import DiscountOverlay from "@/components/coupon/discountOverlay";
import CardSection from "@/components/navbar/card-section";
import CarouselComponent from "@/components/navbar/carousel";
import BrowseByCategory from "@/components/navbar/carousel-product";
import HeroSection from "@/components/navbar/hero-section";
import NavbarHeader from "@/components/navbar/navbar-header";
import Newsletter from "@/components/navbar/newsletter";
import TestimonialSlider from "@/components/navbar/slider-testimonial";
import SummerSales from "@/components/navbar/summer-sales";
import TrendingNow from "@/components/navbar/trending-now";
import React from "react";

interface Params {
  page?: string;
}
interface PageProps {
  searchParams: Promise<Params>;
}
const Home = async ({ searchParams }: PageProps) => {
  const { page } = await searchParams;

  return (
    <div className="flex flex-col w-full">
      <DiscountOverlay />
      <HeroSection />
      <TrendingNow  page={page as string} />
     <BrowseByCategory/>
      <CardSection page={page as string} />
      <CarouselComponent />
      <Newsletter />
    </div>
  );
};

export default Home;
