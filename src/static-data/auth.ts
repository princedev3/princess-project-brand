import prisma from "./prisma";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { generateVerificationtokenbyemail } from "@/action/generate-token-action-by-email";
import { sendVerificationEmail } from "@/action/send-emails";
import { Adapter } from "next-auth/adapters";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as unknown as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (!user) return null;
          const { email, password } = credentials;

          if (!email || !password) {
            console.warn("Missing email or password");
            return null;
          }

          const isPasswordCorrect = await bcrypt.compare(
            password as string,
            user?.password as string
          );

          if (!isPasswordCorrect) {
            console.log("Incorrect password for user:", email);
            return null;
          }

          if (!user.emailVerified) {
            const verifyToken = await generateVerificationtokenbyemail(
              email as string
            );
            await sendVerificationEmail(email as string, verifyToken.token);
            return null;
          }

          return user;
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Error in authorize callback:", error.message);
            return null;
          } else {
            console.error("Unexpected error:", error);
            return null;
          }
        }
      },
    }),
  ],
  pages: {
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
        });

        if (existingUser) {
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: "google",
                providerAccountId: account.providerAccountId,
              },
            },
            update: {},
            create: {
              userId: existingUser.id,
              provider: "google",
              providerAccountId: account.providerAccountId,
              type: account.type,
              access_token: account.access_token,
              expires_at: account.expires_at,
              id_token: account.id_token,
              scope: account.scope,
              token_type: account.token_type,
            },
          });
        } else {
          await prisma.user.create({
            data: {
              email: user.email as string,
              name: user.name || "New User",
              image: user.image as string,
              role: "USER",
              password: "",
              accounts: {
                create: {
                  provider: "google",
                  providerAccountId: account.providerAccountId,
                  type: account.type,
                  access_token: account.access_token,
                  expires_at: account.expires_at,
                  id_token: account.id_token,
                  scope: account.scope,
                  token_type: account.token_type,
                },
              },
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.email = user.email;
        token.id = user.id;
      } else if (!token.role && token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { role: true, id: true },
        });
        token.role = dbUser?.role || "USER";
        token.id = dbUser?.id as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.role) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 3,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 3,
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      },
    },
  },
  debug: process.env.NODE_ENV === "development",
});
