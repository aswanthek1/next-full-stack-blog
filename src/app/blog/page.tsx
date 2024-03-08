import PostCard from '@/components/PostCard/PostCard'
import styles from './blog.module.css'
import { getPosts } from '@/lib/data'
import { config } from '@/config/config'

const {API_BASE_URL} = config

const fetchData = async () => {
    try {
        const data = await fetch(`${API_BASE_URL}blog`, { next: { revalidate: 3600 } })
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
                    <div key={post._id} className={styles.post}>
                        <PostCard post={post} />
                    </div>
                )
                )
            }
        </div>
    )
}

export default BlogPage