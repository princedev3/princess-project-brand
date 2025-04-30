"use client";
import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { testimonials } from "@/static-data/staticdata";
import { type CarouselApi } from "@/components/ui/carousel";

function TestimonialSlider() {
  const [api, setApi] = React.useState<CarouselApi | null>(null); // Store the carousel API
  const [current, setCurrent] = React.useState(2); // Default to the middle one (index 2)
  
  React.useEffect(() => {
    if (!api) return;

    // Set the initial slide and ensure we loop properly
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    api.on("scroll", () => {
      // Ensure smooth loop behavior (no abrupt flashing or jumps)
      const totalItems = api.scrollSnapList().length;
      if (api.selectedScrollSnap() === totalItems - 1) {
        api.scrollTo(0); // Loop back to the first item
      }
    });
  }, [api]);

  return (
    <div className="w-full overflow-hidden mx-auto">
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true, // Enable looping
        }}
        className="w-full overflow-hidden"
      >
        <CarouselContent className="flex gap-4 justify-center"> {/* Center items horizontally */}
          {testimonials.map((item, index) => (
            <CarouselItem
              key={index}
              className={`carousel-item flex-shrink-0 w-full sm:basis-1/3 md:basis-1/3 lg:basis-1/3 
                          ${index === current ? 'scale-110 transform' : 'scale-90'} 
                          transition-all ease-in-out duration-300`} 
            >
              <Image
                src={item.image}
                alt={item.name}
                width={150}
                height={150}
                className="object-cover rounded-full w-[150px] h-[150px] mx-auto"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

      
        <div className="mt-6 max-w-md mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm sm:text-base mb-4">
            {testimonials[current]?.text}
          </p>

          <div className="flex justify-center text-yellow-400 text-lg mb-2">
            {"★★★★★".split("").map((star, i) => (
              <span key={i}>{star}</span>
            ))}
          </div>

          <h3 className="font-bold text-center">{testimonials[current]?.name}</h3>

          {/* Custom Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)} // Manually scroll to a specific slide when clicking a dot
                className={`transition-all rounded-full ${
                  i === current
                    ? "bg-black w-4 h-4 scale-110"
                    : "bg-gray-400 w-3 h-3"
                }`}
              />
            ))}
          </div>
        </div>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default TestimonialSlider;
