import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import Github from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../db/client";
import { JWT } from "next-auth/jwt";

// we will define `options` up next
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options: NextAuthOptions = {
    providers: [
        Github({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    callbacks: {
        session: async ({
            session,
            user
        }: {
            session: Session;
            user: User;
            token: JWT;
        }) => {
            session.userId = user.id;
            return Promise.resolve(session);
        }
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET
};
