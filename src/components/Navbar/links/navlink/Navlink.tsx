"use client"

import Link from "next/link";
import styles from "./navlink.module.css";
import { usePathname } from "next/navigation";

const Navlink = ({item}:{item:{title:string, path:string}}) => {
    const pathname = usePathname()
    return (
        <Link
            href={item.path}
            className={`${styles.container} ${pathname === item.path && styles.active}`}
        >
            {item.title}
        </Link>
    )
}

export default Navlink;