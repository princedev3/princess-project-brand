import { auth } from "@/static-data/auth";
import prisma from "@/static-data/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloud } from "cloudinary";
import streamifier from "streamifier";
type ParamType = {
  params: Promise<{ id: string }>;
};
cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

export const GET = async (req: NextRequest, { params }: ParamType) => {
  try {
    const { id } = await params;
    const getSingleFetch = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json({ getSingleFetch, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not get product", status: 500 });
  }
};
export const DELETE = async (req: NextRequest, { params }: ParamType) => {
  try {
    const { id } = await params;
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({
        message: "can not delete product",
        status: 500,
      });
    }
    const deleteSingleFetch = await prisma.product.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: "product deleted", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "can not delete product",
      status: 500,
    });
  }
};

export const PUT = async (req: NextRequest, { params }: ParamType) => {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({
        message: "product not created/ only admin can create product",
        status: 500,
      });
    }

    const { id } = await params;
    const cleanId = decodeURIComponent(id).replace(/^"|"$/g, "");

    const formdata = await req.formData();
    const rawColor = (formdata.get("newColor") as string) ?? "[]";
    const colors = JSON.parse(rawColor) as string[];

    const rawSize = (formdata.get("newSize") as string) ?? "[]";
    const sizes = JSON.parse(rawSize) as string[];

    const brand = formdata.get("brand") as string;
    const name = formdata.get("name") as string;
    const size = formdata.get("size") as string;
    const desc = formdata.get("desc") as string;
    const price = formdata.get("price") as string;
    const quantity = formdata.get("quantity") as string;

    const file = formdata.getAll("image") as File[];
    const rawImages = formdata.get("newImage") as string;
    const oldImages = JSON.parse(rawImages) as string[];
    const images: string[] = file.length
      ? await Promise.all(
          file
            .filter((item) => item.size > 0)
            .map(
              (item) =>
                new Promise<string>(async (resolve, reject) => {
                  const bytes = Buffer.from(await item.arrayBuffer());
                  const stream = cloud.uploader.upload_stream(
                    { folder: "shop" },
                    (error, result) => {
                      if (error) {
                        reject(error);
                      } else {
                        resolve(result?.secure_url as string);
                      }
                    }
                  );
                  streamifier.createReadStream(bytes).pipe(stream);
                })
            )
        )
      : [];

    await prisma.product.update({
      where: {
        id: cleanId,
      },
      data: {
        name,
        brand,
        desc,
        price: Number(price),
        quantity: Number(quantity),
        images: [...images, ...oldImages],
        colors: colors,
        sizes: [...new Set([...sizes, ...size.split(",")])].filter(
          (item) => item !== ""
        ),
        userId: session.user.id as string,
      },
    });

    return NextResponse.json({ message: "product updated", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "can not update product",
      status: 500,
    });
  }
};
