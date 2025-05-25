import { Html, Head, Body, Container, Section, Text, Button ,Link} from "@react-email/components";
import * as React from "react";

interface VerificationEmailProps {
  confirmLink: string;
}

 export const VerifyEmailTemplate = ({ confirmLink }: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f4", margin: "0", padding: "20px" }}>
        <Container style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "8px", maxWidth: "600px", margin: "0 auto" }}>
          <Section style={{ textAlign: "center" }}>
            <Text style={{ fontSize: "24px", fontWeight: "bold" }}>Verify your email address</Text>
            <Text>Click the button below to verify your email address:</Text>
            <Link
              href={confirmLink}
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                padding: "12px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "5px",
                textDecoration: "none",
                marginTop: "20px",
              }}
            >
              Verify Email
            </Link>
          </Section>
          <Section style={{ textAlign: "center", marginTop: "30px" }}>
            <Text>Follow us on:</Text>
            <Text>
              <a href="https://instagram.com" target="_blank">Instagram</a> | 
              <a href="https://facebook.com" target="_blank"> Facebook</a> | 
              <a href="https://tiktok.com" target="_blank"> TikTok</a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};


