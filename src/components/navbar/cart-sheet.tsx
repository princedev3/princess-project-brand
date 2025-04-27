"use client";
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from '@/static-data/cart-store';
import CartIcon from '@/icons/cart-icon';
import Image from 'next/image';
import { Separator } from "@/components/ui/separator"; 
import { Button } from '../ui/button';
import Link from 'next/link';

const CartSheet = () => {
  const { totalItems, products } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);



  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        {totalItems > 0 && (
          <div className="relative cursor-pointer">
            <CartIcon
              size={25}
              color="white"
              className="min-w-[30px] min-h-[30px]"
            />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-lg font-semibold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          </div>
        )}
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle><p className="text-lg">Your Cart</p></SheetTitle>
          <SheetDescription >
         <p className="text-lg">   Review the items in your cart before proceeding to checkout.</p>
          </SheetDescription>
        </SheetHeader>


        <div className="space-y-4">
          {products.length === 0 ? (
            <p className="text-center text-lg">Your cart is empty.</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="flex items-center space-x-4">
                <Image
                  src={product.image} 
                  alt={product.name}
                  width={50}
                  height={50}
                  className="object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold text-lg">{product.name}</p>
                  <p className="text-gray-600 text-lg">${product.price}</p>
                  <p className="text-gray-500 text-lg">Quantity: {product.quantity}</p> {/* Display quantity */}
                </div>
              </div>
            ))
          )}
        </div>

        {products.length > 0 && <Separator className="my-4" />}

     
        <Link href={"/cart"} className='cursor-pointer'>
      <Button onClick={()=>setIsOpen(false)} className='rounded-xl w-full text-lg'>Proceed to checkout</Button>
        </Link>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
