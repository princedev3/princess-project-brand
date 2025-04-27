import { NextRequest, NextResponse } from "next/server";
import { v2 as cloud } from "cloudinary";
import streamifier from "streamifier";
import prisma from "@/static-data/prisma";
import bcrypt from "bcryptjs";
import { generateVerificationtokenbyemail } from "@/action/generate-token-action-by-email";
import { sendVerificationEmail } from "@/action/send-emails";
import { generateResetPasswordToken } from "@/action/generate-reset-password-token";

export const POST = async (req: NextRequest) => {
  try {
    const { token } = await req.json();

    const findExistingToken = await prisma.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
    if (!findExistingToken || findExistingToken.expires < new Date()) {
      return NextResponse.json({ message: "Cannot reset token", status: 400 });
    }

    const findExistingUser = await prisma.user.findUnique({
      where: {
        email: findExistingToken?.email,
      },
    });

    if (!findExistingUser) {
      return NextResponse.json({ message: "can not find user", status: 500 });
    }

    await prisma.passwordResetToken.delete({
      where: {
        email: findExistingToken.email,
        token,
      },
    });
    return NextResponse.json({
      email: findExistingToken.email,
      message: "checked",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not find user", status: 500 });
  }
};
