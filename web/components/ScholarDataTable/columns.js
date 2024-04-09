"use client"

import { DataTableColumnHeader } from "./data-table-column-header"
import { Checkbox } from "../ui/checkbox"
import Link from 'next/link'
import { format, isAfter, isBefore, isEqual } from "date-fns"

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    label: 'Name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) =>
      <Link href={`/dashboard/scholars/${row.original.register_number}`} className="hover:underline">
        <span className="font-medium">{row.getValue("name")}</span>
      </Link>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
  },
  {
    accessorKey: "register_number",
    label: 'Register Number',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Register Number" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("register_number")}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
  },
  {
    accessorKey: "guide",
    label: 'guide',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Guide" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("guide")}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "study_type",
    label: 'Study Type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Study Type" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("study_type")}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "fellowship",
    label: 'fellowship',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fellowship" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("fellowship") || 'Not Set'}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "registration_date",
    label: 'Registration Date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registration Date" />
    ),
    cell: ({ row }) => {

      const registration_date = row.getValue("registration_date")

      return (
        <div>
          {registration_date !== 'Not Set' ? format(registration_date, "dd-MM-yyyy") : registration_date}
        </div>
      )
    },

    filterFn: (row, id, value) => {
      const { from: _from, to: _to } = value
      if (!_from || !_to) return false

      return (isEqual(row.getValue(id), _from) || isAfter(row.getValue(id), _from)) &&
        (isEqual(row.getValue(id), _to) || isBefore(row.getValue(id), _to));
    },
  },
  {
    accessorKey: "viva_voice_date",
    label: 'Viva Voice Date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Viva Voice Date" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("viva_voice_date") || 'Not Set'}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "completed",
    label: 'Completed',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("completed")}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return row.getValue(id) === value

    },
  },
  {
    accessorKey: "university",
    label: 'University',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="University" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("university") || "Not Set"}
        </div>
      )
    },
    filterFn: (row, id, value) => {

      const pattern = new RegExp("\\b" + value.toLowerCase() + "\\w*", "i");

      return pattern.test(row.getValue(id)?.toLowerCase() || 'Not Set')
    },
  }
]
