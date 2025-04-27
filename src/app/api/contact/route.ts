import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req: NextRequest) => {
  const { name, email, message } = await req.json();
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS_KEY,
      },
    });

    const res = await transporter.sendMail({
      from: `"Lolly Collection" <${process.env.NODEMAILER_FROM_EMAIL}>`,
      to: "lollycollectionfit@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ message: "Email sent", status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ message: "something went wrong", status: 500 });
  }
};
