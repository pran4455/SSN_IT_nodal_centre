import 'server-only'

import { createClient } from "@/lib/supabase/server";
import { headers, cookies } from "next/headers";
import { redirect } from 'next/navigation'

const isCurrentRouteCheck = (routeName) => {
    const pathname = headers().get('x-pathname');

    return pathname === routeName
}


export const supabase = () => {
    const cookieStore = cookies();
    return createClient(cookieStore);
}

export const getUser = async (options = { redirect: false }) => {
    const LOGIN_ROUTE = isCurrentRouteCheck('/login')

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user: _user },
    } = await supabase.auth.getUser();

    if (!_user) {
        if (options?.redirect && !LOGIN_ROUTE) {
            redirect('/login')
        }
        return null
    }

    return _user
}


export function recursivelySetEmptyToNotSet(obj) {
    return Object.keys(obj).reduce((acc, key) => {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
            acc[key] = recursivelySetEmptyToNotSet(value);
        } else {
            if (value === '' || value === null) {
                acc[key] = 'Not Set';
            } else {
                acc[key] = value;
            }
        }
        return acc;
    }, {});
}

function convertDateFormat(dateString) {
    const parts = dateString.split("-");
    return `${parts[1]}-${parts[0]}-${parts[2]}`;
}

export async function scholarQueryBuilder(filter, onlyCount = false) {
    let query = supabase()
        .from('scholars')
        .select("*", { count: 'exact', head: onlyCount })

    if (filter?.to) query.lte('registration_date', convertDateFormat(filter.to))
    if (filter?.from) query.gte('registration_date', convertDateFormat(filter.from))

    if (filter?.fellowship) query.eq('fellowship', filter.fellowship)
    if (filter?.status) query.eq('status', filter.status === 'Completed' ? "Y" : "N")

    if (filter?.study_type) query.eq('study_type', filter.study_type)

    return await query
}