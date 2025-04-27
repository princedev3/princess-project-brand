import { NextRequest, NextResponse } from "next/server";
import prisma from "@/static-data/prisma";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    const { password, email } = await req.json();
    const findExistingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!findExistingUser) {
      return NextResponse.json({ message: "can not find user", status: 500 });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hash,
      },
    });

    return NextResponse.json({
      message: "password update",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not find user", status: 500 });
  }
};
