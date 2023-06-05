import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const getGoogleCreds = () => {
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
        return {
            googleClient: process.env.GOOGLE_CLIENT_ID,
            googleSecret: process.env.GOOGLE_CLIENT_SECRET
        }
    } else {
        throw new Error("Google credentials not found");
    }
}

const {googleClient, googleSecret} = getGoogleCreds();

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: googleClient,
            clientSecret: googleSecret
        })
    ],
    pages: {
        signIn: "/auth",
    },
    callbacks: {
        session: async ({session}) => {
            let newUser = {id: ''};
            try {
                const user = session.user
                if (user){
                    newUser = await prisma.user.upsert({
                        where: { email: user?.email! },
                        create: user!,
                        update: {},
                    });
                }
            } catch (error) {
                console.log(error)
            } finally {
            return {...session, user: {...session.user, id: newUser?.id}} }
        }
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }