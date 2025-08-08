import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy-client-secret",
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Get allowed emails from environment variables
      const allowedEmails = process.env.ALLOWED_EMAILS?.split(',') || [];
      const allowedDomains = process.env.ALLOWED_DOMAINS?.split(',') || [];
      const blockedEmails = process.env.BLOCKED_EMAILS?.split(',') || [];
      
      // Check if email is blocked
      if (user.email && blockedEmails.includes(user.email)) {
        console.log(`Blocked email attempt: ${user.email}`);
        return false;
      }
      
      // Check if email is in allowed list
      if (user.email && allowedEmails.includes(user.email)) {
        console.log(`Allowed email: ${user.email}`);
        return true;
      }
      
      // Check if email domain is allowed
      const userDomain = user.email?.split('@')[1];
      if (userDomain && allowedDomains.includes(userDomain)) {
        console.log(`Allowed domain: ${userDomain}`);
        return true;
      }
      
      // If no restrictions are set, allow all emails
      if (allowedEmails.length === 0 && allowedDomains.length === 0) {
        return true;
      }
      
      // Default: deny access
      console.log(`Denied access for email: ${user.email}`);
      return false;
    },
    async jwt({ token, user }) {
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
