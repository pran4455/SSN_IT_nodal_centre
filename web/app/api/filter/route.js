import { scholarQueryBuilder, supabase } from "@/lib/server"
import { NextResponse } from "next/server"

export const GET = async (request) => {

    try {
        //get all the filters
        const { data: filters } = await supabase()
            .from('scholar_filters')
            .select('*,label(id,color)')


        const allFilters = await Promise.all(filters.map(async (filter) => {
            const { data, count } = await scholarQueryBuilder(filter.filter, true)

            const params = new URLSearchParams(filter.filter).toString()

            return { filter, data, count, params }
        }));

        return NextResponse.json(allFilters);

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error.message || 'Error Occured, Try again later!' }, { status: 401 });
    }
}