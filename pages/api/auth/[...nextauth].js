import nextAuth, { NextAuthOptions } from "next-auth";
import { getToken } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials"

const authOpts = {
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user
            }
            return token;
          },
        session: ({ session, token }) => {
            if (token) {
                session.user  = token.user
                session.id = token.id;
            }
            return session;
        },
        redirect: ({ url }) => {
            return url
        }
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize (credentials, req) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                  })
                  const { data: { user } } = await res.json()
                  if (user && res.ok) {
                    return user
                  }
                  return null
            }
        })
    ],
    pages: {
        signIn: "/account?login=true"
    }
}
export default nextAuth(authOpts)