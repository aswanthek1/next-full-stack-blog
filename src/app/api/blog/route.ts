import { Post } from "@/lib/models/postSchema";
import { connectToDb } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(request:NextRequest) => {
    try {
        connectToDb()
        const posts = await Post.find()
        return NextResponse.json(posts)
    } catch (error) {
        return NextResponse.json({message: 'Error found at GET posts', error:error})
    }
}