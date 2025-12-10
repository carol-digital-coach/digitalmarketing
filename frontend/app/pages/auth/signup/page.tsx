'use client'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormField,
    FormMessage,
    FormControl,
    FormItem,
    FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UserSignUpSchema } from "@/lib/zod"
import { useState } from "react"
import { Mail, Lock, User, Eye, EyeOff, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button"
import Link from "next/link"
import axios from "axios"
import toast from "react-hot-toast"
import { redirect } from "next/navigation"


export default function SignUpPage() {

    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof UserSignUpSchema>>({
        resolver: zodResolver(UserSignUpSchema),
        defaultValues: {
            username: undefined,
            email: undefined,
            password: undefined
        }
    })

    const OnSubmit = async(values: z.infer<typeof UserSignUpSchema>) => {
        try{
            const response = await axios.post("http://localhost:8000/users/signup/", values)
            toast.success("Account created!")
            setTimeout(() => {
                redirect("/pages/auth/signin")
            }, 1000)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F0F0F5' }}>
            <div className="w-full max-w-md mt-20">
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                    <div className="absolute w-96 h-96 rounded-full blur-3xl" style={{ background: '#9B3F9E', top: '20%', right: '10%' }}></div>
                </div>
                <div className="relative rounded-2xl p-8 bg-white">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-light text-gray-800 mb-2">
                            Get Started
                        </h2>
                        <p className="text-sm" style={{ color: '#711A75' }}>
                            Create Account
                        </p>
                    </div>
                    <Form {...form}>
                        <form 
                        className="space-y-4"
                        // onSubmit={form.handleSubmit(OnSubmit)}
                        >
                            <FormField
                                name="username"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormDescription className="text-gray-600 text-sm mb-1.5">Username</FormDescription>
                                        <FormControl>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                <Input
                                                    {...field}
                                                    placeholder="Enter your username"
                                                    className="pl-10 pr-4 py-3 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none transition-all text-sm border focus-visible:ring-1"
                                                    style={{
                                                        backgroundColor: '#F7F7FA',
                                                        borderColor: 'rgba(155, 63, 158, 0.3)',
                                                        boxShadow: '0 0 0 1px rgba(155, 63, 158, 0.3)'
                                                    }}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormDescription className="text-gray-600 text-sm mb-1.5">Email</FormDescription>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                <Input
                                                    {...field}
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    className="pl-10 pr-4 py-3 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none transition-all text-sm border focus-visible:ring-1"
                                                    style={{
                                                        backgroundColor: '#F7F7FA',
                                                        borderColor: 'rgba(155, 63, 158, 0.3)',
                                                        boxShadow: '0 0 0 1px rgba(155, 63, 158, 0.3)'
                                                    }}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormDescription className="text-gray-600 text-sm mb-1.5">Password</FormDescription>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                <Input
                                                    {...field}
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Enter your password"
                                                    className="pl-10 pr-10 py-3 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none transition-all text-sm border focus-visible:ring-1"
                                                    style={{
                                                        backgroundColor: '#F7F7FA',
                                                        borderColor: 'rgba(155, 63, 158, 0.3)',
                                                        boxShadow: '0 0 0 1px rgba(155, 63, 158, 0.3)'
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            {isLogin && (
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="text-xs hover:underline transition-all"
                                        style={{ color: '#711A75' }}
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}

                            <Button
                                onClick={form.handleSubmit(OnSubmit)}
                                className="w-full py-3 rounded-lg font-medium text-white transition-all text-sm mt-6 border-0 p-2"
                                style={{
                                    background: 'linear-gradient(135deg, #9B3F9E, #FF3A9E)',
                                    opacity: 1
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                            >
                                {isLogin ? 'Sign in' : 'Create account'}
                            </Button>
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">

                                    <div className="w-full border-t" style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}></div>
                                </div>
                                <div className="relative flex justify-center text-xs">

                                    <span className="px-3 text-gray-500" style={{ backgroundColor: '#FFFFFF' }}>
                                        or
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    className="py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-gray-700 text-sm hover:text-gray-900"
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        border: '1px solid rgba(0, 0, 0, 0.1)',
                                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0F0F5'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </button>

                                <button
                                    type="button"
                                    className="py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-gray-700 text-sm hover:text-gray-900"
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        border: '1px solid rgba(0, 0, 0, 0.1)',
                                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0F0F5'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                                >
                                    <Linkedin size={20}/>
                                    Linked in
                                </button>
                            </div>
                        </form>
                    </Form>

                    <div className="mt-8 text-center">
                        <span className="text-sm text-gray-500">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                        </span>
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-sm font-medium hover:underline transition-all"
                            style={{ color: '#711A75' }}
                        >
                            <Link href="/pages/auth/signin">
                             Sign in
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}