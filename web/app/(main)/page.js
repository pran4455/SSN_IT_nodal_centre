import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/assets/SSN_IT.svg'
import { buttonVariants } from '@/components/ui/button'

export default function Page() {
    return (
        <div className='flex flex-col gap-10 justify-center min-h-screen max-w-4xl w-full mx-16'>
            <Image src={Logo} />
            <p className='font-bold text-4xl w-full'>
                Nodal Centre
            </p>
            <Link href={"/login"} className={buttonVariants({ size: 'lg',className:'w-24' })}>
                Login
            </Link>

        </div>
    )
}
