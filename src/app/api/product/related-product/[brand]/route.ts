import prisma from "@/static-data/prisma";
import { NextRequest, NextResponse } from "next/server";

type ParamType = {
  params: Promise<{
    brand?: string;
  }>;
};

export const GET = async (req: NextRequest, { params }: ParamType) => {
  try {
    // const { brand } = await params;

    // let relatedProduct;

    // if (!brand) {
    //   relatedProduct = await prisma.product.findMany({
    //     take: 5,
    //   });
    // } else {
    //   relatedProduct = await prisma.product.findMany({
    //     where: {
    //       brand: {
    //         contains: brand,
    //         mode: "insensitive",
    //       },
    //     },
    //   });
    // }
    const relatedProduct = await prisma.product.findMany({
      take: 5,
    });
    return NextResponse.json({ relatedProduct, status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);

    return NextResponse.json({
      message: "can not fetch related product",
      status: 500,
    });
  }
};
