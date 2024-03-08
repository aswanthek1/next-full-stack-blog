import { getUser } from '@/lib/data'
import styles from './postuser.module.css'
import Image from 'next/image'

// const fetchData = async (slug:number | string) => {
//     const data = await fetch(`https://jsonplaceholder.typicode.com/users/${slug}`, {cache:'no-store'})
//     if (!data.ok) {
//         throw new Error("Some thing went wrong!")
//     }
//     const resJson = await data.json()
//     return resJson
//   }

const PostUser = async ({ userId }: any) => {
    // const user = await fetchData(userId)
    console.log(userId, 'at post user')
    const user = await getUser(userId)
    return (
        <div className={styles.container}>
            <Image
                src={ user?.img ? user?.img : "/noavatar.png"} 
                alt=""
                width={50}
                height={50}
                className={styles.avatar}
            />
            <div className={styles.texts} >
                <span className={styles.title}>Author</span>
                <span className={styles.username}>{user?.username}</span>
            </div>
        </div>
    )
}

export default PostUser;