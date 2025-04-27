import { auth } from "@/static-data/auth";
import prisma from "@/static-data/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({
        message: "can not get liked",
        status: 500,
      });
    }
    const productLikes = await prisma.userLikesProduct.findMany({
      where: {
        userId: session.user?.id,
      },
      include: { product: true },
    });
    const allLikedProduct = productLikes?.map((item) => item.product);
    return NextResponse.json({
      message: allLikedProduct,
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
