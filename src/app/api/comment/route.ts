import { auth } from "@/static-data/auth";
import prisma from "@/static-data/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const session = await auth();
    if (!session) {
      return NextResponse.json({
        message: "login to create comment",
        status: 500,
      });
    }
    const { message, userId, productId, rating: commentRating } = body;
    if (!message || !userId || !productId || !commentRating) {
      return NextResponse.json({
        message: "Missing required fields",
        status: 400,
      });
    }
    const createdComment = await prisma.rating.create({
      data: {
        productId,
        userId,
        comment: message,
        value: parseInt(commentRating),
      },
    });
    return NextResponse.json({
      message: "comment created",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "kindly, login to comment",
      status: 500,
    });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const productId = req.nextUrl.searchParams.get("productId") as string;
    const createdComment = await prisma.rating.findMany({
      where: {
        productId,
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
      orderBy: {
        createdAt: "asc",
      },
    });
    const ratings = createdComment.map((r) => r.value);
    const averageRating =
      ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length || 0;

    return NextResponse.json({
      createdComment: createdComment.slice(0, 10),
      averageRating,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "can not get comment",
      status: 500,
    });
  }
};
