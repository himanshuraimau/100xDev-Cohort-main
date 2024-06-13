import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: { label: 'email', type: 'text', placeholder: '' },
          password: { label: 'password', type: 'password', placeholder: '' },
        },
        async authorize(credentials: any) {
            
            return {
                id: "user1",
                name:"himanshu",
                gmail:"himanshurai1@gmail.com",
            };
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID || "",
        clientSecret: process.env.CLIENT_SECRET || ""
      
      })
  ],
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }