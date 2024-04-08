'use client'
import { usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { animatePageOut } from "@/lib/animations"

export default function TransitionLink({ href, className, children }) {
    const router = useRouter()
    const pathname = usePathname()

    const handleClick = () => {
        if (pathname !== href) {
            animatePageOut(href, router)
        }
    }

    return (
        <Button
            variant="link"
            onClick={handleClick}
            className={className}
        >
            {children}
        </Button>
    )
}
