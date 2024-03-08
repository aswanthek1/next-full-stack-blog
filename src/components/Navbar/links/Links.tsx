"use client"

import styles from "./links.module.css";
import Navlink from "./navlink/Navlink";
import { useEffect, useState } from "react";
import Image from "next/image";
import { handleLogout } from "@/lib/actions";
import { usePathname } from "next/navigation";

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
  // {
  //   title: "Admin",
  //   path: "/admin",
  // },
];
const Links = ({ session }: any) => {
  console.log(session, 'session')
  const [open, setOpen] = useState(false)
  const location = usePathname()
  // TEMPORARY
  // const session = true;
  // const isAdmin = true;

  const handleOpen = () => {
    setOpen(!open)
  }

  useEffect(() => {
    setOpen(false)
  },[location])

  // useEffect(() => {
  //   const navLinks = document.getElementById('navlinks')
  //     if(navLinks?.style.height > '400') {
  //       navLinks?.classList?.add(styles.closed)
  //       navLinks?.classList?.remove(styles.open)
  //     }
  //     else {
  //       navLinks?.classList?.add(styles.open)
  //       navLinks?.classList?.remove(styles.closed)
  //     }
  // },[open])

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link: { title: string, path: string }) => (
          <Navlink item={link} key={link.path} />
        ))}
        {session?.user ? (
          <>
            {session?.user?.isAdmin && <Navlink item={{ title: "Admin", path: "/admin" }} />}
            <form action={handleLogout}>
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
        open && <div id="navlinks" className={`${styles.mobileLinks} ${styles.open}`} >
          {
            links.map((link) => (
              <Navlink item={link} key={link.path} />
            ))
          }
          {session?.user ? (
            <>
              {session?.user?.isAdmin && <Navlink item={{ title: "Admin", path: "/admin" }} />}
              <form action={handleLogout}>
                <button className={styles.logout}>Logout</button>
              </form>
            </>
          ) : (
            <Navlink item={{ title: "Login", path: "/login" }} />
          )}
        </div>
      }
    </div>
  )
}

export default Links;