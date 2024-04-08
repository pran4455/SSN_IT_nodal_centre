"use client"

import * as React from "react"
import { addDays, format, subDays } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({
  table,
  className,

  from,
  to
}) {
  const [date, setDate] = React.useState({
    from: from || null,
    to: to || null
  })
console.log(date)
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
                  {format(date.from, "LL-dd-y")} to{" "}
                  {format(date.to, "LL-dd-y")}
                </>
              ) : (
                format(date.from, "LL-dd-y")
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
            onSelect={(date) => {
              setDate(date)

              table.getColumn("registration_date")?.setFilterValue(date)
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
