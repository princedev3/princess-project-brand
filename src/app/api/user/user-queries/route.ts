import { auth } from "@/static-data/auth";
import prisma from "@/static-data/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ message: "can not get user", status: 500 });
    }
    const POST_PER_PAGE = Number(process.env.POST_PER_PAGE) || 10;
    const page = (req.nextUrl.searchParams.get("page") as string) || "1";
    const [allUser, count] = await prisma.$transaction([
      prisma.user.findMany({
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (parseInt(page) - 1),
      }),
      prisma.user.count(),
    ]);
    return NextResponse.json({ allUser, count, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not get user", status: 500 });
  }
};
