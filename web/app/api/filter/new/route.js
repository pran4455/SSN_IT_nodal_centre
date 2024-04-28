import { supabase } from "@/lib/server"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        const body = await req.json()

        // check existing data
        const { data: existingData, error: existingDataError } = await supabase()
            .from('scholar_filters')
            .select('*')
            .eq('filter', JSON.stringify(body.filter))

        if (existingDataError) {
            throw new Error('Unable to retrieve data')
        }

        if (existingData?.length > 0) {
            return NextResponse.json({ message: 'Filter already exist!' }, { status: 401 })
        }

        const { error } = await supabase()
            .from('scholar_filters')
            .insert(body)

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