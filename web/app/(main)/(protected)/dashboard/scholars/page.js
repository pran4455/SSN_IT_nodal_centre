import DataTable from "@/components/ScholarDataTable/DataTable"
import { columns } from "@/components/ScholarDataTable/columns"
import ShareLink from "@/components/ShareLink";

import { recursivelySetEmptyToNotSet, supabase } from "@/lib/server"
import { format, parse } from "date-fns";

export const metadata = {
    title: "Scholars"
}

export const revalidate = 0


function formatDate(dateObject) {
    if (!dateObject || !(dateObject instanceof Date)) return dateObject; // Return as is if not a date object
    return format(dateObject, "dd-MM-yyyy");
}

// Function to recursively map through an object and format date values
function mapAndFormatDates(obj) {
    if (!obj || typeof obj !== 'object') return obj; // Return as is if not an object

    return Object.entries(obj).reduce((acc, [key, value]) => {
        // Check if the value is a date object
        if (value instanceof Date) {
            // Format the date object
            acc[key] = formatDate(value);
        } else if (typeof value === 'object') {
            // Recursively map through nested objects
            acc[key] = mapAndFormatDates(value);
        } else {
            // Other value types, keep as is
            acc[key] = value;
        }
        return acc;
    }, {});
}
export default async function ScholarsPage({ searchParams }) {

    const params = new URLSearchParams(searchParams)

    const status = params.get('status') || null;

    const fellowship = params.get('fellowship') || null

    const study_type = params.get('study_type') || null

    //Date Format DD/MM/YYYY
    const _from = params.get('from') || null
    const _to = params.get('to') || null

    const from = _from ? _from : (_from ? '01-01-2007' : null);

    const to = _from && !_to ? format(new Date(), "dd-LL-y") : _to || null

    const { data: _scholars, error } = await supabase().from('scholars').select('*,scholar_details(register_number,university,working_at_ssn)')

    const scholars = _scholars.map((scholar) => {
        const _scholar = recursivelySetEmptyToNotSet(scholar);
        _scholar.status = scholar.status ? "Completed" : "Not Completed"

        const scholar_details = _scholar.scholar_details
        delete _scholar.scholar_details;

        return { ..._scholar, ...scholar_details }
    })

    let filter = {};
    let visibleColumns = {}

    if (from) filter.from = parse(from, 'dd-MM-yyyy', new Date())
    if (to) filter.to = parse(to, 'dd-MM-yyyy', new Date())

    if (fellowship) filter.fellowship = fellowship
    if (fellowship) visibleColumns.fellowship = true

    if (status) filter.status = status
    if (status) visibleColumns.status = true

    if (study_type) filter.study_type = study_type
    if (study_type) visibleColumns.study_type = true

    // get saved filters from supabase and determine whether the current filter is from stored one or new
    const { data: _labels, error: labelError } = await supabase().from('labels').select('*')

    const { data: savedFilter } = await supabase()
        .from('scholar_filters')
        .select("*")
        .eq('filter', JSON.stringify(mapAndFormatDates(filter)))
        .single()

    console.log(scholars)

    return (
        <>
            <div className="p-6 flex justify-between items-center border border-muted-foreground/30 rounded-xl bg-[#dde9ec] mb-8">
                <h2 className="text-3xl font-bold">
                    Scholars
                </h2>
                <ShareLink />
            </div>

            {error ?
                <pre>
                    {JSON.stringify(error.message)}
                </pre> :

                <DataTable data={scholars} columns={columns} filter={filter} visibleColumns={visibleColumns} labels={_labels} savedFilter={savedFilter} />
            }
        </>
    )
}
