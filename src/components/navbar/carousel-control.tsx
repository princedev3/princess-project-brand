import { MdArrowBack, MdArrowForward } from "react-icons/md";
import React from "react";

const CarouselControl = ({
  sliderRef,
  sliderType,
}: {
  sliderRef: React.RefObject<HTMLDivElement>;
  sliderType: "productSlider" | "categorySlider";
}) => {
  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef?.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      switch (sliderType) {
        case "productSlider":
          sliderRef.current.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
          break;
        case "categorySlider":
          sliderRef.current.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
          break;
        default:
          console.warn(`Unknown slider type: ${sliderType}`);
      }
    }
  };


  return (
    <>
      <button
        onClick={() => scrollSlider("left")}
        className=" bg-gray-200 cursor-pointer p-2 rounded-full shadow"
      >
        <MdArrowBack className="!w-[30px] !h-[30px] " />
      </button>
      <button
        onClick={() => scrollSlider("right")}
        className=" bg-gray-200 p-2 cursor-pointer rounded-full shadow"
      >
        <MdArrowForward className="!w-[30px] !h-[30px] " />
      </button>
    </>
  );
};

export default CarouselControl;
