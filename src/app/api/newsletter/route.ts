import prisma from "@/static-data/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const existingSubcriber = await prisma.newsletterSubscriber.findFirst({
      where: {
        email: body.email,
      },
    });
    if (existingSubcriber) {
      await prisma.newsletterSubscriber.delete({
        where:{
          id: existingSubcriber.id
        }
      })
      return NextResponse.json({
        message: "you have  unsubscribed to newsletter.",
        status: 200,
      });
    }
    const newsletterAction = await prisma.newsletterSubscriber.create({
      data: {
        email: body.email,
      },
    });
    return NextResponse.json({
      message: "Thank you for subscribing.",
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
