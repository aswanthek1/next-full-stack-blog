import PostCard from '@/components/PostCard/PostCard'
import styles from './blog.module.css'
import { getPosts } from '@/lib/data'

const fetchData = async () => {
    try {
        const data = await fetch("http://localhost:3000/api/blog", { next: { revalidate: 3600 } })
        if (!data.ok) {
            throw new Error("Some thing went wrong!")
        }
        const resJson = await data.json()
        return resJson
    } catch (error) {
        console.log(error, 'error')
    }
}

const BlogPage = async () => {

    // fetch with an api
    const posts = await fetchData()

    // fetch without an api directly from db
    // const posts = await getPosts()

    return (
        <div className={styles.container}>
            {
                posts?.map((post: any) =>
                (
                    <div key={post.id} className={styles.post}>
                        <PostCard post={post} />
                    </div>
                )
                )
            }
        </div>
    )
}

export default BlogPage