import type { Metadata } from "next";
import { Geist, Geist_Mono, Itim } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/app/components/navigationbar"
import { Footer } from "@/app/components/footer"
import { DashboardProvider } from "./dashboardProvider";
import { AuthContextUserProvider } from "@/lib/userDataContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { QueryFetchHook } from "@/lib/fetchContext";
import { Toaster } from "react-hot-toast";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const itimRegular = Itim({
    variable: "--font-itim-regular",
    subsets: ["latin"],
    weight: "400"
});



export const metadata: Metadata = {
    title: "Carol the digital analyist",
    description: "Bring you business back online",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${itimRegular.variable} ${itimRegular.variable} antialiased`}
            >
                <AuthContextUserProvider>
                    <QueryFetchHook>
                        <div className={`${itimRegular.variable}`}>
                            <NavigationBar />
                            <DashboardProvider>{children}</DashboardProvider>
                            <Toaster
                                position="top-center"
                                
                            />


                            <Footer />
                        </div>
                    </QueryFetchHook>
                </AuthContextUserProvider>
            </body>
        </html>
    );
}
