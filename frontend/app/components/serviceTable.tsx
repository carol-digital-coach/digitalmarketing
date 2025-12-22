"use client"
import { 
    useReactTable, 
    flexRender, 
    getCoreRowModel, 
    createColumnHelper, 
    getPaginationRowModel, 
    getSortedRowModel, 
    getFilteredRowModel 
} from "@tanstack/react-table"
import { useState, useMemo, useEffect } from "react"
import { Trash2, Settings2, ListPlus, SaveOff, Search, ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { useServices } from "@/hooks/services"

interface ServicesData {
    id: string,
    title: string,
    short_description: string,
    keypoints: Array<{ id: string, title: string, service: string }>,
    status: any
}

const columnHelper = createColumnHelper<ServicesData>()

export const ServiceTable = () => {
    const { data, isLoading, error } = useServices()
    const [serviceData, setServiceData] = useState<Array<ServicesData>>([])
    const [activeActionsRow, setActiveActionsRow] = useState<string | null>(null)
    const [globalFilter, setGlobalFilter] = useState("")

    useEffect(() => {
        if (data?.data) {
            setServiceData(data?.data)
        }
    }, [data])

    const handleDelete = (id: string) => {
        setServiceData(prev => prev.filter(item => item.id !== id))
        setActiveActionsRow(null)
    }

    const handleUpdate = (id: string) => {
        console.log("Update service:", id)
        setActiveActionsRow(null)
    }

    const handleDeactivate = (id: string) => {
        setServiceData(prev => prev.map(item =>
            item.id === id ? { ...item, status: item.status === "active" ? "inactive" : "active" } : item
        ))
        setActiveActionsRow(null)
    }

    const columns = useMemo(() => [
        columnHelper.accessor("id", {
            header: "Service ID",
            cell: info => <span className="font-mono text-xs text-gray-400">#{info.getValue().slice(0, 8)}...</span>
        }),
        columnHelper.accessor("title", {
            header: ({ column }) => (
                <button 
                    className="flex items-center gap-1 hover:text-gray-900 transition-colors"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    {column.getIsSorted() === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
            ),
            cell: info => <span className="font-semibold text-gray-900">{info.getValue().slice(0, 25)}...</span>
        }),
        columnHelper.accessor("short_description", {
            header: "Description",
            cell: info => <span className="text-gray-500 text-sm line-clamp-1">{info.getValue()}</span>
        }),
        columnHelper.accessor("status", {
            header: "Status",
            cell: info => (
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    info.getValue() === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                }`}>
                    {info.getValue()}
                </span>
            )
        }),
        columnHelper.display({
            id: "actions",
            header: () => <div className="text-right">Actions</div>,
            cell: ({ row }) => {
                const isOpen = activeActionsRow === row.original.id
                return (
                    <div className="absolute flex justify-end">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveActionsRow(isOpen ? null : row.original.id);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors border border-transparent active:border-gray-200"
                        >
                            <Settings2 size={18} className="text-gray-500" />
                        </button>
                        {isOpen && (
                            <>
                                {/* <div className="" onClick={() => setActiveActionsRow(null)} /> */}
                                <div className="relative right-0 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 z-[100] p-1.5 animate-in fade-in zoom-in-95 duration-150">
                                    <button onClick={() => handleUpdate(row.original.id)} className="w-full flex items-center gap-3 p-2 hover:bg-blue-50 text-blue-700 rounded-lg transition-colors text-left font-medium text-sm">
                                        <ListPlus size={16} /> Update
                                    </button>
                                    <button onClick={() => handleDeactivate(row.original.id)} className="w-full flex items-center gap-3 p-2 hover:bg-amber-50 text-amber-700 rounded-lg transition-colors text-left font-medium text-sm">
                                        <SaveOff size={16} /> {row.original.status === "active" ? "Deactivate" : "Activate"}
                                    </button>
                                    <div className="h-px bg-gray-100 my-1" />
                                    <button onClick={() => handleDelete(row.original.id)} className="w-full flex items-center gap-3 p-2 hover:bg-red-50 text-red-700 rounded-lg transition-colors text-left font-medium text-sm">
                                        <Trash2 size={16} /> Remove
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )
            }
        })
    ], [activeActionsRow])

    const table = useReactTable({
        data: serviceData,
        columns,
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: { pagination: { pageSize: 5 } }
    })

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-500">
            <Loader2 className="animate-spin text-blue-600" size={32} />
            <p className="font-medium">Loading services...</p>
        </div>
    )

    return (
        <div className="w-full p-4 sm:p-6 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                
                <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Services</h2>
                        <p className="text-sm text-gray-500">Manage your active service directory</p>
                    </div>
                    
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text"
                            value={globalFilter ?? ""}
                            onChange={e => setGlobalFilter(e.target.value)}
                            placeholder="Search all services..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none"
                        />
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} className="px-6 py-4 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors group">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap overflow-visible">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden divide-y divide-gray-100">
                    {table.getRowModel().rows.map(row => (
                        <div key={row.id} className="p-5 hover:bg-gray-50/50 transition-colors space-y-3">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <h3 className="font-bold text-gray-900 leading-tight">{row.original.title}</h3>
                                    <p className="text-[10px] font-mono text-gray-400 uppercase">ID: {row.original.id.slice(0, 12)}</p>
                                </div>
                                {(() => {
                                    const actionCell = row.getVisibleCells().find(cell => cell.column.id === "actions");
                                    return actionCell ? flexRender(actionCell.column.columnDef.cell, actionCell.getContext()) : null;
                                })()}
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2">{row.original.short_description}</p>
                            <div className="pt-1">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${
                                    row.original.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"
                                }`}>
                                    {row.original.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer / Pagination */}
                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Showing {table.getRowModel().rows.length} of {serviceData.length} entries
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition-all shadow-sm"
                        >
                            <ChevronDown className="rotate-90" size={18} />
                        </button>
                        <span className="text-sm font-bold text-gray-700">
                            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                        </span>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition-all shadow-sm"
                        >
                            <ChevronUp className="rotate-90" size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}