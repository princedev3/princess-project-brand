import { NextRequest, NextResponse } from "next/server";
import { v2 as cloud } from "cloudinary";
import streamifier from "streamifier";
import prisma from "@/static-data/prisma";
import bcrypt from "bcryptjs";
import { generateVerificationtokenbyemail } from "@/action/generate-token-action-by-email";
import { sendVerificationEmail } from "@/action/send-emails";

cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});
export const POST = async (req: NextRequest) => {
  try {
    const formdata = await req.formData();
    const textArea: { [key: string]: string } = {};
    const imgFile: File[] = [];

    Array.from(formdata.entries()).forEach(([key, value]) => {
      if (typeof value === "string") {
        textArea[key] = value;
      } else if (value instanceof File) {
        if (key === "image" && value.size > 0) {
          imgFile.push(value);
        }
      }
    });
    const images: string[] = imgFile.length
      ? await Promise.all(
          imgFile.map(async (item) => {
            return new Promise(async (resolve, rejects) => {
              const bytes = Buffer.from(await item.arrayBuffer());
              const stream = cloud.uploader.upload_stream(
                { folder: "shop" },
                (error, result) => {
                  if (error) {
                    rejects(error);
                  } else {
                    resolve(result?.secure_url as string);
                  }
                }
              );
              streamifier.createReadStream(bytes).pipe(stream);
            });
          })
        )
      : [];
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(textArea.password, salt);
    const createdToken = await generateVerificationtokenbyemail(
      textArea?.email
    );
    const res = await sendVerificationEmail(
      createdToken.email,
      createdToken.token
    );

    const createdUser = await prisma.user.create({
      data: {
        ...textArea,
        password: hash,
        image: imgFile.length > 0 ? images[0] : "",
      },
    });

    return NextResponse.json({
      message: "kindly check your email",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not create user", status: 500 });
  }
};
