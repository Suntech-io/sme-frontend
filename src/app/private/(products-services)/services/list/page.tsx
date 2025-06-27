'use client'


import React, { useState } from 'react'
import IconifyIcon from '@/customComponents/IconifyIcon'
import { cn } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from '@/customComponents/datatable'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import AddMemberModal from '@/customComponents/settings/AddMemberModal'
import ButtonLoading from '@/customComponents/Button'


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

const servicesData = [
  {
    serviceName: 'Manicure and Pedicure',
    category: 'Beauty & Wellness',
    priceType: 'One-time',
    description: 'A relaxing service for your hands and feet, including nail care and polish.',
    price: '300',
    dateCreated: '12 June,2025',
    status: 'Active',
  },
    {
      serviceName: 'Hair Styling',
      category: 'Hair Care',
      priceType: 'Hourly',
      description: 'Professional hair styling services including cuts, blowouts, and treatments.',
      price: '150 - 500',
      dateCreated: '20 May,2025',
      status: 'Active',
    },
    {
      serviceName: 'Facial Treatment',
      category: 'Skin Care',
      priceType: 'Monthly',
      description: 'Deep cleansing and rejuvenating facial treatments for all skin types.',
      price: '400',
      dateCreated: '5 April,2025',
      status: 'Inactive',
    },
    {
      serviceName: 'Massage Therapy',
      category: 'Wellness',
      priceType: 'Session',
      description: 'Therapeutic massage sessions to relieve stress and muscle tension.',
      price: '250',
      dateCreated: '18 March,2025',
      status: 'Active',
    },
    {
      serviceName: 'Makeup Application',
      category: 'Beauty',
      priceType: 'Per Event',
      description: 'Professional makeup services for special occasions and events.',
      price: '350',
      dateCreated: '28 February,2025',
      status: 'Inactive',
    },
]

const serviceColumns: ColumnDef<any>[] = [
  {
    header: "Service Name",
    id: "serviceName",
    cell: ({ row }: any) => (
      <div className="flex items-center gap-2">
        {/* user image */}
        <div className="avatar size-10">
          <Avatar className='w-full !h-full rounded-sm'>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className="userInfo">
          <p className="name">{row.original.serviceName}</p>
          <p className='text-xs text-gray-400 max-w-[300px] text-ellipsis line-clamp-1'>{row.original.description}</p>
        </div>
      </div>
    ),
  },
  {
    header: "Category",
    id: "category",
    cell: ({ row }: any) => (
      <div className={cn("max-w-fit flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 border-gray-600 text-gray-600")} >
        <div className={cn("dot size-1 rounded-full bg-current")}></div>
        {row.original.category}
      </div>
    ),
  },
  {
    header: "Price Type",
    id: "priceType",
    accessorKey: "priceType",
  },
  {
    header: "Price",
    id: "price",
    accessorKey: "price",
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
        <div className={cn("status flex items-center gap-1 rounded-xl", row.original?.status === 'Active' ? 'bg-[#3E875E] text-white' : 'bg-lightGrey')}>
          <IconifyIcon fontSize={16} icon={row.original?.status === 'Active' ? 'ic:round-check-circle' : 'carbon:in-progress'} className={cn(row.original?.status === 'Active' ? 'text-white' : 'bg-lightGrey')} />
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
  const [showAddServiceModal, setshowAddServiceModal] = useState<boolean>(false)


  return (
    <div className='userManagementPage'>
      <AddMemberModal modal={true} open={showAddServiceModal} onOpenChange={setshowAddServiceModal} />

      <DataTable tableInformationContent={<div className='pb-5 flex justify-between items-center'>
        {/* left side */}
        <div className="leftSide">
          <p className='text-xl font-semibold'>All Services</p>
          <p className='mt-1 text-mediumGrey text-sm'>Manage the services you business renders here.</p>
        </div>
        {/* right side */}
        <div className="rightSide">
          <ButtonLoading title='Add Service' leftIcon='formkit:add' className='cursor-pointer w-fit' onClick={() => { setshowAddServiceModal(true) }} />
        </div>
      </div>} columns={serviceColumns} data={servicesData} totalPages={1} addFiltering />
    </div>
  )
}

export default page
