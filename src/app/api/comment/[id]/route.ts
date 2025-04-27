import { auth } from "@/static-data/auth";
import prisma from "@/static-data/prisma";
import { NextRequest, NextResponse } from "next/server";
type ParamType = {
  params: Promise<{ id: string }>;
};

export const DELETE = async (req: NextRequest, { params }: ParamType) => {
  try {
    const { id } = await params;
    const session = await auth();
    const userId = req.nextUrl.searchParams.get("userId") as string;
    if (!session) {
      return NextResponse.json({
        message: "can not delete comment",
        status: 500,
      });
    }
    if (session.user?.id !== userId && session.user?.role !== "ADMIN") {
      return NextResponse.json({
        message: "You are not authorized to delete this comment",
        status: 403,
      });
    }
    await prisma.rating.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      message: "comment deleted",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "can not delete comment",
      status: 500,
    });
  }
};
