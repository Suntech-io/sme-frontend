'use client'

import React, { useEffect, useState } from 'react'
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


type TView = 'login' | 'register' | 'forgotpassword' | 'verifyphone'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const [currentview, setcurrentview] = useState<TView>('login')
  const pathname = usePathname()

  useEffect(() => {
    // Get the current path
    const path = pathname.split('/')[1]
    // Set the current view based on the path
    console.log('path', path)
    if (path === 'login') {
      setcurrentview('login')
    } else if (path === 'register') {
      setcurrentview('register')
    } else if (path === 'forgotpassword') {
      setcurrentview('forgotpassword')
    } else if (path === 'verifyphone') {
      setcurrentview('verifyphone')
    }

    return () => {

    }
  }, [pathname])


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50 grid grid-cols-3`}
      >
        {/* child routes */}
        <div className='p-4 h-full flex flex-col'>
          {/* logo */}
          <div className="logo">
            <p className=''>
              Logo
            </p>
          </div>

          <div className="children flex flex-col h-full">
            {children}
          </div>
        </div>
        {/* hero Section */}
        <div className={cn("heroSection col-span-2", `bg-[url(/images/register.jpg)] bg-cover bg-center bg-no-repeat h-full relative`)}>
        </div>
      </body>
    </html>
  )
}

export default AuthLayout
