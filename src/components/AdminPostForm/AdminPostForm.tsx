"use client"

import { addPost } from "@/lib/actions";
import styles from "./adminPostForm.module.css";
import { useFormState } from "react-dom";

const AdminPostForm = ({userId}) => {
  const [state, formAction] = useFormState(addPost, null);
  
  return (
    <form action={formAction} key={state?.resetKey} className={styles.container}>
      <h1>Add New Post</h1>
      <input type="hidden" name="userId" value={userId} />
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="slug" placeholder="slug" />
      <input type="text" name="img" placeholder="img" />
      <textarea name="desc" placeholder="desc" rows={10} />
      <button type="submit">Add</button>
      {state?.error}
    </form>
  );
};

export default AdminPostForm;