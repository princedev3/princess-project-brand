import { auth } from "@/static-data/auth";
import prisma from "@/static-data/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const session = await auth();
    if (!session) {
      return NextResponse.json({
        message: "login to create coupon",
        status: 500,
      });
    }
    const existingCoupon = await prisma.coupon.findMany();
    if (existingCoupon.length > 0) {
      return NextResponse.json({
        message: "can not create coupon",
        status: 500,
      });
    }

    const createdCoupon = await prisma.coupon.create({
      data: {
        expiryDate: new Date(Date.now() + body.duration * 1000 * 60 * 60 * 24),
        ...body,
      },
    });

    return NextResponse.json({
      message: "coupon created",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "can not create coupon",
      status: 500,
    });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const existingCoupon = await prisma.coupon.findMany();

    return NextResponse.json({
      existingCoupon: existingCoupon[0],
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
