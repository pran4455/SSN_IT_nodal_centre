'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { TailwindIndicator } from "@/components/TailwindIndicator"
import { Toaster } from "@/components/ui/sonner"

const queryClient = new QueryClient()

export default function Providers({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster richColors closeButton />
            <TailwindIndicator />
        </QueryClientProvider>
    )
}
