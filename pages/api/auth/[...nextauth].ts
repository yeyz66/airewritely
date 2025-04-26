import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // Add other providers here if needed
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // Add database configuration here if you want to persist users
  // pages: {
  //   signIn: '/auth/signin', // Custom sign-in page
  // }
}) 