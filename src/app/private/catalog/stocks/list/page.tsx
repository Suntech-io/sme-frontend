'use client'


import React, { useState } from 'react'
import IconifyIcon from '@/customComponents/IconifyIcon'
import { cn } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from '@/customComponents/datatable'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ButtonLoading from '@/customComponents/Button'
import AddServiceModal from '@/customComponents/services/AddServiceModal'
import AddStockModal from '@/customComponents/settings/AddStockModal'
import StockInModal from '@/customComponents/settings/StockInSideModal'
import { ITableActionsComponentProps, TableActionsComponent } from '@/customComponents/TableActionsComponent'
import StockOutSideModal from '@/customComponents/settings/StockOutSideModal'
import { useRouter } from 'next/navigation'










const stocksData = [
  {
    id:1,
    stockName: 'Apple iPhone 14',
    // category: 'Electronics',
    quantity: 50,
    type: 'perishable',
    dateAdded: '15 March, 2025',
    status: 'In Stock',
  }
]




const page = () => {
  const router = useRouter()

  const [showAddStockModal, setShowAddStockModal] = useState<boolean>(false)
  const [showStockInModal, setshowStockInModal] = useState<boolean>(false)
  const [showStockOut, setshowStockOut] = useState<boolean>(false)

  // the stock table actions meta
  const stockActions: ITableActionsComponentProps =
  {
    title: 'Stock Actions', actions: [
      { component: 'View Stock', onClick: (data) => router.push(`/private/catalog/stocks/details/${data.id}`), icon: 'carbon:data-view' },
      { component: 'Increase Stock', onClick: () => setshowStockInModal(true), icon: 'carbon:task-add' },
      { component: 'Decrease Stock', onClick: () => setshowStockOut(true), icon: 'carbon:task-remove' },
    ]
  }

  const columns: ColumnDef<typeof stocksData[number]>[] = [
    {
      accessorKey: 'stockName',
      header: 'Stock Name',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'dateAdded',
      header: 'Date Added',
      cell: info => info.getValue(),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (info) => <TableActionsComponent actions={stockActions.actions} title={stockActions.title} rowData={info.row.original}/>,
    },
  ]

  return (
    <div>
      <DataTable tableInformationContent={<div className='pb-5 flex justify-between items-center'>
        {/* left side */}
        <div className="leftSide">
          <p className='text-xl font-semibold'>All Stocks</p>
          <p className='mt-1 text-mediumGrey text-sm'>Manage al the stocks used in providing your services or manufacturing your products here</p>
        </div>
        {/* right side */}
        <div className="rightSide">
          <ButtonLoading title='Add Stock' leftIcon='formkit:add' className='cursor-pointer w-fit' onClick={() => {router.push('/private/catalog/stocks/add') }} />
        </div>
      </div>} columns={columns} data={stocksData} totalPages={1} addFiltering />


      {/* MODALS */}
      {/* add stock modal */}
      <AddStockModal
        modal={true}
        open={showAddStockModal}
        onOpenChange={(open) => setShowAddStockModal(open)}
      />

      {/* stock in modal */}
      <StockInModal onOpenChange={() => { setshowStockInModal(false) }} open={showStockInModal} />

      {/* stock out modal */}
      <StockOutSideModal
        open={showStockOut}
        onOpenChange={() => { setshowStockOut(false) }}
      />
    </div>
  )
}

export default page
