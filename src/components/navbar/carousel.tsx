"use client";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import StarRating from "../comment-section/star-rating";
import { useGetCommentForSiderQuery } from "@/app/apis/_comment_index_api";
import { format } from "date-fns";

const CarouselComponent = () => {
  const { data, isLoading } = useGetCommentForSiderQuery(null);
  if (isLoading || !data?.sliderComment?.length) {
    return null;
  }

  return (
    <div className="bg-gray-100 py-16 px-4">
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 capitalize">
    Your Joy, Our Promise
    </h2>
    <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-lg">
    Every product is handpicked with you in mind — because you deserve the best.
    </p>
  </div>

  <div className="flex justify-center">
    <Carousel
      plugins={[
        Autoplay({ delay: 3000 }),
      ]}
      opts={{ align: "start", loop: true }}
      className="relative w-full max-w-5xl"
    >
      <CarouselContent>
        {data && data?.sliderComment?.length > 0 &&
          data.sliderComment.map((item, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center px-4"
            >
              <Card className="w-full max-w-xl shadow-md rounded-xl bg-white p-6">
                <CardContent className="flex flex-col items-center gap-4">
                  <Image
                    src={item.user.image || "/noavatar.png"}
                    width={100}
                    height={100}
                    alt="User Avatar"
                    className="w-[100px] h-[100px] rounded-full object-cover border-4 border-white shadow"
                  />
                  <StarRating rating={item.value} />
                  <p className="text-center text-gray-700 text-lg italic max-w-md">
                    “{item.comment}”
                  </p>
                  <div className="text-center mt-4">
                    <h3 className="font-semibold text-gray-800 text-lg capitalize">
                      {item.user.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {format(item.createdAt, "PPP")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
      </CarouselContent>

      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10" />
    </Carousel>
  </div>
</div>

    // <div className="bg-gray-200 grid gap-y-5 py-10">
    //   <div className="grid justify-center items-center gap-y-3">
    //     <h1 className="capitalize font-bold text-2xl text-center">
    //       our happy customers
    //     </h1>
    //     <span className="text-lg text-gray-800 md:w-[60%] text-center mx-auto">
    //       We aim at serving our customers with the highest quality and unmatched
    //       satisfaction, ensuring every experience exceeds expectations
    //     </span>
    //   </div>
    //   <div className="flex items-center justify-center">
    //     <div className="">
    //       <Carousel
    //         plugins={[
    //           Autoplay({
    //             delay: 2000,
    //           }),
    //         ]}
    //         opts={{
    //           align: "start",
    //           loop: true,
    //         }}
    //         className="relative grid w-full max-w-4xl overflow-hidden"
    //       >
    //         <CarouselContent>
    //           {data && data.sliderComment.length > 0
    //             ? data.sliderComment.map((item, index) => (
    //                 <CarouselItem
    //                   key={index}
    //                   className=" grid w-full max-w-xl "
    //                 >
    //                   <Card className="h-full grid w-full max-w-xl px-6 ">
    //                     <CardContent className="grid  w-full gap-y-3 mx-auto justify-center">
    //                       <div className="flex w-full flex-col items-center justify-center">
    //                         <Image
    //                           src={item.user.image || "/noavatar.png"}
    //                           width={120}
    //                           alt=""
    //                           height={120}
    //                           className="rounded-full w-[120px] h-[120px] mx-auto object-cover"
    //                         />
    //                         <StarRating rating={item.value} />
    //                       </div>
    //                       <span className="text-gray-500 text-center text-lg font-semibold w-full">
    //                         {item.comment}
    //                       </span>
    //                       <div className="mx-auto">
    //                         <h2 className="font-bold capitalize text-lg text-center text-gray-700">
    //                           {item.user.name}{" "}
    //                         </h2>
    //                         <h2 className="text-center text-gray-500">
    //                           {format(item.createdAt, "PPP")}
    //                         </h2>
    //                       </div>
    //                     </CardContent>
    //                   </Card>
    //                 </CarouselItem>
    //               ))
    //             : null}
    //         </CarouselContent>
    //         <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10" />
    //         <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10" />
    //       </Carousel>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CarouselComponent;
