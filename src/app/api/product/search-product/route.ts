import prisma from "@/static-data/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  try {
    const page = req.nextUrl.searchParams.get("page") || "1";
    const search = req.nextUrl.searchParams.get("search") || "";
    const pageNumber = parseInt(page, 10);
    const POST_PER_PAGE = Number(process.env.POST_PER_PAGE) || 20;

    if (isNaN(pageNumber) || pageNumber < 1) {
      return NextResponse.json({ message: "Invalid page number", status: 400 });
    }

    const whereCondition: Prisma.ProductWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { brand: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const [allProducts, count] = await prisma.$transaction([
      prisma.product.findMany({
        where: whereCondition,
        orderBy: { createAt: "desc" },
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (pageNumber - 1),
      }),
      prisma.product.count({ where: whereCondition }),
    ]);

    return NextResponse.json({
      message: { allProducts, count, isFallback: false }, // always false now
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Can not get product", status: 500 });
  }
};
