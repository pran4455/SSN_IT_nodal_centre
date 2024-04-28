'use client'
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

import {
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form"


export default function ScholarDetail({ label, data, type, className, field }) {

    const placeholder = data || 'N/A'

    return (
        <FormItem className={cn("space-y-2", className)}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <Input
                    type={data ? type : 'text'}
                    className={`bg-white h-12 disabled:opacity-100 placeholder:font-bold`}
                    placeholder={placeholder}
                    {...field}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}
