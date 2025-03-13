import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import { connectToDatabase } from "@/lib/mongoose";

export const options = {
    providers: [
        GoogleProvider({
            profile: async (profile) => {
                try {
                    await connectToDatabase();

                    let userRole = "user";
                    if (profile?.email === "kariakistephen809@gmail.com") {
                        userRole = "admin";
                    }

                    // Check if user exists
                    let user = await User.findOne({ email: profile?.email }).exec();
                    if (!user) {
                        // Create new user

                        user = await User.create({
                            name: profile?.name,
                            email: profile?.email,
                            googleId: profile?.sub,
                            avatar: profile?.picture,
                            isVerified: true,
                            role: userRole,
                            provider: "google",
                        });
                    }
                    return {
                        ...profile,
                        id: user._id.toString(),
                        role: user.role,
                    };
                } catch (error) {
                    return null;
                }
            },
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user){
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
};