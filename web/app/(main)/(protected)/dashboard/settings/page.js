import { signOut } from "@/app/_actions/user"
import LabelForm from "@/components/LabelForm"
import { Button } from "@/components/ui/button";

import { supabase } from "@/lib/server"
import { LogOut } from 'lucide-react';

export const metadata = {
    title: "Settings"
}

export default async function SettingsPage() {

    const { data: labels, error } = await supabase().from('labels').select().order('id', { ascending: true })

    return (
        <>
            <h2 className="text-3xl font-bold p-6 border border-muted-foreground/30 rounded-xl bg-[#dde9ec] mb-8">
                Settings
            </h2>


            <div className="lg:grid grid-cols-1 lg:grid-cols-2 gap-2">

                <div className="border border-muted-foreground/30 rounded-xl bg-white px-6 pt-6">

                    {error ?
                        <pre>
                            {JSON.stringify(error.message)}
                        </pre> :
                        <>
                            <h3 className="text-2xl font-bold border-b border-muted-foreground/30 mb-2">
                                Labels
                            </h3>

                            <ul className="space-y-4 my-6">
                                {labels.map((label, index) => {
                                    return (
                                        <LabelForm key={index} label={label} />
                                    )
                                })}
                            </ul>
                        </>
                    }

                </div>

                <div className=" border border-muted-foreground/30 rounded-xl bg-white p-6 h-min">
                    <h3 className="text-2xl font-bold border-b border-muted-foreground/30 mb-6">
                        User Actions
                    </h3>

                    <ul className="space-y-4">

                        <li>
                            <Button className="w-full" variant="outline" disabled>
                                Change Password
                            </Button>
                        </li>

                        <li>
                            <form action={signOut} className="w-full">
                                <Button className="flex justify-between w-full hover:bg-destructive hover:text-white" variant="outline">
                                    <>
                                        <LogOut
                                            className="mr-2 h-4 w-4"
                                            aria-hidden="true"
                                        />
                                        Logout
                                    </>
                                </Button>
                            </form>
                        </li>
                    </ul>

                </div>
            </div>
        </>
    )
}
