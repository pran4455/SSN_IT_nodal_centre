import DataTable from "@/components/ScholarDataTable/DataTable"
import { columns } from "@/components/ScholarDataTable/columns"

import { supabase } from "@/lib/server"
import { format } from "date-fns"

export const metadata = {
    title: "Scholars"
}

export default async function ScholarsPage({ searchParams }) {

    const params = new URLSearchParams(searchParams)

    //Date Format DD/MM/YYYY
    const university = params.get('university') || null
    const from = params.get('from') ? params.get('from') : (params.get('from') ? '01-01-2007' : null);
    const to = params.get('to') || null


    const { data: scholars, error } = await supabase().from('scholars').select('*,scholar_details(register_number,university)')

    let filter = {};

    if (from) filter.from = from
    if (to) filter.to = to
    if (university) filter.university = university

    return (
        <>
            <h2 className="text-3xl font-bold border p-6 border-muted-foreground/30 rounded-xl bg-[#dde9ec] mb-8">
                Scholars
            </h2>

            {error ?
                <pre>
                    {JSON.stringify(error.message)}
                </pre> :

                <DataTable data={scholars} columns={columns} filter={filter} />
            }
        </>
    )
}
