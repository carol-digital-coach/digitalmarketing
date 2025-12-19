"use client"

import React, { useState, useMemo } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Plus, Trash2, Settings2, Package, Search } from 'lucide-react';

// --- Types ---
type Service = {
  id: string;
  name: string;
  category: string;
  price: number;
  status: 'Active' | 'Inactive';
};

const columnHelper = createColumnHelper<Service>();

export default function ServicePage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [services, setServices] = useState<Service[]>([
    { id: '1', name: 'Cloud Hosting', category: 'Infrastructure', price: 49.99, status: 'Active' },
    { id: '2', name: 'Security Audit', category: 'Consulting', price: 1200.00, status: 'Active' },
    { id: '3', name: 'Database Backup', category: 'Storage', price: 15.00, status: 'Inactive' },
  ]);

  // --- Table Configuration ---
  const columns = useMemo(() => [
    columnHelper.accessor('name', {
      header: () => <span className="text-sm font-semibold">Service Name</span>,
      cell: info => <span className="font-medium text-gray-900">{info.getValue()}</span>,
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: info => <span className="text-gray-600">{info.getValue()}</span>,
    }),
    columnHelper.accessor('price', {
      header: 'Monthly Price',
      cell: info => `$${info.getValue().toFixed(2)}`,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          info.getValue() === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
        }`}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <div className="flex gap-2">
          <button className="p-1 hover:text-blue-600 transition-colors"><Settings2 size={18} /></button>
          <button className="p-1 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
        </div>
      ),
    }),
  ], []);

  const table = useReactTable({
    data: services,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900 mt-20">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-gray-500 mt-1">Manage and monitor your service offerings.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
        >
          <Plus size={20} />
          {showAddForm ? 'Close Form' : 'Add New Service'}
        </button>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* --- ADD SERVICE FORM --- */}
        {showAddForm && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-top-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package size={20} className="text-indigo-600" />
              Service Details
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input type="text" placeholder="e.g. Premium Support" className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
                  <option>Infrastructure</option>
                  <option>Consulting</option>
                  <option>Support</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Price ($)</label>
                <input type="number" placeholder="0.00" className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
              </div>
              <div className="flex items-end">
                <button type="button" className="w-full bg-gray-900 text-white rounded-md p-2 font-medium hover:bg-gray-800 transition-colors">
                  Save Service
                </button>
              </div>
            </form>
          </div>
        )}

        {/* --- VIEW SERVICES (TanStack Table) --- */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b flex items-center bg-white">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search services..." 
                className="pl-10 pr-4 py-2 w-full border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id} className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-200">
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-6 py-4 text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Empty State Footer */}
          {services.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              No services found. Click "Add New Service" to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}