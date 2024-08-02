import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";
import { getServerSession, NextAuthOptions } from "next-auth";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define the environment variables
const GOOGLE_ID = process.env.GOOGLE_ID!;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET!;
const GITHUB_ID = process.env.GITHUB_ID!;
const GITHUB_SECRET = process.env.GITHUB_SECRET!;

// Define authOptions with correct typing
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],
  debug: true
};

export const getAuthSession = async () => await getServerSession(authOptions);
