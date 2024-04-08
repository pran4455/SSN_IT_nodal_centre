import Sidebar from '@/components/Sidebar'
import { getUser } from '@/lib/server';
import Topbar from '@/components/Topbar';


export default async function DashboardLayout({ children }) {
    const user = await getUser({ redirect: true })
    return (
        <main className="flex flex-1 flex-col">

            {/* Topbar */}
            <Topbar user={user}/>
           
            <div className="flex flex-1">
                <Sidebar user={user} />
                <div className="w-full relative p-6 bg-[#EDF1F5]">
                    {children}
                </div>
            </div>
        </main>
    )
}
