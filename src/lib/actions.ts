"use server"

import { revalidatePath } from "next/cache"
import { Post } from "./models/postSchema"
import { signIn, signOut } from "./auth"
import { connectToDb } from "./utils"
import { User } from "./models/userSchema"
import bcrypt from 'bcryptjs'


// blog actions
export const addPost = async (previouseState, formData: any) => {
    try {
        const { title, slug, desc, userId, img } = Object.fromEntries(formData)
        connectToDb()
        const newPost = new Post({ title, slug, desc, userId, img })
        await newPost.save()
        revalidatePath('/blog')// to remove cache
        revalidatePath('/admin')
    } catch (error: any) {
        console.log(error)
        throw new Error('Error at add post', error)
    }
}

export const deletePost = async (formData: any) => {
    try {
        const { id } = Object.fromEntries(formData)
        connectToDb()
        await Post.findByIdAndDelete(id)
        revalidatePath('/blog')
        revalidatePath('/admin')
    } catch (error: any) {
        console.log(error)
        throw new Error('Error at delete post', error)
    }
}


// user actions

export const addUser = async (previouseState, formData: any) => {
    try {
        const { username, email, password, img } = Object.fromEntries(formData)
        connectToDb()
        const newUser = new User({ username, email, password, img })
        await newUser.save()
        revalidatePath('/admin')// to remove cache
    } catch (error: any) {
        console.log(error)
        throw new Error('Error at add user', error)
    }
}

export const deleteUser = async (formData: any) => {
    try {
        const { id } = Object.fromEntries(formData)
        connectToDb()
        await Post.deleteMany({ userId: id })
        await User.findByIdAndDelete(id)
        revalidatePath('/blog')
        revalidatePath('/admin')
    } catch (error: any) {
        console.log(error)
        throw new Error('Error at delete user', error)
    }
}

// auth actions

export const handleGithubLogin = async () => {
    await signIn("github")
}

export const handleLogout = async () => {
    await signOut()
}

export const register = async (previousState, formData: any) => {
    try {
        const { username, email, password, passwordRepeat, img } = Object.fromEntries(formData)
        if (password !== passwordRepeat) {
            return { error: 'Passwords doesnot match' }
        }

        connectToDb();
        const user = await User.findOne({ $or: [{ username }, { email }] })
        if (user) {
            return { error: 'Username or email already exists' }
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({ username, email, password: hashedPassword, img })
        await newUser.save()
        return { success: true }
    } catch (error) {
        console.log(error, 'error at register')
        return { error: 'Something went wrong!' }
    }
}

export const login = async (previousState, formData: any) => {
    try {
        const { username, password } = Object.fromEntries(formData)

        await signIn("credentials", { username, password })

    } catch (error) {
        // console.log(error, 'error at login in action')
        if (error?.message?.includes('CredentialsSignin') || error?.type === 'CredentialsSignin') {
            return { error: 'Invalid username or password!' }
        }
        // return {error: 'Something went wrong!'}
        throw error
    }
}