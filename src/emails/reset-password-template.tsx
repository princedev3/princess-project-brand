import { Html, Head, Body, Container, Section, Text, Link } from "@react-email/components";
import * as React from "react";

interface VerifyEmailProps {
  confirmLink: string;
}

export const ResetPasswrodTemplate = ({ confirmLink }: VerifyEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f4", margin: "0", padding: "20px" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "40px", borderRadius: "8px", maxWidth: "600px", margin: "0 auto", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          <Section style={{ textAlign: "center" }}>
            <Text style={{ fontSize: "24px", fontWeight: "600", color: "#333" }}>
              Verify your email address
            </Text>
            <Text style={{textAlign:"center", fontSize: "16px", lineHeight: "1.5", color: "#555" }}>
              Kindly click the button below to verify your email and complete your reset password process.
            </Text>
            <Link
              href={confirmLink}
              style={{
                backgroundColor: "#28a745",
                color: "#ffffff",
                padding: "12px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "5px",
                textDecoration: "none",
                marginTop: "20px",
                display: "inline-block",
              }}
            >
              Reset Password
            </Link>
          </Section>

          <Section style={{ textAlign: "center", marginTop: "40px" }}>
            <Text style={{ fontSize: "14px", color: "#777" }}>
              Follow us on:
            </Text>
            <Text style={{ fontSize: "14px", color: "#1a0dab" }}>
              <a href="https://www.instagram.com/ashabiade_ope/profilecard/?igsh=MXg0ZTZld3NqbnN6ag==" target="_blank" style={{ marginRight: "10px", textDecoration: "underline" }}>
                Instagram
              </a>
              |
              <a href="https://www.facebook.com/share/17n56qzU3S/?mibextid=wwXIfr" target="_blank" style={{ margin: "0 10px", textDecoration: "underline" }}>
                Facebook
              </a>
              |
              <a href="https://www.tiktok.com/@lollys.collection7" target="_blank" style={{ marginLeft: "10px", textDecoration: "underline" }}>
                TikTok
              </a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
