import Image from "next/image";
import styles from "./singlePost.module.css";
import PostUser from "@/components/PostUser/PostUser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";
import { config } from '@/config/config'

const {API_BASE_URL} = config

const fetchData = async (slug: number | string) => {
  try {
    const data = await fetch(`${API_BASE_URL}blog/${slug}`)
    if (!data.ok) {
      throw new Error("Some thing went wrong!")
    }
    const resJson = await data.json()
    return resJson
  } catch (error) {
    console.log(error, 'error is herer')
  }
}

export const generateMetadata = async ({ params }: any) => {
  const { slug } = params
  const blog = await getPost(slug)

  return {
    title: blog?.title,
    description: blog?.desc
  }
}

const SinglePostPage = async ({ params, searchParams }: any) => {
  // params will give param like id
  // searchParams will give query params
  const { slug } = params

  // fetch post from api
  const blog = await fetchData(slug)
console.log(blog, 'blog is in page')
  // get post without api
  // const blog = await getPost(slug)

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src={blog?.img} alt="" fill className={styles.img} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{blog?.title}</h1>
        <div className={styles.detail}>
          <Suspense fallback={<p>Loading...</p>} >
            <PostUser userId={blog?.userId} />
          </Suspense>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>{blog?.createdAt?.toString().slice(0, 16)}</span>
          </div>
        </div>
        <div className={styles.content}>{blog?.desc}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;