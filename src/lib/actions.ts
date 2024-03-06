"use server"

import { revalidatePath } from "next/cache"
import { Post } from "./models/postSchema"

export const addPost = async (formData: any) => {
    try {
        const { title, slug, desc, userId } = Object.fromEntries(formData)

        const newPost = new Post({ title, slug, desc, userId })
        await newPost.save()
        console.log('Post saved to db')
        revalidatePath('/blog')// to remove cache
    } catch (error: any) {
        console.log(error)
        throw new Error('Error at add post', error)
    }
}

export const deletePost = async(formData:any) => {
        try {
            const {id} = Object.fromEntries(formData)
            await Post.findByIdAndDelete(id)
            console.log('blog deleted')
            revalidatePath('/blog')
        } catch (error:any) {
            console.log(error)
            throw new Error('Error at delete post', error)
        }
}