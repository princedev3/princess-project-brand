import { NextRequest, NextResponse } from "next/server";
import { v2 as cloud } from "cloudinary";
import streamifier from "streamifier";
import { auth } from "@/static-data/auth";
import prisma from "@/static-data/prisma";

cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({
        message: "product not created/ only admin can create product",
        status: 500,
      });
    }
    const formdata = await req.formData();
    const colors = formdata.get("colors") as string;
    const brand = formdata.get("brand") as string;
    const name = formdata.get("name") as string;
    const size = formdata.get("size") as string;
    const desc = formdata.get("desc") as string;
    const price = formdata.get("price") as string;
    const quantity = formdata.get("quantity") as string;
    const file = formdata.getAll("image") as File[];

    const images: string[] = file.length
      ? await Promise.all(
          file.map(async (item) => {
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
    await prisma.product.create({
      data: {
        name,
        desc,
        sizes: size.split(","),
        userId: session?.user?.id as string,
        price: Number(price),
        colors: JSON.parse(colors),
        quantity: Number(quantity),
        brand,
        images,
      },
    });

    return NextResponse.json({ message: "product created", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "product not created", status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const page = req.nextUrl.searchParams.get("page") as string;

    const POST_PER_PAGE = Number(process.env.POST_PER_PAGE) || 10;

    if (isNaN(parseInt(page)) || parseInt(page) < 1) {
      return NextResponse.json({ message: "Invalid page number", status: 400 });
    }
    const [allProducts, count] = await prisma.$transaction([
      prisma.product.findMany({
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (parseInt(page) - 1),
        orderBy: {
          createAt: "desc",
        },
      }),
      prisma.product.count(),
    ]);

    return NextResponse.json({ message: { allProducts, count }, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not get product", status: 500 });
  }
};
