"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function DatePickerWithRange({
  table,
  className,
  from,
  to
}) {

  const router = useRouter()
  const pathname = usePathname()

  const [date, setDate] = React.useState({
    from: from || null,
    to: to || null
  })

  const searchParams = useSearchParams()

  const onSelect = (date) => {
    setDate(date)

    table.getColumn("registration_date")?.setFilterValue(date)
    table.getColumn("registration_date")?.toggleSorting(true)

    const params = new URLSearchParams(searchParams.toString())

    date?.from && params.set('from', format(date?.from, "dd-MM-yyyy"))
    date?.to && params.set('to', format(date?.to, "dd-MM-yyyy"))

    router.push(pathname + `?${params.toString()}`)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "text-xs justify-start text-left font-normal px-3",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd-LL-y")} to{" "}
                  {format(date.to, "dd-LL-y")}
                </>
              ) : (
                format(date.from, "dd-LL-y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            captionLayout="dropdown-buttons" fromYear={2005} toYear={2025}
            defaultMonth={date?.from}
            selected={date}
            onSelect={onSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
