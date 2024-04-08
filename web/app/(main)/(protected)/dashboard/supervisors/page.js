import DataTable from "@/components/SupervisorDataTable/DataTable"
import { columns } from "@/components/SupervisorDataTable/columns"

import { supabase } from "@/lib/server"

export const metadata ={
    title:"Supervisors"
}

export default async function ScholarsPage({ searchParams }) {

    const params = new URLSearchParams(searchParams)

    const ongoing = params.has('ongoing') || false

    const start = params.get('startDate') || new Date()
    const end = params.get('endDate') || new Date();

    const { data: supervisors, error } = await supabase().from('supervisors').select()

    return (
        <>
            <h2 className="text-3xl font-bold border p-6 border-muted-foreground/30 rounded-xl bg-[#dde9ec] mb-8">
                Supervisors
            </h2>

            {error ?
                <pre>
                    {JSON.stringify(error.message)}
                </pre> :
                <DataTable data={supervisors} columns={columns} />
            }
        </>
    )
}
