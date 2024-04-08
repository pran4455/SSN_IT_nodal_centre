'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Navbar from "@/components/Navbar"
import { TailwindIndicator } from "@/components/TailwindIndicator"
import { Toaster } from "@/components/ui/sonner"

const queryClient = new QueryClient()

export default function Providers({ user, children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Navbar user={user} />
            {children}
            <Toaster richColors closeButton />
            <TailwindIndicator />
        </QueryClientProvider>
    )
}
