import { Post } from "./models/postSchema"
import { User } from "./models/userSchema";
import { connectToDb } from "./utils"
import { unstable_noStore as noStore } from "next/cache";// for removing cache

export const getPosts = async() => {
    try {
        connectToDb()
        const posts = await Post.find();
        return posts
    } catch (error:any) {
        throw new Error('Error at finding posts', error)
    }
}

export const getPost = async(id:string) => {
    try {
        connectToDb()
        console.log(id, 'iddddd')
        const post = await Post.findById(id);
        return post
    } catch (error:any) {
        console.log(error)
        throw new Error('Error at finding single post', error)
    }
}

export const getUser = async(id:string) => {
    try {
        noStore()
        connectToDb()
        const user = await User.findById(id);
        return user
    } catch (error:any) {
        throw new Error('Error at finding single user', error)
    }
}

export const getUsers = async() => {
    try {
        connectToDb()
        const users = await User.find();
        return users
    } catch (error:any) {
        throw new Error('Error at finding users', error)
    }
}