"use client"

import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"


export function DataTableViewOptions({
  table,
}) {
  return (
    <ul className="flex flex-wrap gap-4 items-center lg:flex-col lg:items-start lg:gap-0 lg:space-y-4">
      {table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== "undefined" && column.getCanHide()
        )
        .map((column) => {
          return (
            <li className="flex gap-2 lg:items-center" key={column.id}>
              <Checkbox
                id={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              />
              <Label
                htmlFor={column.id}
                className="text-sm font-normal capitalize"
              >
                {column.columnDef.label || column.id}
              </Label>
            </li>
          )
        })}
    </ul>
  )
}
