import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { logInSchema } from '@/schemas/logInSchema'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: 'email',
          label: 'Email',
        },
        password: {
          type: 'password',
          label: 'Password',
        },
      },
      authorize: async (credentials) => {
        const { email, password } = await logInSchema.parse(credentials)

        const user = await prisma.user.findUnique({
          where: { email },
        })

        if (!user) {
          return null
        }

        const passwordValid = await bcrypt.compare(password, user.password)

        if (!passwordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
})
