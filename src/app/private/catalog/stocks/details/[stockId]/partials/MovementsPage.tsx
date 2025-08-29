'use client'

import DataTable from '@/customComponents/datatable'
import { cn } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import React from 'react'

const data: {
  date: string;
  movementType: string;
  quantity: number;
  batches: string | { batch: string, quantity: number }[];
}[] = [
    {
      date: "2023-01-01",
      movementType: "Increase",
      quantity: 100,
      batches: "Batch A",
    },
    {
      date: "2023-01-05",
      movementType: "Decrease",
      quantity: 50,
      batches: [{ batch: "Batch B", quantity: 25 }, { batch: "Batch C", quantity: 25 }],
    },
    {
      date: "2023-01-10",
      movementType: "Increase",
      quantity: 200,
      batches: "Batch C",
    },
    {
      date: "2023-01-15",
      movementType: "Decrease",
      quantity: 75,
      batches: "Batch D",
    },
  ]

const columns: ColumnDef<any>[] = [
  {
    header: "Date",
    id: "date",
    cell: ({ row }: any) => (
      <div className="max-w-fit">
        {dayjs(row.original?.date).format("DD MM YYYY")}
      </div>
    ),
  },
  {
    header: "Movement type", cell: ({ row, }: any) => (
      <div className="max-w-fit">
        <p className={cn("px-4 py-1 rounded-full text-xs font-medium w-fit", (row.original?.movementType === "Increase" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"))}>
          {row.original?.movementType}
        </p>
      </div>
    ),
  },
  {
    header: "Quantity",
    id: "quantity",
    cell: ({ row }: any) => (
      <div className={cn("max-w-fit flex items-center space-x-0.5", (row.original?.movementType === "Increase" ? "text-green-500" : "text-red-500"))}>
        <span className=''>
          {row.original?.movementType === "Increase" ? "+" : "-"}
        </span>
        <span className={cn('')}>
          {(row.original?.quantity)}
        </span>
      </div>
    ),
  },
  {
    header: "Batch", cell: ({ row }: any) => (
      <div className="max-w-fit">
        {typeof row.original?.batches === 'string' ? (
          row.original?.batches
        ) : (
          <ul className='list-disc list-inside'>
            {row.original?.batches.map((batchObj: any, index: number) => (
              <li key={index}>{batchObj.batch} - {batchObj.quantity}</li>
            ))}
          </ul>
        )}
      </div>
    ),
  },
]

const MovementsPage = () => {
  return (
    <div className=''>
      <DataTable totalPages={1} columns={columns} data={data} tableInformationContent={<div className='pb-5'>
        <p className='text-xl font-semibold'>Stock Movements</p>

        <p className='mt-1 text-darkGrey text-sm'>This table shows all the movements that have happened on this stock.</p>
      </div>} />
    </div>
  )
}

export default MovementsPage
