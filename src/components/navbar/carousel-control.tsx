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

  //   const scrollLeft = () => {
  //     if (sliderRef?.current !== null)
  //       if ( scrollSlider(sliderType) )
  //         sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  //   };

  //   const scrollRight = () => {
  //     if (sliderRef?.current !== null)
  //       if (sliderType === "productSlider")
  //         sliderRef?.current.scrollBy({ left: 300, behavior: "smooth" });
  //   };
  return (
    <>
      <button
        onClick={() => scrollSlider("left")}
        className=" bg-gray-200 p-2 rounded-full shadow"
      >
        <MdArrowBack />
      </button>
      <button
        onClick={() => scrollSlider("right")}
        className=" bg-gray-200 p-2 rounded-full shadow"
      >
        <MdArrowForward />
      </button>
    </>
  );
};

export default CarouselControl;
