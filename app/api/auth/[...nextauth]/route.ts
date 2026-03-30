import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      try {
        await dbConnect();

        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
          console.log(`User logged in: ${user.email}`);
          return true;
        } else {
          console.log(`Access denied (not in the whitelist): ${user.email}`);
          return "/login?error=AccessDenied"; 
        }
      } catch (error) {
        console.error("Login error:", error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };