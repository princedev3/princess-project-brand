import { NextRequest, NextResponse } from "next/server";
import prisma from "@/static-data/prisma";
import { generateResetPasswordToken } from "@/action/generate-reset-password-token";
import { sendResetEmail } from "@/action/send-reset-email";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    const findExistingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!findExistingUser) {
      return NextResponse.json({ message: "can not find user", status: 500 });
    }
    const generateResetToken = await generateResetPasswordToken(
      findExistingUser?.email as string
    );

    const res = await sendResetEmail(
      findExistingUser?.email as string,
      generateResetToken.token
    );

    return NextResponse.json({
      message: "kindly check your email",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error in finding user", status: 500 });
  }
};
