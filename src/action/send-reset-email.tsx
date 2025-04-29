"use server";
import Mail from "nodemailer/lib/mailer";
import { createTransport } from "nodemailer";
import { ResetPasswrodTemplate } from "@/emails/reset-password-template";
import { render } from "@react-email/render";

const transport = createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER as string,
    pass: process.env.NODEMAILER_PASS_KEY as string,
  },
});

export const sendResetEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.BASE_URL_!}/forgot-password?token=${token}`;
  const htmlContent = await render(< ResetPasswrodTemplate confirmLink={confirmLink} />);
  const mailOptions: Mail.Options = {
    from: `"Luxue Collection" <${process.env.NODEMAILER_FROM_EMAIL}>`,
    to: email,
    subject: "Reset Password Email Confirmation",
    html:  htmlContent,
  };
  try {
    const info = await transport.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
