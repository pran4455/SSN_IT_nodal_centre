'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, GraduationCap, Users, Settings, ChevronRight, ScrollText } from 'lucide-react';

import useToggleState from '@/hooks/useTogleState';
import { Button } from './ui/button';

export const NAVBAR_ROUTES = [
    {
        label: 'Overview',
        url: '/dashboard',
        icon: Home
    },
    {
        label: 'Supervisors',
        url: '/dashboard/supervisors',
        icon: GraduationCap
    },
    {
        label: 'Scholars',
        url: '/dashboard/scholars',
        icon: Users
    },
    {
        label: 'Settings',
        url: '/dashboard/settings',
        icon: Settings
    },
    {
        label: 'Logs',
        url: '/dashboard/logs',
        icon: ScrollText
    },

].map((n, idx) => ({ ...n, id: idx + 1 }));

export default function Sidebar() {
    const pathname = usePathname();
    const { state, toggle } = useToggleState()

    return (
        <nav className={cn(`bg-white sticky top-[56px] left-0 z-10 border-r border-primary/30 h-[calc(100vh-56px)]`, state && 'sm:w-[340px]')}>
            <ul className="flex flex-col gap-1 p-2 mt-2 justify-start font-medium text-md" >
                {NAVBAR_ROUTES.map((route, index) => {
                    const segmentSkipIndex = 2

                    const urlSegments = route.url.split('/').slice(segmentSkipIndex, undefined)
                    const pathnameSegments = pathname.split('/').slice(segmentSkipIndex, undefined)

                    const hasCommonElement = pathnameSegments.some(segment => urlSegments.includes(segment));
                    const isCurrentRoute = route.url === pathname || hasCommonElement
                    const Icon = route.icon

                    return (
                        <li key={index}>
                            <Link href={route.url}
                                className={cn("px-3 py-2 flex w-full gap-2 justify-start h-10 items-center rounded-sm transition duration-300 text-base hover:no-underline",
                                    isCurrentRoute ? "text-white bg-primary font-semibold hover:bg-primary" : "hover:bg-primary/10 "
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                {state &&
                                    <span className="hidden sm:block">
                                        {route.label}
                                    </span>
                                }
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <Button
                size="icon"
                className="hidden sm:flex absolute w-6 h-6 bottom-2/4 right-0 translate-x-3 rounded-full border-2 border-primary bg-white hover:bg-white hover:border-black group"
                onClick={toggle}
            >
                <ChevronRight className={cn("stroke-primary group-hover:stroke-black rotate-0 transition ease-in-out duration-300", state && "-rotate-180 ")} />
            </Button>
        </nav>
    )
}
