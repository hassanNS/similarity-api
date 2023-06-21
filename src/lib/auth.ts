import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";

// this function will always return strings unless error
function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || clientId.length === 0) {
    throw new Error('No clientId for google provider!')
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error('No clientId for google provider!')
  }

  return { clientId, clientSecret }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    // extracts lot of logic away from database, easier to scale, allows to validate using middleware (not like db), protect routes very easily
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret
    })
  ],
  callbacks: {
    async jwt({token, user}) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        }
      });

      if (!dbUser) {
        token.id = user!.id // ! is to let typescript know that user exists.
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image
      }
    },
    async session({session, token}) {
      if(token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    redirect() {
      return '/dashboard';
    }
  }
}