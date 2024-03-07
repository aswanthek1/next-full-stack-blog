import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { connectToDb } from "./utils"
import { User } from "./models/userSchema"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import { authConfig } from "./auth.config";


const login = async(data:any) => {
    try {
        connectToDb()
        const user = await User.findOne({username:data?.username})
        if(!user) {
            throw new Error('Invalid credientials')
        }
        const isPasswordCorrect = await bcrypt.compare(data.password, user?.password)
        if(!isPasswordCorrect) {
            throw new Error('Invalid credientials')
        }

        return user;

    } catch (error) {
        console.log(error)
        throw new Error('Error at login')   
    }
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials)
                    console.log(user, 'logged in user')
                    return user
                } catch (error) {
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === 'github') {
                connectToDb();
                try {
                    const userData = await User.findOne({ email: profile?.email })
                    if (!userData) {
                        const newUser = new User({ username: profile?.login, email: profile?.email, img: profile?.avatar_url })
                        await newUser.save()
                    }
                    return true
                } catch (error) {
                    console.log(error, 'error at login callback')
                    return false
                }
            }
            return true
        },
        ...authConfig.callbacks
    }
})