"use client"
import React from 'react'
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"
import { Button } from "../ui/button"
import { CSVLink } from "react-csv"
import { format } from "date-fns"
import { motion } from 'framer-motion'

export function DataTableToolbar({
  table,
}) {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

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
    <div className="flex gap-2 items-center justify-between">

      {table.getFilteredSelectedRowModel().rows.length > 0 &&
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="fixed bottom-0 left-0 w-full z-50 flex justify-center items-center">
          <div className="p-4 flex items-center rounded-t-2xl shadow-2xl bg-white max-w-xs w-full">
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
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search here..."
          value={table.globalFilter}
          onChange={(event) => {
            return table.setGlobalFilter(event.target.value)
          }}
          className="h-8 w-[150px] lg:w-[250px] bg-white"
        />
      </div>
      <DataTableViewOptions table={table} />

      <DownloadCSV>
        <Button
          size="sm"
        >
          Export
        </Button>
      </DownloadCSV>
    </div>
  )
}
