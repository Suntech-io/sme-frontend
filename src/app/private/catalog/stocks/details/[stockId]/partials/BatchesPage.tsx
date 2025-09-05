'use client';

import ButtonLoading from '@/customComponents/Button';
import React, { useState } from 'react'
import StocksBatchCard from './StocksBatchCard';
import { IStocksBatchCardProps } from './StockBatchInterfaces';
import AddBatchSlider from './AddBatchSlider';

const stockBatches: IStocksBatchCardProps[] = [
  { batchName: 'Batch B001', condition: 'Good', costPrice: 45.5, expiryDate: '24 Dec 2028', quantity: 120, supplierName: 'Berma Akoto Ventures', totalValue: 5485.90 },
  { batchName: 'Batch B002', condition: 'Expired', costPrice: 30.0, expiryDate: '15 Jan 2023', quantity: 80, supplierName: 'Global Supplies Ltd.', totalValue: 2400.00 },
  { batchName: 'Batch B003', condition: 'Good', costPrice: 50.0, expiryDate: '10 Oct 2025', quantity: 200, supplierName: 'Fresh Farms Co.', totalValue: 10000.00 },
  { batchName: 'Batch B004', condition: 'Good', costPrice: 60.0, expiryDate: '05 May 2026', quantity: 150, supplierName: 'Quality Goods Inc.', totalValue: 9000.00 },
  { batchName: 'Batch B005', condition: 'Expired', costPrice: 40.0, expiryDate: '30 Nov 2022', quantity: 60, supplierName: 'Local Traders', totalValue: 2400.00 },
]

const BatchesPage = () => {
  const [showAddBadge, setshowAddBadge] = useState<boolean>(false)

  return (
    <div className='StockBatchesPage bg-gray-100 p-8 rounded-xl border'>
      {/* header part */}
      {/* heading */}
      <div className='flex items-center justify-between gap-10'>
        <div className="leftSide">
          <p className='text-lg font-semibold'>Stock Batches</p>
          <p className='mt-1 text-mediumGrey text-sm'>These are different batches of this stock that has been added so far</p>
        </div>

        {/* right side */}
        <div className="rightSide">
          <ButtonLoading title='Add New Batch' leftIcon='material-symbols:add-rounded' onClick={() => setshowAddBadge(true)} />
        </div>
      </div>


      {/* Batch cards */}
      <div className="my-8 batchCards space-y-8">
        {stockBatches.map((batch, index) => (
          <div className="" key={index}>
            <StocksBatchCard
              batchName={batch.batchName}
              condition={batch.condition}
              costPrice={batch.costPrice}
              expiryDate={batch.expiryDate}
              quantity={batch.quantity}
              supplierName={batch.supplierName}
              totalValue={batch.totalValue}
            />
          </div>
        ))}
      </div>


      {/* MODALS AND SIDE DRAWERS */}
      <AddBatchSlider open={showAddBadge} onOpenChange={setshowAddBadge} />
    </div>
  )
}

export default BatchesPage
