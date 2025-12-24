"use client"

import React, { FC, ReactNode, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const QueryFetchHook: FC<{children : ReactNode }> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
                gcTime: 5 * 60 * 1000,
            },
        },
    }))

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}