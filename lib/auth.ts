import type { Session, User } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { prisma } from './db';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      if (!user.email) {
        return false;
      }
      const name = user.name;

      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          firstName: name?.split(' ')[0] || 'User',
          email: user.email,
        },
      });

      return true;
    },
    async session({ session }: { session: Session }) {
      if (!session?.user?.email) {
        return session;
      }

      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!dbUser) {
        return session;
      }
      return { expires: session.expires, user: dbUser };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
