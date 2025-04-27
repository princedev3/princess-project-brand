import prisma from "@/static-data/prisma";
import { NextRequest, NextResponse } from "next/server";
type ParamType = {
  params: Promise<{ id: string }>;
};
export const DELETE = async (req: NextRequest, { params }: ParamType) => {
  try {
    const { id } = await params;
    const existingCoupon = await prisma.coupon.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "coupon deleted",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "can not get coupon",
      status: 500,
    });
  }
};
