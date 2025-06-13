'use client'

import { Input } from '@/components/ui/input'
import ButtonLoading from '@/customComponents/Button'
import DataTable from '@/customComponents/datatable'
import { Label } from '@/components/ui/label'
import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import React from 'react'


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



const FIlterComponent = () => {
  return (
    <div className="grid gap-4 p-2">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Dimensions</h4>
            <p className="text-muted-foreground text-sm">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>

  )
}



const page = () => {
    return (
        <div>
            <div className="headerSection flex  justify-between">
                {/* header and sub header section */}
                <div className="leftSide">
                    <p className="subHeader text-[24px] text-darkGrey">
                        Product Management
                    </p>

                    <p className='subText text-base mt-2 text-darkGrey'>Manage your products, track inventory, and monitor product health</p>
                </div>

                {/* right side buttons */}
                <div className="rightSide flex items-center gap-4">
                    <ButtonLoading title='Bulk Upload' leftIcon='mynaui:upload' outline />
                    <ButtonLoading title='Add Product' leftIcon='formkit:add' />

                </div>
            </div>


            {/* tabs */}
            <div className="productListTable mt-10">
                <DataTable columns={columns} data={data} totalPages={1} showAddButton={false} addSearch addFiltering filterContent={FIlterComponent}/>
            </div>
        </div>
    )
}

export default page
