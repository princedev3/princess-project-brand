"use client";
import { Eye, Heart, Truck, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useCartStore } from "@/static-data/cart-store";
import { Product } from "@prisma/client";
import { disAbleCart } from "@/static-data/helper-func";
import {
  useCreateLikeMutation,
  useGetLikesQuery,
} from "@/app/apis/like_index_api";
import { userStore } from "@/static-data/user-session";
import { toast } from "sonner";
import { motion } from "framer-motion";

const SingleCard = ({
  name,
  id,
  desc,
  price,
  colors,
  sizes,
  images,
  userId,
  quantity,
  brand,
}: Product) => {
  const { addToCart, products: cartProducts } = useCartStore();
  const isOutOfStock = disAbleCart(cartProducts, id, quantity);
  const [createLike] = useCreateLikeMutation();
  const { data, isLoading } = useGetLikesQuery(null);

  const session = userStore((state) => state.session);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!isLoading && data?.message) {
      setLiked(data?.message?.includes(id));
    }
  }, [data, id, isLoading]);

  const handleLike = async () => {
    try {
      if (!session) {
        toast.error("kindly login");
        return;
      }

      const res = await createLike({ id, userId: session.user?.id });
      setLiked((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-[405px] flex flex-col gap-2 border rounded-md overflow-hidden border-gray-200 "
    >
      <div className="relative h-[230px] bg-white flex items-center justify-center w-full border-b">
        <Image src={images[0]} alt="" fill className="object-cover" />

        <div className="absolute  top-4  transition-all duration-300 right-2 ">
          <div className="flex flex-col gap-3">
            <motion.div
              whileTap={{ scale: 0.85 }}
              onClick={handleLike}
              className="cursor-pointer w-[33px] h-[33px] p-[6px] bg-white rounded-full flex items-center justify-center"
            >
              <Heart
                size={30}
                className={`${
                  liked ? "fill-red-500 stroke-red-500" : ""
                }  text-baseBlack rounded-full `}
              />
            </motion.div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={`/product/${id}`}
                    className="cursor-pointer w-[33px] h-[33px] p-[6px] bg-white rounded-full flex items-center justify-center"
                  >
                    <Eye
                      size={30}
                      className="shadow-sm min-w-[27px] min-h-[27px] rounded-full  text-baseBlack"
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>see more</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-[20px] gap-2 items-center w-full">
        <div className="max-w-full w-full text-center">
          <span className="text-gray-700 text-center text-lg capitalize break-words whitespace-normal">
            {name}
          </span>
        </div>
        <h1 className="text-gray-700 text-lg">
          <span className="text-xl font-semibold">₦</span>
          <span className="">{price.toLocaleString()}</span>
        </h1>
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={quantity <= 0 || isOutOfStock}
          onClick={() => {
            addToCart({
              name,
              id,
              price,
              quantity: 1,
              image: images[0],
              size: "M",
              color: "#000",
              initialQuantity: quantity,
            });
            toast.success("added to cart");
          }}
          className={`bg-teal-600 w-[80%] rounded-[30px] pointer-events-auto text-white font-medium cursor-pointer py-3 disabled:cursor-not-allowed disabled:bg-black/50`}
        >
          Add to cart 
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SingleCard;
