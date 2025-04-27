import prisma from "@/static-data/prisma";

export const generateResetPasswordToken = async (email: string) => {
  const existingVerificationToken = await prisma.passwordResetToken.findFirst({
    where: {
      email,
    },
  });

  if (existingVerificationToken) {
    await prisma.passwordResetToken.delete({
      where: {
        id: existingVerificationToken.id,
      },
    });
  }
  const expires = new Date(new Date().getTime() + 60 * 1000 * 10);
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i <= 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  const createToken = await prisma.passwordResetToken.create({
    data: {
      token: result,
      email: email,
      expires,
    },
  });
  return createToken;
};
