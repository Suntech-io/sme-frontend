'use client'

import React from 'react'
import { Geist, Geist_Mono } from "next/font/google";
import "@/globals.css";
import { ReactNode } from 'react';
import { Metadata } from 'next';

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { } from '@radix-ui/react-dropdown-menu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Bell, DivideCircleIcon } from 'lucide-react';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



const PrivateLayout = ({ children }: { children: ReactNode }) => {


  return (
    <html lang="en">
      <body >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="w-full h-screen">
            {/*---------------------------------------------------- header section ------------------------------------------------------------------------------------------ */}
            <header className="flex justify-between h-16 shrink-0 z-20 bg-white items-center border-b gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 top-0 sticky">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              {/* right side */}
              <div className="rightSide">
                <div className="flex items-center gap-2 ml-auto pr-8">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div className='p-2 rounded bg-gray-100 hover:bg-gray-200'>
                        <Bell size={18} />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent avoidCollisions={true} align='end'>
                      <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>

            {/* portal where child routes are mounted */}
            <div className="flex flex-1 flex-col w-full h-full bg-[#F8F8FB] overflow-y-auto mx-auto ">
              <div className="outlet maximum-width w-full h-full">
                {children}
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}

export default PrivateLayout
