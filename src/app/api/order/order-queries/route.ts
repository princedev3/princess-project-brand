import { auth } from "@/static-data/auth";
import prisma from "@/static-data/prisma";
import { sendEmailWithPdf } from "@/utils/sendorderemailwithpdf";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();
    const body = await req.json();
    let userId = "";

    if (session) {
      userId = session.user?.id as string;
    }

    const createdOrder = await prisma.$transaction(async (tx) => {
      for (const item of body.product) {
        const product = await tx.product.findUnique({
          where: { id: item.id },
        });

        if (!product || product.quantity < item.quantity) {
          throw new Error(`Insufficient stock for product: ${item.name}`);
        }

        await tx.product.update({
          where: { id: item.id },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      const order = await tx.order.create({
        data: {
          product: body.product,
          amount: body.amount,
          useremail: body.email as string,
          orderAddress: body.orderAddress,
          userId,
          userPhone: body.phoneNumber,
          username: body.name as string,
          deliveryStatus: "one",
          paymentStatus: body.paymentStatus,
          payStackId: body.payStackId,
        },
      });

      return order;
    });

    if (createdOrder) {
      const res = await sendEmailWithPdf(createdOrder);
      console.log(res);
      return NextResponse.json({
        message: "Order created successfully",
        orderId: createdOrder.id,
        status: 200,
      });
    }
    return NextResponse.json({ message: " create order", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not create order", status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const page = req.nextUrl.searchParams.get("page") || "1";
    const search = req.nextUrl.searchParams.get("search") || "";
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({
        message: "can not create order",
        status: 500,
      });
    }
    const whereCondition: Prisma.OrderWhereInput = search
      ? {
          OR: [
            { useremail: { contains: search, mode: "insensitive" } },
            { payStackId: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};
    const POST_PER_PAGE = Number(process.env.POST_PER_PAGE);
    if (isNaN(parseInt(page)) || parseInt(page) < 1) {
      return NextResponse.json({ message: "Invalid page number", status: 400 });
    }

    const [allProducts, count] = await prisma.$transaction([
      prisma.order.findMany({
        where: whereCondition,
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (parseInt(page) - 1),
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.order.count(),
    ]);

    return NextResponse.json({ allOrders: allProducts, count, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not get all order", status: 500 });
  }
};
