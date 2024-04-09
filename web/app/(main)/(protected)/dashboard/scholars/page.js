import DataTable from "@/components/ScholarDataTable/DataTable"
import { columns } from "@/components/ScholarDataTable/columns"

import { recursivelySetEmptyToNotSet, supabase } from "@/lib/server"
import { format, parse } from "date-fns";

export const metadata = {
    title: "Scholars"
}

export default async function ScholarsPage({ searchParams }) {

    const params = new URLSearchParams(searchParams)

    const status = params.get('status') || null ;

    const fellowship = params.get('fellowship') || null

    const study_type = params.get('study_type') || null

    //Date Format DD/MM/YYYY
    const _from = params.get('from') || null
    const _to = params.get('to') || null

    const from = _from ? _from : (_from ? '01-01-2007' : null);

    const to = _from && !_to ? format(new Date(), "dd-LL-y") : _to || null

    const { data: _scholars, error } = await supabase().from('scholars').select('*,scholar_details(register_number,university)')

    const scholars = _scholars.map((scholar) => {
        const _scholar = recursivelySetEmptyToNotSet(scholar);
        _scholar.completed = scholar.completed === "Y" ? "Completed" : "Not Completed"

        const scholar_details = _scholar.scholar_details
        delete _scholar.scholar_details;

        return { ..._scholar, ...scholar_details }
    })

    let filter = {};

    if (from) filter.from = parse(from, 'dd-MM-yyyy', new Date())
    if (to) filter.to = parse(to, 'dd-MM-yyyy', new Date())
    if (fellowship) filter.fellowship = fellowship
    if (status) filter.status = status
    if (study_type) filter.study_type = study_type

    console.log(filter)

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
