'use client';

import React, { useState } from 'react'
import IconifyIcon from '@/customComponents/IconifyIcon'
import { cn } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from '@/customComponents/datatable'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ButtonLoading from '@/customComponents/Button'
import { number } from 'zod';
import { Icon } from 'lucide-react';
import AddCategoryModal from '@/customComponents/services/AddCategoryModal';


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
                            Mark as Inactive
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

const categoriesData = [
    {
        icon: 'hugeicons:wellness',
        categoryName: 'Beauty & Wellness',
        numberOfServices: 12,
        description: 'Services related to personal care and wellness.',
        dateCreated: '12 June, 2025',
        status: 'Active',
    },
    {
        icon: 'lucide-lab:scissors-hair-comb',
        categoryName: 'Hair Care',
        numberOfServices: 8,
        description: 'Services focused on hair styling and treatments.',
        dateCreated: '20 May, 2025',
        status: 'Active',
    },
    {
        icon: 'emojione-monotone:nail-polish',
        categoryName: 'Nail Care',
        numberOfServices: 5,
        description: 'Manicure and pedicure services for nail care.',
        dateCreated: '15 April, 2025',
        status: 'Inactive',
    },
    {
        icon: 'tabler:paint',
        categoryName: 'Painting',
        numberOfServices: 7,
        description: 'Professional painting and decorative services.',
        dateCreated: '10 March, 2025',
        status: 'Active',
    },
    {
        icon: 'hugeicons:chair-barber',
        categoryName: 'Barbering',
        numberOfServices: 10,
        description: 'Barbering and grooming services for men.',
        dateCreated: '5 February, 2025',
        status: 'Active',
    },
];

const columns: ColumnDef<typeof categoriesData[number]>[] = [
    {
        accessorKey: 'icon',
        header: 'Icon',
        cell: ({ row }) => (
            <IconifyIcon
                icon={row.original.icon}
                className="text-2xl"
            />
        ),
    },
    {
        accessorKey: 'categoryName',
        header: 'Category Name',
    },
    {
        accessorKey: 'numberOfServices',
        header: 'Number of Services',
    },
    {
        accessorKey: 'dateCreated',
        header: 'Date Created',
    }, {
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
        id: 'actions',
        cell: ({ row }) => (
            <PopoverDemo />
        ),
    },
];

const page = () => {
    const [showAddServiceModal, setshowAddServiceModal] = useState<boolean>(false)


    return (
        <div className='userManagementPage'>
            <AddCategoryModal modal={true} open={showAddServiceModal} onOpenChange={setshowAddServiceModal} />

            <DataTable tableInformationContent={<div className='pb-5 flex justify-between items-center'>
                {/* left side */}
                <div className="leftSide">
                    <p className='text-xl font-semibold'>Categories</p>
                    <p className='mt-1 text-mediumGrey text-sm'>Manage the categories your services fall under.</p>
                </div>
                {/* right side */}
                <div className="rightSide">
                    <ButtonLoading title='Add Category' leftIcon='formkit:add' className='cursor-pointer w-fit' onClick={() => { setshowAddServiceModal(true) }} />
                </div>
            </div>} columns={columns} data={categoriesData} totalPages={1} addFiltering />
        </div>
    )
}

export default page
