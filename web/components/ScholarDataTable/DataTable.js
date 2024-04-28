"use client"

import * as React from "react"
import {
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"

import DataTableActions from "./data-table-actions"

const defaultFilter = {
    fellowship: false,
    study_type: false,
    viva_voice_date: false,
    university: false,
    status: false
}

export default function DataTable({
    columns,
    data,
    filter,
    visibleColumns,
    labels,
    savedFilter = null
}) {
    const _filter = React.useMemo(() => {
        const registrationDate = {};
        Object.keys(filter).forEach(key => {
            if (key === 'from' || key === 'to') {
                registrationDate[key] = filter[key];
            }
        });

        const filteredItems = Object.keys(filter)
            .filter(key => key !== 'from' && key !== 'to')
            .map(key => ({
                id: key,
                value: filter[key]
            }));

        if (Object.keys(registrationDate).length > 0) {
            filteredItems.unshift({
                id: 'registration_date',
                value: registrationDate
            });
        }

        return filteredItems;
    }, [filter]);

    const [rowSelection, setRowSelection] = React.useState({})

    const [columnVisibility, setColumnVisibility] =
        React.useState({ ...defaultFilter, ...visibleColumns })

    const [columnFilters, setColumnFilters] = React.useState(
        [..._filter]
    )

    const [sorting, setSorting] = React.useState([
        {
            id: 'register_number',
            desc: true
        }
    ])

    const [filtering, setFiltering] = React.useState("")

    React.useEffect(() => {
        setColumnFilters(_filter)
    }, [filter])

    React.useEffect(() => {
        const newVisibility = { ...defaultFilter, ...visibleColumns }

        if (newVisibility !== columnVisibility) {
            setColumnVisibility({ ...defaultFilter, ...visibleColumns })
        }
    }, [visibleColumns])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            globalFilter: filtering,
        },
        initialState: {
            pagination: {
                pageIndex: 0, //custom initial page index
                pageSize: 10, //custom default page size
            },
        },
        enableGlobalFilter: true,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    return (
        <div className="relative flex flex-col lg:flex-row gap-4">
            <DataTableToolbar table={table} filter={filter} />
            <div className="w-full flex flex-col gap-4">
                <DataTableActions table={table} filter={filter} labels={labels} savedFilter={savedFilter} />
                <div className="flex flex-col space-y-4">
                    <div className="overflow-auto rounded-md border bg-white">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id} colSpan={header.colSpan}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell className="text-xs py-2" key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <DataTablePagination table={table} />
                </div>
            </div>

        </div>
    )
}
