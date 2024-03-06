"use client"

import Link from "next/link";
import styles from "./links.module.css";
import Navlink from "./navlink/Navlink";
import { useState } from "react";
import Image from "next/image";

const links = [
  {
    title: "Homepage",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];
const Links = () => {

  const [open, setOpen] = useState(false)

  // TEMPORARY
  const session = true;
  const isAdmin = true;

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link: { title: string, path: string }) => (
          <Navlink item={link} key={link.path} />
        ))}
         {session ? (
          <>
            {isAdmin && <Navlink item={{ title: "Admin", path: "/admin" }} />}
            <form>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <Navlink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      {/* <button className={styles.menuButton} onClick={handleOpen}>Menu</button> */}
      <Image 
        className={styles.menuButton}
        onClick={handleOpen}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
      />
      {
        open && <div className={styles.mobileLinks} >
          {
            links.map((link) => (
              <Navlink item={link} key={link.path} />
            ))
          }
        </div>
      }
    </div>
  )
}

export default Links;