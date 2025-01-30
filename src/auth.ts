import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { db } from "./db";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string;
        const password = credentials.password as string;

        console.log(credentials);

        if (!email || !password) {
          throw new CredentialsSignin({
            cause: "Please provide all credentials",
          });
        }

        const user = await db.user.findUnique({
          where: {
            email: email,
          },
        });

        console.log(user);

        if (!user?.email) {
          throw new CredentialsSignin({ cause: "Invalid email or password!" });
        }

        if (!user.password) {
          throw new CredentialsSignin({ cause: "Invalid email or password!" });
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
          console.log("invalid");
          throw new CredentialsSignin({ cause: "Invalid email or password!" });
        }

        const userData = {
          name: user.name,
          email: user.email,
          password: user.password,
        };

        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "credentials") {
        return true;
      }

      if (account?.provider === "google") {
        try {
          const { id, name, email } = user;
          const existingUser = await db.user.findUnique({
            where: {
              email: email!,
            },
          });

          if (!existingUser)
            await db.user.create({
              data: {
                email: email!,
                name: name!,
                googleId: id,
              },
            });
          return true;
        } catch (error) {
          throw new AuthError("error creating user");
        }
      }
      return false;
    },
  },
});
