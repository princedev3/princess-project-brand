import { auth } from "@/static-data/auth";
import prisma from "@/static-data/prisma";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";


export const POST = async (req: NextRequest) => {
  try {
    const session= await auth()
    if(session?.user?.role !== "ADMIN"){
  return NextResponse.json({
      message: "only admin is allowed",
      status: 500,
    });
    }
    const {title,message} = await req.json();
const unsubscribeUrl = `${process.env.BASE_URL_}/unsubscribe`
    const existingSubcriber = await prisma.newsletterSubscriber.findMany();
   const allEmails = existingSubcriber.map(item=>item.email)
  

    const transporter = nodemailer.createTransport({
          host: "smtp-relay.brevo.com",
          port: 587,
          auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS_KEY,
          },
        });
    
        const res = await transporter.sendMail({
          from: `"Luxue Collection" <${process.env.NODEMAILER_FROM_EMAIL}>`,
          to: allEmails,
          subject: "Newsletter from  Luxue collection",
          html:  `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Newsletter</title>
  </head>
  <body style="background-color: #f4f4f4; padding: 20px; margin: 0;">
    <div style="background-color: #ffffff; padding: 40px; border-radius: 8px; max-width: 600px; margin: auto;">
      <h2 style="color: #111827; margin-top: 0;">${title}</h2>
      <p style="font-size: 16px; color: #374151;">${message}</p>
      <p style="font-size: 12px; color: #9CA3AF; margin-top: 40px;">
        You're receiving this email because you're subscribed to Luxue Collection.
      </p>
      <p style="font-size: 12px; color: #9CA3AF;">
        If you wish to unsubscribe, you can do so at any time by clicking 
        <a href="${unsubscribeUrl}" style="color: #3b82f6; text-decoration: underline;">here</a>.
      </p>
    </div>
  </body>
</html>
`,
        });
    
    return NextResponse.json({
      message: "email sent to all.",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "can not suscribe to newsletter",
      status: 500,
    });
  }
};

