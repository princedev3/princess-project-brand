"use client"
import { useCartStore } from '@/static-data/cart-store';
import { disAbleCart } from '@/static-data/helper-func';
import React from 'react'
import { toast } from 'sonner';
import {motion} from "framer-motion"
import { Product } from '@prisma/client';
import Image from 'next/image';

const TrendingProduct = ({
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
  return (


    <div key={id} className="bg-black/80 rounded-lg flex flex-col justify-center items-center shadow-md p-6">
      <div className="h-60 w-full relative  mb-4 rounded-md overflow-hidden">
        <Image src={images[0]} alt="" fill className="object-cover"/>
      </div>
      <h3 className="text-2xl text-white my-4 font-semibold ">{name} </h3>
      <p className="text-white text-xl mb-4">
      {new Intl.NumberFormat('en-NG', {
style: 'currency',
currency: 'NGN',
minimumFractionDigits: 0,
maximumFractionDigits: 0,
}).format(price)}
</p>

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
className="text-black border w-[50%] bg-white p-3 cursor-pointer hover:bg-black hover:border hover:text-white hover:border-white">add to cart</motion.button>
    </div>



 

  )
}

export default  TrendingProduct