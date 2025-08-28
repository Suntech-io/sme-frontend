'use client';


import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardDescription } from '@/components/ui/card';
import { BadgeCheckIcon, Building2, CircleAlert, Edit, Eye, NotebookPenIcon, ReceiptCentIcon, SquareActivityIcon, Trash2 } from 'lucide-react';
import React from 'react'
import BatchStatsCard from './BatchStatsCard';
import { IStocksBatchCardProps } from './StockBatchInterfaces';
import ButtonLoading from '@/customComponents/Button';


const StocksBatchCard = ({ batchName, condition, costPrice, expiryDate, quantity, supplierName, totalValue }: IStocksBatchCardProps) => {
  return (
    <div className='StockBatchCard  bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all'>
      {/* header */}
      <div className="headerPart flex items-center justify-between">
        {/* left side */}
        <div className="leftSide">
          {/* batch name and status */}
          <div className="batchNameStatus flex items-center gap-4">
            <p className="batchNumber font-semibold text-lg">{batchName}</p>

            <div className="dot bg-gray-500 size-2 rounded-full"></div>

            <div className="tag">
              {/* good tag */}
              {false ? <Badge
                variant="secondary"
                className="bg-emerald-400 text-white dark:bg-blue-600"
              >
                <BadgeCheckIcon />
                Good Condition
              </Badge> :
                <Badge
                  variant="secondary"
                  className="bg-red-400 text-white dark:bg-blue-600"
                >
                  <CircleAlert />
                  Expired
                </Badge>}
            </div>
          </div>

          {/* supplier details */}
          <div className="flex items-center space-x-2 mt-2">
            <Building2 className="h-4 w-4 text-slate-500" />
            <CardDescription className="text-slate-600 font-medium">
              Supplier: {supplierName}
            </CardDescription>
          </div>
        </div>

        {/* right side */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            // onClick={() => handleViewBatch(batch)}
            className="border-slate-200 hover:border-cyan-300 hover:bg-cyan-50 transition-colors"
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            // onClick={() => handleEditBatch(batch)}
            className="border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            // onClick={() => handleDeleteBatch(batch.id)}
            className="border-slate-200 hover:border-red-300 hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>

      {/*batch stats cards */}
      <div className="batchStatsCards grid grid-cols-4 gap-4 mt-6">
        <BatchStatsCard title='Quantity' value={quantity} />
        <BatchStatsCard title='Cost Price' value={costPrice} />
        <BatchStatsCard title='Expiry Date' value={expiryDate} />
        <BatchStatsCard title='Total Value' value={totalValue} />
      </div>

      {/* Batch notes */}
      <div className="notes mt-4 border p-4 rounded-lg bg-gray-50">
        <div className="header flex items-center space-x-2">
          <NotebookPenIcon className="h-4 w-4 text-slate-500" />
          <CardDescription className="text-slate-600 font-medium">
            Notes
          </CardDescription>
        </div>


        <p className="text-slate-700 mt-2 text-sm ">
          This batch contains 120 units of the product, sourced from Berma Akoto Ventures. The cost price per unit is $45.50, and the total value of the batch is $5,485.90. The products in this batch are in good condition and have an expiry date of 24 Dec 2028.
        </p>

      </div>

      <div className="paymentNMovements mt-4 flex items-center space-x-4">
        <div className="paymentSlip flex items-center space-x-2 p-2 border border-primary/50 rounded-lg bg-primary/5 text-primary">
          <ReceiptCentIcon className="h-4 w-4 text-slate-500" />
          <CardDescription className="text-slate-600 font-medium">
            {1} Payment Slip
          </CardDescription>
        </div>
        <div className="movements flex items-center space-x-2 p-2 border border-green-500 rounded-lg bg-green-50">
          <SquareActivityIcon className="h-4 w-4 text-slate-500" />
          <CardDescription className="text-slate-600 font-medium">
            {3} Movements
          </CardDescription>
        </div>
      </div>

      {/* batch actions */}
      <div className="batchActions mt-5 flex items-center space-x-4">
        <ButtonLoading title='Add Payment' outline leftIcon='streamline-ultimate:receipt' className='hover:bg-primary hover:text-white'/>
        <ButtonLoading title='Add Movement' outline leftIcon='ph:trend-up-light' className='hover:bg-primary hover:text-white'/>
        <ButtonLoading title='Export' outline leftIcon='icon-park-outline:export'/>
      </div>

    </div>
  )
}

export default StocksBatchCard

