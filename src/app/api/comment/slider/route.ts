import prisma from "@/static-data/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const POST_PER_PAGE = Number(process.env.POST_PER_PAGE) || 10;
    const sliderComment = await prisma.rating.findMany({
      take: POST_PER_PAGE,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    return NextResponse.json({
      sliderComment,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "can not get slider comment",
      status: 500,
    });
  }
};
