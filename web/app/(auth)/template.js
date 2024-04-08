'use client'

import { useEffect } from 'react'
import { animatePageIn } from "@/lib/animations";
import Logo from '@/assets/SSN_White.svg'
import Image from 'next/image'

export default function Template({ children }) {

    useEffect(() => {
        animatePageIn()
    }, []);

    return (
        <>
            <div
                id="banner"
                className="flex items-center justify-center min-h-screen bg-primary z-10 absolute top-0 left-0 w-full"
            >
                <Image src={Logo} className='w-44 h-44 antialiased border-4 rounded-full p-2' alt="logo" />
            </div>
            {children}
        </>
    )
}
