import { Post } from "@/lib/models/postSchema";
import { connectToDb } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(request:NextRequest, {params}:any) => {
    try {
        const {slug}  = params;
        connectToDb()
        console.log(params, 'at roadf')
        const post = await Post.findById(slug)
        return NextResponse.json(post)
    } catch (error) {
        return NextResponse.json({message: 'Error found at GET single post', error:error})
    }
}