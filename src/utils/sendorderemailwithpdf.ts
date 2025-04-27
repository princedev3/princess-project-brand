import nodemailer from "nodemailer";
import fs from "fs/promises";
import { Order } from "@prisma/client";
import { generateOrderPdf } from "./generate-pdf";
import { cleanupTempFolder } from "./cleantemp";

export const sendEmailWithPdf = async (orderDetails: Order) => {
  try {
    const pdfPath = await generateOrderPdf(orderDetails);

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.NODEMAILER_USER as string,
        pass: process.env.NODEMAILER_PASS_KEY as string,
      },
    });

    const orderLink = `${process.env.BASE_URL_!}/order/${orderDetails.id}`;

    let subject = "Your Order Confirmation";
    let message = `<p>Thank you for your order! Your order details are attached.</p>`;

    if (orderDetails.deliveryStatus === "two") {
      subject = "🎉 Your Order Has Shipped!";
      message = `<p>Your order has been shipped and is on the way! Track it or view your receipt below.</p>`;
    } else if (orderDetails.deliveryStatus === "three") {
      subject = "✅ Order Delivered - Thank You!";
      message = `<p>We hope you're enjoying your purchase. Your order has been delivered successfully. You can view your receipt below.</p>`;
    }

    const mailOptions = {
      from: `"Lolly Collection" <${process.env.NODEMAILER_FROM_EMAIL}>`,
      to: orderDetails.useremail,
      subject,
      html: `
        <p>Hello ${orderDetails.username || orderDetails.useremail},</p>
        ${message}
        <p><a href="${orderLink}">Click here to view your order</a></p>
      `,
      attachments: [
        {
          filename: `order-${orderDetails.id}.pdf`,
          path: pdfPath,
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    await fs.unlink(pdfPath);
    console.log("🧹 Temporary PDF deleted");
    return "send";
  } catch (error) {
    console.error("❌ Error sending email:", error);
  } finally {
    await cleanupTempFolder();
  }
};
