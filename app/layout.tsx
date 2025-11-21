import type { Metadata } from "next";
import { Geist, Geist_Mono, Itim } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/app/components/navigationbar"


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
        <div className={`${itimRegular.variable}`}>
            <NavigationBar/>
            {children}  
        </div>
      </body>
    </html>
  );
}
