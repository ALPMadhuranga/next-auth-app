import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import User from "@/models/user"
import connect from  "@/utils/db";
import { signIn } from "next-auth/react";

export const authOptions = {

    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                await connect();
                try {
                    const user = await User.findOne({email: credentials?.email});
                    if(user) {
                        const isPasswordValid = await bcrypt.compare(
                            credentials.password,
                            user.password
                        )
                        if (isPasswordValid) {
                            return user;
                        }
                    }
                } catch (error) {
                    throw new Error(error);
                }
            }
        }),

        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        // ...add more providers here
    ],
    callbacks: {
        async signIn({user, account}) {
            if(account.provider === "credentials") {
                return true;
            }
            if(account.provider === "github") {
                await connect();
                try {
                    const existingUser = await User.findOne({email: user.email});
                    if(!existingUser) {
                        const newUser = new User({
                          email: user.email  
                        })
                        await newUser.save();
                        return true;
                    }
                    return true;
                } catch (error) {
                    console.log("Error saving user", error);
                    return false;
                }
            }
        }
    }
}

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };