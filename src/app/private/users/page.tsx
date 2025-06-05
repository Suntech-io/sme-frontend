'use client'


import DataTable from '@/customComponents/datatable'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import dayjs from 'dayjs'
import { Button } from '@/components/ui/button'

const columns:ColumnDef<any>[] = [
  {
    header: "Plot ID",
    id: "plotId",
    cell: ({ row }: any) => (
      <div className="max-w-fit">{row.original?.propertyId?.plotId}</div>
    ),
  },
  { header: "Location", accessorKey: "propertyId.location" },
  {
    header: "Duration",
    id: "duration",
    cell: ({ row }: any) => (
      <div className="max-w-fit">
        {dayjs(row.original?.startDate).format("DD MM YYYY")}-{" "}
        {dayjs(row.original?.startDate).format("DD MM YYYY")}
      </div>
    ),
  },
]

const data = [
  {
    propertyId: {
      plotId: "123",
      location: "Location A",
    },
    startDate: "2023-01-01",
  },
  {
    propertyId: {
      plotId: "456",
      location: "Location B",
    },
    startDate: "2023-02-01",
  },
]

const page = () => {
  return (
    <div className='p-4'>
      <DataTable columns={columns} data={data} totalPages={1} showAddButton={false} addSearch addFiltering/>
    </div>
  )
}

export default page
