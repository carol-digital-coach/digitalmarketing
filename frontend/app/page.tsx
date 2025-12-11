"use client"

import Image from "next/image";
import  HomePage  from "./home/page";
import AboutPage from "./pages/about/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function Home() {
  return (
    <div
    className="h-auto"
    >
        <HomePage />
    </div>
  );
}
