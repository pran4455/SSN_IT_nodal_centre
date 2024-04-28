import React from 'react'

import { Button, buttonVariants } from "../ui/button"
import { CSVLink } from "react-csv"
import { format } from "date-fns"
import { motion } from 'framer-motion'
import SaveFilter from '../SaveFilter'

export default function DataTableActions({ table, filter, labels, savedFilter }) {
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

    //getCoreRowModel()

    const DownloadCSV = ({ children }) => {
        if (isMounted) {
            const data = table.getFilteredSelectedRowModel().rows.length > 0 ? selectedRowData : defaultExport

            return (
                <CSVLink data={data} filename={`${format(new Date(), "LL_dd_y")}_Export`} target="_blank">
                    {children}
                </CSVLink>
            )
        }
    }

    if (!isMounted) {
        return null
    }

    return (
        <>
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

            <div className="flex justify-end gap-4">
                {Object?.keys(filter).length > 0 ?
                    <>
                        <a href={"/dashboard/scholars"} className={buttonVariants({ variant: 'destructive', size: "sm" })}>
                            Clear Filter
                        </a>
                        <DownloadCSV>
                            <Button size="sm">
                                Export Data
                            </Button>
                        </DownloadCSV>
                        <SaveFilter filter={filter} labels={labels} savedFilter={savedFilter} />
                    </>
                    :
                    <DownloadCSV>
                        <Button size="sm">
                            Export Data
                        </Button>
                    </DownloadCSV>
                }
            </div>
        </>
    )
}

