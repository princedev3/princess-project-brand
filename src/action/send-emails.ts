"use server";
import Mail from "nodemailer/lib/mailer";
import { createTransport } from "nodemailer";
import { render } from "@react-email/render";
import { VerifyEmailTemplate } from "@/emails/verify-email-template";

const transport = createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER as string,
    pass: process.env.NODEMAILER_PASS_KEY as string,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;
  
 // const htmlContent = await render(<VerifyEmailTemplate confirmLink={confirmLink} />);

//  const htmlContent = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//   <title>Verify Your Email</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       background-color: #f4f4f4;
//       margin: 0;
//       padding: 20px;
//     }

//     .container {
//       background-color: #ffffff;
//       padding: 40px;
//       border-radius: 8px;
//       max-width: 600px;
//       margin: 0 auto;
//     }

//     .text-center {
//       text-align: center;
//     }

//     .heading {
//       font-size: 24px;
//       font-weight: bold;
//       margin-bottom: 10px;
//     }

//     .message {
//       font-size: 16px;
//       margin-bottom: 20px;
//     }

//     .button {
//       display: inline-block;
//       background-color: #28a745;
//       color: #ffffff;
//       padding: 12px 20px;
//       font-size: 16px;
//       font-weight: bold;
//       border-radius: 5px;
//       text-decoration: none;
//       margin-top: 20px;
//     }

//     .social {
//       margin-top: 30px;
//       font-size: 14px;
//     }

//     .social a {
//       color: #007bff;
//       text-decoration: none;
//       margin: 0 5px;
//     }

//     .social a:hover {
//       text-decoration: underline;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="text-center">
//       <p class="heading">Verify your email address</p>
//       <p class="message">Click the button below to verify your email address:</p>
//       <a href="${confirmLink}" class="button">Verify Email</a>
//     </div>
//     <div class="text-center social">
//       <p>Follow us on:</p>
//       <p>
//         <a href="https://instagram.com" target="_blank">Instagram</a> |
//         <a href="https://facebook.com" target="_blank">Facebook</a> |
//         <a href="https://tiktok.com" target="_blank">TikTok</a>
//       </p>
//     </div>
//   </div>
// </body>
// </html>
// `
  const mailOptions: Mail.Options = {
    from: `"luxuecollection" <${process.env.NODEMAILER_FROM_EMAIL}>`,
    to: email,
    subject: "Email Confirmation",
    html:`hello`,
  };
  try {
    const info = await transport.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
