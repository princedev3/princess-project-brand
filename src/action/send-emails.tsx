"use server";
import Mail from "nodemailer/lib/mailer";
import { render } from "@react-email/render";
import { VerifyEmailTemplate } from "@/emails/verify-email-template";
import nodemailer from "nodemailer"; 

  const transport = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.NODEMAILER_USER as string,
        pass: process.env.NODEMAILER_PASS_KEY as string,
      },
    });

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;
  
 const htmlContent = await render(<VerifyEmailTemplate confirmLink={confirmLink} />);


  const mailOptions: Mail.Options = {
    from: `"Luxue Collection" <${process.env.NODEMAILER_FROM_EMAIL}>`,
    to: email,
    subject:"Confirmation from luxue",
    html:htmlContent,
  };
  try {
    const info = await transport.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
