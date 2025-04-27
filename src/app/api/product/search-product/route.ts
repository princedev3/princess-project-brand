import prisma from "@/static-data/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export const GET = async (req: NextRequest) => {
  try {
    const page = req.nextUrl.searchParams.get("page") || "1";
    const search = req.nextUrl.searchParams.get("search") || "";
    // const brand = req.nextUrl.searchParams.get("brand") || "";
    const POST_PER_PAGE = Number(process.env.POST_PER_PAGE) || 20;
    if (isNaN(parseInt(page)) || parseInt(page) < 1) {
      return NextResponse.json({ message: "Invalid page number", status: 400 });
    }

    const whereCondition: Prisma.ProductWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { brand: { contains:search, mode: "insensitive" } },
          ],
        }
      : {};
    const [allProducts, count] = await prisma.$transaction([
      prisma.product.findMany({
        where: whereCondition,
        orderBy: {
          createAt: "desc",
        },
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (parseInt(page) - 1),
      }),
      prisma.product.count({
        where: whereCondition,
      }),
    ]);

    let isFallback = false;

    if (allProducts.length === 0 && search) {
      isFallback = true;
      let [allProducts, count] = await prisma.$transaction([
        prisma.product.findMany({
          orderBy: { createAt: "desc" },
          take: POST_PER_PAGE,
          skip: POST_PER_PAGE * (parseInt(page) - 1),
        }),
        prisma.product.count(),
      ]);
      return NextResponse.json({
        message: { allProducts, count, isFallback },
        status: 200,
      });
    }
    return NextResponse.json({ message: { allProducts, count }, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not get product", status: 500 });
  }
};
