import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";
import { getServerSession } from "next-auth";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  debug: true,
};

export const getAuthSession = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log("No session found");
      return null;
    }
    console.log("Session found:", session);
    return {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
    };
  } catch (error) {
    console.error("Error retrieving session:", error);
    return null;
  }
};
