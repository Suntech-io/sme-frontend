'use client'

import IconifyIcon from '@/customComponents/IconifyIcon'
import { cn } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from '@/customComponents/datatable'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const userData = [
  {
    member: 'Curtis Amui',
    email: 'sample@gmail.com',
    role: 'Administrator',
    dateCreated: '12 June,2025',
    status: 'Active',
  },
  {
    member: 'Sammy Mensah',
    email: 'sample@gmail.com',
    role: 'Administrator',
    dateCreated: '12 June,2025',
    status: 'Active',
  },
  {
    member: 'John Krah',
    email: 'sample@gmail.com',
    role: 'User',
    dateCreated: '12 June,2025',
    status: 'Active',
  },
  {
    member: 'Dray Red',
    email: 'sample@gmail.com',
    role: 'Sales Agent',
    dateCreated: '12 June,2025',
    status: 'Active',
  },
]

function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconifyIcon icon='solar:menu-dots-bold' />
      </PopoverTrigger>
      <PopoverContent className="w-40 px-2">
        <div className="grid gap-3">
          <div className="">
            {/* <p className="leading-none font-medium text-sm">Actions</p> */}

          </div>
          <div className="grid gap-2 text-xs text-darkGrey">
            <div className="grid p-2 hover:bg-gray-50">
              Edit
            </div>
            <div className="grid p-2 hover:bg-gray-50">
              Disable
            </div>
            <div className="grid p-2 hover:bg-gray-50">
              Delete
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const userColumns: ColumnDef<any>[] = [
  {
    header: "Member",
    id: "member",
    cell: ({ row }: any) => (
      <div className="flex items-center gap-2">
        {/* user image */}
        <div className="avatar size-10">
          <Avatar className='w-full !h-full'>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className="userInfo">
          <p className="name">{row.original.member}</p>
          <p className='text-xs text-gray-400'>{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    header: "Role",
    id: "role",
    accessorKey: "role",
  },
  {
    header: "Date Created",
    id: "dateCreated",
    accessorKey: "dateCreated",
  },
  {
    header: "Status",
    id: "status",
    cell: ({ row }: any) => (
      <div className="w-[120px]">
        <div className={cn("status flex items-center gap-1 rounded-lg", row.original?.status === 'Active' ? 'bg-[#3E875E] text-white' : 'bg-lightGrey')}>
          <IconifyIcon fontSize={16} icon={row.original?.status === 'Active' ? 'ic:round-check-circle' : 'mynaui:badge'} className={cn(row.original?.status === 'Active' ? 'text-white' : 'bg-lightGrey')} />
          <p>{row.original?.status}</p>
        </div>
      </div>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }: any) => (
      <PopoverDemo />
    ),
  },
]

const page = () => {
  return (
    <div className='userManagementPage'>
      <DataTable tableInformationContent={<div className='pb-5'>
        {/* left side */}
        <div className="leftSide">
          <p className='text-xl font-semibold'>User Management</p>
          <p className='mt-1 text-mediumGrey text-sm'>Manage details of members of your business</p>
        </div>
      </div>} columns={userColumns} data={userData} totalPages={1} />
    </div>
  )
}

export default page
