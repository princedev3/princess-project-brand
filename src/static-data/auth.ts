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
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
         
            return null;
          }

          const isPasswordCorrect = await bcrypt.compare(
            password as string,
            user?.password as string
          );

          if (!isPasswordCorrect) {
          
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
         
            return null;
          } else {
           
            return null;
          }
        }
      },
    }),
  ],
    secret: process.env.NEXTAUTH_SECRET,
  pages: {
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
          include: { accounts: true },  
        });
      
        if (existingUser) {
          const existingAccount = await prisma.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: 'google',
                providerAccountId: account.providerAccountId,
              },
            },
          });
      
          if (!existingAccount) {
            const sessionState = account.session_state ? String(account.session_state) : null;
         
            await prisma.account.create({
              data: {
                userId: existingUser.id as string,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token ?? null,
                refresh_token: account.refresh_token ?? null,
                expires_at: account.expires_at ?? null,
                token_type: account.token_type ?? null,
                scope: account.scope ?? null,
                id_token: account.id_token ?? null,
                session_state: sessionState as string,
                type: "oauth",
              },
            });
          }
        }
      }
      
      return true; 
      
    
    }
,    
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
