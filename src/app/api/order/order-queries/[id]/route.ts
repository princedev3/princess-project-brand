import { auth } from "@/static-data/auth";
import prisma from "@/static-data/prisma";
import { sendEmailWithPdf } from "@/utils/sendorderemailwithpdf";
import { NextRequest, NextResponse } from "next/server";

type ParamType = {
  params: Promise<{ id: string }>;
};
export const GET = async (req: NextRequest, { params }: ParamType) => {
  try {
    const { id } = await params;
    const fetchOrder = await prisma.order.findFirst({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: fetchOrder, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not get product", status: 500 });
  }
};
export const PUT = async (req: NextRequest, { params }: ParamType) => {
  try {
    const { id } = await params;
    const body = await req.json();
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({
        message: "can not update order",
        status: 500,
      });
    }
    const fetchOrder = await prisma.order.update({
      where: {
        id,
      },
      data: {
        deliveryStatus: body,
      },
    });
    await sendEmailWithPdf(fetchOrder);
    return NextResponse.json({ message: "order updated", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not get product", status: 500 });
  }
};
export const DELETE = async (req: NextRequest, { params }: ParamType) => {
  try {
    const { id } = await params;
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({
        message: "can not delete order",
        status: 500,
      });
    }
    const fetchOrder = await prisma.order.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "order deleted", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not get order", status: 500 });
  }
};
