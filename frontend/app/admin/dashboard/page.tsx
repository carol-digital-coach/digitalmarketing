'use client'
import React, { useEffect, useState } from 'react';
import { useUserAuth } from "@/lib/userDataContext";
import { User, Activity, ShoppingCart, BookOpen, ShipWheel } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
    pendingConsultation: number;
}

const mockStats: DashboardStats = {
    totalUsers: 0,
    totalServices: 0,
    totalCourses: 0,
    pendingConsultation: 0,
};


interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ElementType;
    colorClass: string;
}


const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, colorClass }) => (
    <div className="bg-white p-5  border border-gray-100 overflow-hidden">
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

interface UserData {
    id: string,
    last_login: string,
    is_superuser: boolean,
    username: string,
    email: string,
    user_avatar: string,
    password: string,
    is_staff: boolean,
    is_verified: boolean,
    groups: Array<any>,
    user_permissions: Array<any>
}

interface ServicesData {
    id: string,
    title: string,
    short_description: string,
    keypoints: Array<{
        id: string,
        title: string,
        service: string
    }>
}


export default function AdminDashboard() {
    const { state } = useUserAuth();
    const userName: string = state.user?.user?.username || 'Admin';
    const [loading, setLoading] = useState<boolean>(false)
    const [services, setServices] = useState<Array<ServicesData> | null>(null)
    const [courses, setCourses] = useState([])
    const [users, setUsers] = useState<Array<UserData> | null>(null)

    useEffect(() => {
        const get_all_data = async () => {
            const [services] = await Promise.all([
                axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL_LIVE}services/`),
            ])

            console.log("services", services.data?.data)
            setServices(services.data?.data)
        }

        get_all_data()
    }, [])


    console.log(state.user?.access)

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
                        value={0}
                        icon={ShipWheel}
                        colorClass="bg-red-500"
                    />
                    <StatCard
                        title="Pending Consultations"
                        value={mockStats.pendingConsultation}
                        icon={Activity}
                        colorClass="bg-yellow-500"
                    />
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">


                    <div className="hidden lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent System Log</h2>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded-full text-blue-600"><User className="w-4 h-4" /></div>
                                <p className="text-sm text-gray-700">**New User** 'JaneDoe' registered.</p>
                            </li>
                            <li className="flex items-center space-x-3">
                                <div className="p-2 bg-red-100 rounded-full text-red-600"><ShoppingCart className="w-4 h-4" /></div>
                                <p className="text-sm text-gray-700">**Order #1005** placed for 'React Course'.</p>
                            </li>
                            <li className="flex items-center space-x-3">
                                <div className="p-2 bg-yellow-100 rounded-full text-yellow-600"><BookOpen className="w-4 h-4" /></div>
                                <p className="text-sm text-gray-700">Course **Next.js Deep Dive** updated.</p>
                            </li>
                            <li className="flex items-center space-x-3">
                                <div className="p-2 bg-green-100 rounded-full text-green-600"><Activity className="w-4 h-4" /></div>
                                <p className="text-sm text-gray-700">Server backup **Completed**.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}