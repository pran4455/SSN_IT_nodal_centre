'use client'

import Image from 'next/image'
import Logo from '@/assets/logo.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import NavUser from './NavUser'
import { cn } from '@/lib/utils';

export const NAVBAR_ROUTES = [
    {
        label: 'Overview',
        url: '/dashboard'
    },
    {
        label: 'Supervisors',
        url: '/dashboard/supervisors'
    },
    {
        label: 'Scholars',
        url: '/dashboard/scholars'
    }
]

export default function Navbar({ user }) {
    const pathname = usePathname();

    return (
        <nav className="border-b border-b-foreground/10">
            <div className='content-container flex justify-between items-center h-16'>
                <Link href="/">
                    <Image src={Logo} className='w-16 antialiased' alt="logo" />
                </Link>

                {user &&
                    <ul className="flex flex-1 justify-start text-xs mx-8">
                        {NAVBAR_ROUTES.map((route, index) => {
                            const isCurrentRoute = route.url === pathname
                            return (
                                <li key={index}>
                                    <Link href={route.url}
                                        className={cn("flex items-center font-medium px-2 py-1 mx-2 rounded-sm",
                                            isCurrentRoute && 'text-white bg-primary'
                                        )}
                                    >
                                        {route.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                }

                {/* <AuthButton /> */}
                <NavUser user={user} />
            </div>
        </nav >
    )
}
