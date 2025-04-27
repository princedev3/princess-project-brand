import { Product } from "@prisma/client";
import { z } from "zod";

export type CardTypes = {
  id: string;
  title: string;
  brand: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

export type userType = {
  id: number;
  name: string;
  image: string;
  angle: number;
}[];

export type ProductType = {
  message: {
    allProducts: Product[];
    isFallback?: boolean;
    count: number;
  };
};
export type SingleProductType = {
  getSingleFetch: Product;
};

export type ProductOrder = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
};

export type CreatedComment = {
  id: string;
  productId: string;
  userId: string;
  value: number;
  comment: string | null;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

export const couponSchema = z.object({
  duration: z
    .string()
    .min(1, { message: "price is required" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Price must be a valid number.",
    })
    .transform((val) => Number(val)),
  code: z.string().min(1, { message: "desc is required" }),
});

export type SliderCommentType = {
  id: string;
  comment: string;
  value: number;
  createdAt: string; // or `Date` if you're converting to Date
  userId: string;
  productId: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
};
