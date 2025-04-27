import { auth } from "@/static-data/auth";
import prisma from "@/static-data/prisma";
import { NextRequest, NextResponse } from "next/server";

type UserType = {
  params: Promise<{ id: string }>;
};
export const DELETE = async (req: NextRequest, { params }: UserType) => {
  try {
    const { id } = await params;
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ message: "can not delete user", status: 500 });
    }

    await prisma.product.deleteMany({
      where: { userId: id },
    });

    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });
    console.log(deletedUser);
    return NextResponse.json({ message: "user deleted", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not delete user", status: 500 });
  }
};
export const PUT = async (req: NextRequest, { params }: UserType) => {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ message: "can not update user", status: 500 });
    }
    const body = await req.json();
    const { id } = await params;

    const deletedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: body.role,
      },
    });
    return NextResponse.json({ message: "user deleted", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not update user", status: 500 });
  }
};
