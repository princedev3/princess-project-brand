"use server";
import Mail from "nodemailer/lib/mailer";
import { createTransport } from "nodemailer";

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
  const mailOptions: Mail.Options = {
    from: `"Lolly Collection" <${process.env.NODEMAILER_FROM_EMAIL}>`,
    to: email,
    subject: "Reset Password Email Confirmation",
    html: `
    <html>
      <head>
        <style>
          /* Inline styles for the email */
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin:  auto;
            background-color: #ffffff;

            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
          }
          .header img {
            display: block;
            width: 60px;
            height: 60px;
            margin: 0 auto;
          }
          h1 {
            font-size: 24px;
            font-weight: 600;
            text-align: center;
          }
          p {
            font-size: 16px;
            line-height: 1.5;
            text-align: center;
          }
          .btn {
            display: block;
            width: 100%;
            text-align: center;
            background-color: #28a745;
            color: #fff;
            padding: 12px 20px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
            text-decoration: none;
            margin: 10px 0;
          }
          .btn a {
            color: inherit;
            text-decoration: none;
            display: inline-block;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
          }
          .social-links {
            display: inline-block;
            text-align: center;
          }
          .social-links a {
            margin: 0 10px;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Verify your email address</h1>
          <p>Kindly click the link below to verify your email</p>
          <div class="btn">
            <a href="${confirmLink}"> Reset Password Here</a>
          </div>

          <div class="footer">
            <p>Follow us on</p>
            <div class="social-links">
           <a href="https://www.instagram.com/ashabiade_ope/profilecard/?igsh=MXg0ZTZld3NqbnN6ag==" target="_blank">Instagram</a>
              <a  href="https://www.facebook.com/share/17n56qzU3S/?mibextid=wwXIfr" target="_blank">Facebook</a>
              <a  href="https://www.tiktok.com/@lollys.collection7" target="_blank">Tiktok</a>
            </div>
          </div>
        </div>
      </body>
    </html>

      `,
  };
  try {
    const info = await transport.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
