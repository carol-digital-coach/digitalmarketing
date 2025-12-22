'use client'
import React, { useEffect, useState } from 'react';
import { useUserAuth } from "@/lib/userDataContext";
import { User, Activity, ShoppingCart, BookOpen } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from "axios"

interface UserDetails {
    username: string;
}

interface AuthState {
    user: {
        user: UserDetails;
    } | "";
}

interface DashboardStats {
    totalUsers: number;
    totalServices: number;
    totalCourses: number;
    pendingOrders: number;
}

const mockStats: DashboardStats = {
    totalUsers: 0,
    totalServices: 0,
    totalCourses: 0,
    pendingOrders: 0,
};


interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ElementType;
    colorClass: string;
}

interface Services {
    id: string,
    title: string,
    short_description: string,
    keypoints: Array<{
        id: string,
        title: string,
        service: string
    }>
}


const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, colorClass }) => (
    <div className="relative bg-white p-5  border border-gray-100 overflow-hidden hover:bg-[var(--site-black)]/30">
        <p className='absolute top-22 left-10 text-lg text-black hover:block cursor-pointer'>
            Click to view {title.split(" ")[1]}
        </p>
        <div className="flex justify-between items-start p-2">
            <div>
                <p className="text-sm font-medium text-black">{title}</p>
                <p className="text-3xl font-bold text-gray-600 mt-1">{value}</p>
            </div>
            <div className={`p-3 rounded-full text-white ${colorClass}`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
    </div>
);


export default function AdminDashboard() {

    const { state } = useUserAuth();
    const userName: string = state.user?.user?.username || 'Admin';
    const bearer_token = state.user?.access
    const [services, setServices] = useState<Array<Services> | []>([])


    useEffect(() => {
        const get_dashboard_data = async () => {
            const [services] = await Promise.all([
                axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL_LIVE}services/`),
            ])
            setServices(services.data?.data)

        }
        get_dashboard_data()
    }, [])


    return (
        <div className="flex-1 p-6 md:p-10 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">

                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        👋 Weclome {userName} !
                    </h1>
                </header>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Metrics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden">
                    <StatCard
                        title="Total Users"
                        value={mockStats.totalUsers.toLocaleString()}
                        icon={User}
                        colorClass="bg-indigo-500"
                    />
                    <StatCard
                        title="Total Courses"
                        value={mockStats.totalCourses}
                        icon={BookOpen}
                        colorClass="bg-green-500"
                    />
                    <StatCard
                        title="Total Services"
                        value={services.length || 0}
                        icon={ShoppingCart}
                        colorClass="bg-red-500"
                    />
                    <StatCard
                        title="Pending Orders"
                        value={mockStats.pendingOrders}
                        icon={Activity}
                        colorClass="bg-yellow-500"
                    />
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">


                    <div className="lg:col-span-1 bg-white p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">New System Activities</h2>
                        <li>None**</li>
                    </div>
                </div>
            </div>
        </div>
    )
}