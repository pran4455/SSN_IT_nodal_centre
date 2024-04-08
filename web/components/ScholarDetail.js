'use client'
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function ScholarDetail({ key, title, data, type, className }) {

    const placeholder = data || 'N/A'
    const defaultValue = data || null

    return (
        <div className={cn("space-y-2", className)}>
            <Label htmlFor={key}>{title}</Label>
            <Input
                name={key}
                type={data ? type : 'text'}
                className={`bg-white h-12 disabled:opacity-100 placeholder:font-bold`}
                placeholder={placeholder}
                defaultValue={defaultValue}
            />
        </div>
    )
}
