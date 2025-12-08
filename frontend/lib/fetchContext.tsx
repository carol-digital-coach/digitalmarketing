"use client"

import React, { FC, ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"


export const QueryFetchHook: FC<{children : ReactNode }> = ({ children }) => {

    const new_queryClient = new QueryClient()

    return (
        <QueryClientProvider
        client={new_queryClient}
        >
            {children}
        </QueryClientProvider>
    )
}