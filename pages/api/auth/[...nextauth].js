import { verifyPassword } from '@/helper/auth';
import { connectToDatabase } from '@/helper/db';
import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';


export default NextAuth({
    // session: {
    //     jwt: true
    // },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'credentials',
            async authorize(credentials) {
                //Connect to DB
                const client = await connectToDatabase();
                
                const userCollection = client.db().collection('users');
                const user = await userCollection.findOne({ email: credentials.email })
                if (!user) {
                    client.close()
                    throw new Error('No user Found')
               
                    //here we can redirect to another page
                }
                const isValid = await verifyPassword(credentials.password, user.password); // credentials.password is the password that user tries to login
                if (!isValid) {
                    client.close();
                    throw new Error('Could not log you in !')
                }
                client.close()
                return { email: user.email }
            }
        })
    ]
})