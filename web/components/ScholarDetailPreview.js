import { cn } from '@/lib/utils'
import React from 'react'

export default function ScholarDetailPreview({ label, data, className }) {
  return (
    <div className={className}>
      <span className="font-medium text-black/80">
        {label}
      </span>
      <p className={cn(`text-lg`, !data && 'font-light text-sm')}>
        {data || 'N/A'}
      </p>
    </div>
  )
}
