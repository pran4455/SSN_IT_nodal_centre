"use client"
import React from 'react'
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"
import { Button, buttonVariants } from "../ui/button"
import { CSVLink } from "react-csv"
import { format } from "date-fns"
import { motion } from 'framer-motion'

import { DatePickerWithRange } from "../DateRangePicker"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { FELLOWSHIP } from '@/config'


export function DataTableToolbar({
  table,
  filter,
}) {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])


  React.useEffect(() => {

    console.log('Test')

    if (filter?.from && filter?.to) {

      const date = {
        from: filter.from,
        to: filter.to
      }

      table.getColumn("registration_date")?.setFilterValue(date)
      table.getColumn("registration_date")?.toggleSorting(true)

    }

    if (filter?.fellowship) {
      table.getColumn("fellowship").toggleVisibility(true)
      table.getColumn("fellowship").setFilterValue(filter?.fellowship.toUpperCase())
      table.getColumn("fellowship")?.toggleSorting(true)
    }

    if (filter?.status) {
      table.getColumn("completed").toggleVisibility(true)
      table.getColumn("completed").setFilterValue(filter?.status)
      table.getColumn("completed")?.toggleSorting(true)
    }

    if (filter?.study_type) {
      table.getColumn("study_type").toggleVisibility(true)
      table.getColumn("study_type").setFilterValue(filter?.study_type)
      table.getColumn("study_type")?.toggleSorting(true)
    }

  }, [isMounted, filter]);



  const selectedRowData = table.getFilteredSelectedRowModel().rows
    .map((row) => {
      const result = {}
      row.getVisibleCells()
        .filter(data => data.column.id !== 'select')
        .map(cell => result[cell.column.id] = cell.getValue(row.id))

      return result
    })

  const defaultExport = table.getRowModel().rows
    .map((row) => {
      const result = {}
      row.getVisibleCells()
        .filter(data => data.column.id !== 'select')
        .map(cell => result[cell.column.id] = cell.getValue(row.id))

      return result
    })


  const DownloadCSV = ({ children }) => {
    if (isMounted) {
      return (
        <CSVLink data={table.getFilteredSelectedRowModel().rows.length > 0 ? selectedRowData : defaultExport} filename={`${format(new Date(), "LL_dd_y")}_Export`} target="_blank">
          {children}
        </CSVLink>
      )
    }
  }


  return (
    <div className="sticky top-[50px] flex flex-col gap-4 lg:max-w-[225px] w-full">

      {table.getFilteredSelectedRowModel().rows.length > 0 &&
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="fixed bottom-0 left-0 w-full flex justify-center items-center">
          <div className="p-4 flex items-center rounded-t-2xl shadow-2xl bg-white max-w-xs w-full z-50">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <DownloadCSV>
              <Button size="sm" className="shadow-lg">
                Export data
              </Button>
            </DownloadCSV>
          </div>

        </motion.div>
      }

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
          table.getColumn("fellowship").toggleVisibility(true)
          table.getColumn("fellowship").setFilterValue(e)
          table.getColumn("fellowship")?.toggleSorting(true)

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
          table.getColumn("completed").toggleVisibility(true)
          table.getColumn("completed").setFilterValue(e)
          table.getColumn("completed")?.toggleSorting(true)
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
          table.getColumn("study_type").toggleVisibility(true)
          table.getColumn("study_type").setFilterValue(e)
          table.getColumn("study_type")?.toggleSorting(true)
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

      {Object?.keys(filter).length > 0 &&
        <>
          <a href={"/dashboard/scholars"} className={buttonVariants({ variant: 'default' })}>
            Clear Filter
          </a>
          <DownloadCSV>
            <Button className="w-full">
              Export data
            </Button>
          </DownloadCSV>
        </>
      }
    </div>
  )
}
