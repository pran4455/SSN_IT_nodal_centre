import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link"
import { User, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import { signOut } from "@/app/_actions/user";

export default function NavUser({ user }) {
    const role = user?.profile?.role || ''

    return (
        <>
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="secondary"
                            className="relative"

                            size="sm"
                        >
                            {/* <Avatar className="h-8 w-8">
                                <AvatarImage
                                    src={user.imageUrl}
                                    alt={user.firstName ?? ""}
                                />
                                <AvatarFallback className="capitalize tracking-tighter">{"U"}</AvatarFallback>
                            </Avatar> */}
                            <div className="text-xs">
                                {user.email}
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-60" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                {/* <p className="text-sm font-medium leading-none capitalize">
                                    {'firstName'} {'lastName'}
                                </p> */}
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard">
                                    <User
                                        className="mr-2 h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    Account
                                    <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                                </Link>
                            </DropdownMenuItem>
                            {role === 'admin' &&
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard">
                                        <LayoutDashboard
                                            className="mr-2 h-4 w-4"
                                            aria-hidden="true"
                                        />
                                        Dashboard
                                        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                                    </Link>
                                </DropdownMenuItem>}

                            <DropdownMenuItem asChild disabled>
                                <Link href="/dashboard/settings">
                                    <Settings
                                        className="mr-2 h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    Settings
                                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <form action={signOut} className="w-full">
                                <button className="flex justify-between w-full">
                                    <>
                                        <LogOut
                                            className="mr-2 h-4 w-4"
                                            aria-hidden="true"
                                        />
                                        Logout
                                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                    </>
                                </button>
                            </form>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Link href="/login">
                    <div
                        className={buttonVariants({
                            size: "sm",
                        })}
                    >
                        Login
                        <span className="sr-only">Sign In</span>
                    </div>
                </Link>
            )}
        </>
    )
}
