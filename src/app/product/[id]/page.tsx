"use client";
import { useGetSingleProductQuery } from "@/app/apis/_product_index.api";
import LoadingPage from "@/components/navbar/loading";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/static-data/cart-store";
import { disAbleCart } from "@/static-data/helper-func";
import { ChevronDown, ChevronRight, ChevronUp, Share2, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import SingleSecure from "@/icons/single-search";
import { Separator } from "@/components/ui/separator";
import RelatedProduct from "@/components/related-product";
import ProductReviews from "@/components/product-reviews";

const SingleProduct = () => {
  const { id } = useParams();

  const fadeInVariant = {
    initial: {
      y: 100,
      opacity: 0,
    },
    animate: (idx: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.05 * idx,
      },
    }),
  };
  const { addToCart, products: cartProductsList } = useCartStore();
  const pathname = usePathname();
  const [showReview, setShowReview] = useState("review");
  const { data, isLoading } = useGetSingleProductQuery(id as string);
  const [copied, setCopied] = useState(false);
  const [selectColored, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  

  if (isLoading) {
    return <LoadingPage />;
  }
  const copyToClipboard = async () => {
    try {
      const url = `${window.location.origin}${pathname}`;
      await navigator.clipboard.writeText(url);
      toast.success("copied");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      setCopied(false);
    }
  };

  const handleColorChange = (item: string) => {
    setSelectedColor(item);
  };
  const handleSizeChange = (item: string) => {
    setSelectedSize(item);
  };
  const addToCarts = () => {
    if (!selectColored || !selectedSize) {
      toast.error("select a size or color");
      return;
    }
    addToCart({
      name: data?.getSingleFetch.name as string,
      id: data?.getSingleFetch.id as string,
      price: (data?.getSingleFetch.price as number) * productQuantity,
      image: data?.getSingleFetch.images[0] as string,
      size: selectedSize,
      color: selectColored,
      quantity: productQuantity,
      initialQuantity: data?.getSingleFetch.quantity as number,
    });
  };
  const isOutOfStock = disAbleCart(
    cartProductsList,
    data?.getSingleFetch.id as string,
    data?.getSingleFetch.quantity as number
  );

 
  return (
    <div className="overflow-x-hidden  p-[10px] md:p-[20px] lg:p-[40px]">
     
      <div className="grid md:grid-cols-2 gap-5 gap-y-5 ">
        <motion.div
           initial={{ opacity: 0, x: -100 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full self-start  relative">
          <div
            className="relative w-full h-[350px] mx-auto mb-4"
          >
            <Image
              src={data?.getSingleFetch.images[imageIndex] as string}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute top-2 w-full  justify-between flex  px-8">
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="bg-white p-1 rounded-full cursor-pointer"
            >
              <Share2
                size={35}
                onClick={copyToClipboard}
                className={`${copied ? "text-gray-400" : "text-gray-600"} min-h-[35px] min-w-[35px] `}
              />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="bg-white p-1 rounded-full cursor-pointer"
              onClick={() => setIsOverlayOpen(true)}
            >
              <SingleSecure size={35} className="min-h-[35px] min-w-[35px] " />
            </motion.div>
          </div>
          <div className="flex gap-3 flex-wrap w-full ">
            {data?.getSingleFetch?.images?.map((item, idx) => (
              <motion.div
                variants={fadeInVariant}
                initial="initial"
                viewport={{ once: true }}
                custom={idx}
                whileInView="animate"
                className=""
                key={idx}
              >
                <Image
                  onClick={() => setImageIndex(idx)}
                  key={idx}
                  src={item}
                  alt=""
                  width={80}
                  height={80}
                  className="w-[80px] h-[80px] border object-cover cursor-pointer p-1"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div 
           initial={{ opacity: 0, x: 100 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.4, ease: "easeOut" }}
        className="self-start grid gap-4 md:bg-[#FFFBF5]  md:px-[30px] md:py-[50px] ">
          <h1 className="text-lg  md:text-xl font-semibold capitalize">
            Home / New Collection / {data?.getSingleFetch.brand}
          </h1>
          <h1 className="text-lg  md:text-xl font-semibold capitalize">
            {data?.getSingleFetch.name}
            {/* / {data?.getSingleFetch.quantity} */}
          </h1>
          <Separator className="bg-baseBlack/50" />
          <p className="text-baseBlack text-2xl">
          ₦{data?.getSingleFetch.price.toLocaleString()}{" "}
          </p>
          <div className="grid gap-y-1">
            <span className="text-gray-500 text-lg">Select a color</span>
            <div className="flex gap-2">
              {data?.getSingleFetch.colors.map((item) => (
                <div
                  key={item}
                  className={`${
                    selectColored === item ? "border-2 border-gray-600" : ""
                  } w-7 h-7 rounded-full  flex  items-center justify-center`}
                >
                  <div
                    className={`w-5 h-5 rounded-full cursor-pointer`}
                    style={{ backgroundColor: item }}
                    onClick={() => handleColorChange(item)}
                  ></div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-y-1">
            <span className="text-gray-500 text-lg">Select a size</span>
            <div className="flex gap-4">
              {data?.getSingleFetch.sizes.map((item) => (
                <div
                  key={item}
                  onClick={() => handleSizeChange(item)}
                  className={`${
                    selectedSize === item ? "bg-gray-600 text-white" : ""
                  } text-lg min-w-12 text-center cursor-pointer border p-1 flexx items-center justify-center capitalize rounded-sm text-gray-600`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <p className=" text-lg text-gray-600">{data?.getSingleFetch?.desc}</p>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 border w-[70px] h-[50px] aspect-square p-1">
              <span className="text-xl">{productQuantity}</span>

              <div className="flex items-center flex-col">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="w-full"
                  disabled={
                    productQuantity >= (data?.getSingleFetch.quantity ?? 0)
                  }
                  onClick={() => setProductQuantity(productQuantity + 1)}
                >
                  <ChevronUp className="text-gray-600 cursor-pointer" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="w-full disabled:cursor-not-allowed"
                  disabled={productQuantity <= 1}
                  onClick={() => setProductQuantity(productQuantity - 1)}
                >
                  <ChevronDown className="text-gray-600 cursor-pointer disabled:cursor-not-allowed" />
                </motion.button>
              </div>
            </div>
            <motion.div whileTap={{ scale: 0.95 }} className="w-full">
              <Button
                disabled={isOutOfStock}
                onClick={addToCarts}
                className="bg-black rounded-3xl font-semibold min-w-[200px] text-lg  py-6 disabled:cursor-not-allowed disabled:bg-baseGreen/80"
              >
                Add to cart
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Separator className="bg-baseBlack/10 my-11" />
      <div className="grid gap-y-10">
        <div className="grid gap-y-10">
        <div className="flex items-center ">
  <div className="relative">
    <span
      onClick={() => setShowReview("desc")}
      className={`text-2xl text-[#000000] cursor-pointer border-b-2 px-3 py-2 transition-all duration-300 ease-in-out ${
        showReview === "desc" ? "font-medium border-b-4 border-black" : "hover:border-b-4 hover:border-gray-500"
      }`}
      aria-selected={showReview === "desc"}
    >
      Description
    </span>
  </div>

  <div className="relative">
    <span
      onClick={() => setShowReview("review")}
      className={`text-2xl text-[#000000] cursor-pointer border-b-2 px-3 py-2 transition-all duration-300 ease-in-out ${
        showReview === "review" ? "font-medium border-b-4 border-black" : "hover:border-b-4 hover:border-gray-500"
      }`}
      aria-selected={showReview === "review"}
    >
      Review
    </span>
  </div>
</div>

        </div>

        {showReview === "desc" && (
          <div className="mb-5 text-lg">{data?.getSingleFetch.desc}</div>
        )}
        {showReview === "review" && <ProductReviews id={id as string} />}
      </div>
      <RelatedProduct brand={data?.getSingleFetch?.brand as string} />
      {isOverlayOpen && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center"
  >
    <img
      src={data?.getSingleFetch.images[imageIndex] as string}
      alt="Preview"
      className="max-h-[80vh] w-[90%] object-cover transition-transform duration-300 ease-in-out"
    />
    
    {/* Next Image Button */}
    <button
      onClick={() =>
        setImageIndex((prev) =>
          prev + 1 >= (data?.getSingleFetch?.images?.length || 0)
            ? 0
            : prev + 1
        )
      }
      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-baseGreen focus:outline-none transition"
      aria-label="Next Image"
    >
      <ChevronRight size={30} className="w-[30px] h-[30px]" />
    </button>

    {/* Close Button */}
    <button
      onClick={() => setIsOverlayOpen(false)}
      className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-red-500 focus:outline-none transition"
      aria-label="Close Preview"
    >
      <X size={35} className="w-[35px] h-[35px]" />
    </button>
  </motion.div>
)}

    </div>
  );
};

export default SingleProduct;
