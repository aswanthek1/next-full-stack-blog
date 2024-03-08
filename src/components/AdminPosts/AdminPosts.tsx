import { getPosts } from "@/lib/data";
import styles from "./adminPosts.module.css";
import Image from "next/image";
import { deletePost } from "@/lib/actions";
import TableButton from "../TableButton/TableButton";

const AdminPosts = async () => {
  const posts = await getPosts();
  const handleButtonClicked = async(id:string) => {
    "use server"
    await deletePost(id)
  }
  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <div className={styles.detail}>
            <Image
              src={post.img || "/noAvatar.png"}
              alt=""
              width={50}
              height={50}
            />
            <span className={styles.postTitle}>{post.title}</span>
          </div>
          <TableButton id={post.id} handleButtonClicked={handleButtonClicked} />
        </div>
      ))}
    </div>
  );
};

export default AdminPosts;