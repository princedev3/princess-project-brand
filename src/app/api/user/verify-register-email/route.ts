import { generateVerificationtokenbyemail } from "@/action/generate-token-action-by-email";
import { sendVerificationEmail } from "@/action/send-emails";
import prisma from "@/static-data/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { token } = await req.json();

    const existingToken = await prisma.verificationToken.findFirst({
      where: {
        token,
      },
    });
    if (!existingToken) {
      return NextResponse.json({
        message: "No token found",
        status: 500,
      });
    }
    const existingUser = await prisma.user.findFirst({
      where: {
        email: existingToken.email,
      },
    });
    if (!existingUser) {
      return NextResponse.json({
        message: "No user found",
        status: 500,
      });
    }
    if (new Date() > existingToken?.expires) {
      const newToken = await generateVerificationtokenbyemail(
        existingUser?.email as string
      );
      await sendVerificationEmail(
        existingUser?.email as string,
        newToken.token
      );
      return NextResponse.json({ message: "check email again", status: 200 });
    }
    await prisma.user.update({
      where: {
        id: existingUser?.id as string,
      },
      data: {
        emailVerified: new Date(),
      },
    });
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id as string,
      },
    });
    return NextResponse.json({ message: "email verified", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "fail to verify email", status: 500 });
  }
};
