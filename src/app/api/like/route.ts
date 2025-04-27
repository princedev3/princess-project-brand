import { auth } from "@/static-data/auth";
import prisma from "@/static-data/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();
    const body = await req.json();
    if (!session) {
      return NextResponse.json({
        message: "can not save like",
        status: 500,
      });
    }
    const existingLike = await prisma.userLikesProduct.findFirst({
      where: {
        productId: body.id,
        userId: body.userId,
      },
    });
    if (existingLike) {
      await prisma.userLikesProduct.delete({
        where: {
          id: existingLike.id,
        },
      });

      return NextResponse.json({
        message: "unliked",
        status: 200,
      });
    }
    const createdLike = await prisma.userLikesProduct.create({
      data: {
        productId: body.id,
        userId: body.userId,
      },
    });
    return NextResponse.json({
      message: "liked",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "can not suscribe to newsletter",
      status: 500,
    });
  }
};

export const GET = async () => {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({
        message: "can not get liked",
        status: 500,
      });
    }
    const existingLikes = await prisma.userLikesProduct.findMany({
      where: {
        userId: session.user?.id,
      },
      select: { productId: true },
    });

    const likedProductIds = existingLikes.map((like) => like.productId);
    return NextResponse.json({
      message: likedProductIds,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "can not suscribe to newsletter",
      status: 500,
    });
  }
};
