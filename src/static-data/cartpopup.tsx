"use client";
import { useCartStore } from "./cart-store";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const CartPopup = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCartStore();
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  return (
    <div className="fixed top-5 right-5 z-50">
      {totalItems > 0 && !cartOpen && (
        <button
          className="w-[50px] h-[50px] bg-baseGreen rounded-full flex items-center justify-center text-white font-bold"
          onClick={() => setCartOpen(true)}
        >
          {totalItems}
        </button>
      )}

      <div
        className={`transition-all duration-500 ease-in-out ${
          cartOpen
            ? "opacity-100 scale-100 translate-x-0"
            : "opacity-0 scale-95 translate-x-[50%]"
        } ${
          cartOpen
            ? "w-[300px] h-[200px] p-5 bg-white shadow-lg rounded-lg"
            : "w-[50px] h-[50px] bg-baseGreen rounded-full flex items-center justify-center"
        }`}
      >
        {cartOpen ? (
          <div className="relative">
            <button
              className="absolute top-3 right-3 text-gray-500"
              onClick={() => setCartOpen(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold text-gray-700">Shopping Cart</h2>
            <p className="text-gray-600 mt-2">Items in cart: {totalItems}</p>
          </div>
        ) : (
          <button
            className="text-white font-bold"
            onClick={() => setCartOpen(true)}
          >
            {totalItems}
          </button>
        )}
      </div>
    </div>
  );
};

export default CartPopup;
