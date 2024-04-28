import { scholarQueryBuilder, supabase } from "@/lib/server"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
    try {
        const { id } = params

        const { data } = await supabase()
            .from('scholar_filters')
            .select('*')
            .eq('id', id)
            .single()


        const filterData = await scholarQueryBuilder(data.filter, false)

        if (filterData?.error) {
            return NextResponse.json(filterData?.error)

        }
        console.log(filterData)

        return NextResponse.json(filterData)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error.message || 'Error Occured, Try again later!' }, { status: 401 });
    }

}

export const PATCH = async (request, { params }) => {
    try {
        const { id } = params
        const body = await request.json()

        const { error } = await supabase()
            .from('scholar_filters')
            .update(body)
            .eq('id', id)

        if (error) {
            console.log(error)
            throw error
        }

        return NextResponse.json({ message: 'success' })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error.message || 'Error Occured, Try again later!' }, { status: 401 });
    }
}