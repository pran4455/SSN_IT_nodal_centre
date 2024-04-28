"use client"
import React, { useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

import { DatePickerWithRange } from "../DateRangePicker"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { FELLOWSHIP } from '@/config'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'


export function DataTableToolbar({
  table,
  filter,
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  React.useEffect(() => {

    // Custom logic for "registration_date" column
    if (filter?.from && filter?.to) {
      const date = {
        from: filter.from,
        to: filter.to
      }

      const column = table.getColumn("registration_date");

      column.toggleVisibility(true)
      column.setFilterValue(date)
      column.toggleSorting(true);
    }
    
  }, [filter]);


  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleFilterChange = (name, value) => {
    router.push(pathname + '?' + createQueryString(name, value))
  }


  return (
    <div className="lg:sticky top-[50px] flex flex-col gap-4 lg:max-w-[225px] w-full z-40">
      <Input
        placeholder="Search here..."
        value={table.globalFilter}
        onChange={(event) => {
          table?.setGlobalFilter(event.target.value)
        }}
        className="h-8 w-full bg-white"
      />

      <DatePickerWithRange table={table} from={filter?.from} to={filter.to} />

      <Select
        defaultValue={filter?.fellowship?.toUpperCase() || undefined}
        onValueChange={(e) => {
          handleFilterChange('fellowship', e)
        }}>
        <SelectTrigger className="bg-white text-xs">
          <SelectValue placeholder="Select fellowship" />
        </SelectTrigger>
        <SelectContent>
          {FELLOWSHIP.map((f, index) =>
            <SelectItem key={index} value={f}>{f}</SelectItem>
          )}
        </SelectContent>
      </Select>

      <Select
        defaultValue={filter?.status || undefined}
        onValueChange={(e) => {
          handleFilterChange('status', e)
        }}>
        <SelectTrigger className="bg-white text-xs">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Completed">Completed</SelectItem>
          <SelectItem value="Not Completed">Not Completed</SelectItem>
        </SelectContent>
      </Select>

      <Select
        defaultValue={filter?.study_type || undefined}
        onValueChange={(e) => {
          handleFilterChange('study_type', e)
        }}>
        <SelectTrigger className="bg-white text-xs">
          <SelectValue placeholder="Select study type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="FT">Full-Time</SelectItem>
          <SelectItem value="PT">Part-Time</SelectItem>
        </SelectContent>
      </Select>

      <DataTableViewOptions table={table} />
    </div>
  )
}
