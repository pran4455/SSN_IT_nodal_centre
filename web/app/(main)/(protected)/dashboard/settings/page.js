import LabelForm from "@/components/LabelForm"

import { supabase } from "@/lib/server"

const Labels = [
    {
        name: 'important',
        color: '#ef4444',
        description: 'label description',
    },
    {
        name: 'admin',
        color: '#0D4BA0',
        description: 'label description',
    },
]

export const metadata ={
    title:"Settings"
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
            </div>
        </>
    )
}
