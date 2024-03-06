"use client"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const NavigationTestPage = () => {

  // CLIENT SIDE NAVIGATION
  const router = useRouter()
  const pathname = usePathname() // give only pathname
  const searchParams = useSearchParams() // give query in path

  const q = searchParams.get("q")// give query in path

  console.log(q)

  const handleClick = ()=>{
    console.log("clicked")
    router.forward()// move the route in front.
    router.back()// move backwards
    router.push('/about')// push new route to the stack.
    router.replace('/about') // go to new page and remove the current page from stack.
    router.refresh() // refresh the current page.
  }

  return (
    <div>
      <Link href="/" prefetch={false}>Click here</Link>
      <button onClick={handleClick}>Write and Redirect</button>
    </div>
  )
}

export default NavigationTestPage