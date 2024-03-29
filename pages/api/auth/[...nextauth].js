import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getToken } from "next-auth/jwt";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  pages: {
    signIn: "/auth/signin",
  },
  debug:process.env.NODE_ENV==='development',
  session:{
    strategy:'jwt'
  },
  secret:process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session?.user?.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();
      session.user.uid = token?.sub;
      return session;
    },
  },
});
//   theme:{
//     logo:"https://papareact.com/sq0",
//     brandColor:"#F13287",
//     colorScheme:"auto"
//   }
