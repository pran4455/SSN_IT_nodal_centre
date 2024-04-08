import NavUser from '@/components/NavUser'
import { Input } from '@/components/ui/input'
import { Search as Icon } from 'lucide-react';

import Image from 'next/image'
import Logo from '@/assets/SSN_IT.svg'
import Link from 'next/link'
import { Button } from './ui/button';

export default function Topbar({ user }) {
    return (
        <div className="sticky top-0 left-0 bg-white h-[56px] border-b border-b/40 flex justify-between items-center sm:gap-4 px-2 z-50">

            <div className="flex items-center h-[56px] border-b">
                <Link href="/">
                    <Image src={Logo} className='w-full sm:w-40 antialiased' alt="logo" />
                </Link>
            </div>

            {/* Search Bar TBD */}
            <div className="flex w-full items-center justify-end mr-2">

                {/* Mobile Search TBD */}
                <Button variant="outline" size="icon" className="sm:hidden">
                    <Icon className='opacity-40' />
                </Button>


                <div className='relative hidden w-[425px] lg:flex'>
                    <div className='absolute p-1 m-1 top-0 right-0'>
                        <Icon className='opacity-40' />
                    </div>

                    <Input className="h-10 bg-[#E3EBF3] "
                        placeholder="Search..."
                        type='text'
                    />
                </div>
            </div>

            <div className="h-full">
                <div className="flex p-2 bg-primary rounded-b-lg">
                    <NavUser user={user} />
                </div>
            </div>

        </div>
    )
}
