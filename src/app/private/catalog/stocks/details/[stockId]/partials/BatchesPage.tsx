'use client';

import ButtonLoading from '@/customComponents/Button';
import React from 'react'
import StocksBatchCard from './StocksBatchCard';

const BatchesPage = () => {
  return (
    <div className='StockBatchesPage bg-white p-8 rounded-xl border'>
      {/* header part */}
      {/* heading */}
      <div className='flex items-center justify-between gap-10'>
        <div className="leftSide">
          <p className='text-lg font-semibold'>Stock Batches</p>
          <p className='mt-1 text-mediumGrey text-sm'>These are different batches of this stock that has been added so far</p>
        </div>

        {/* right side */}
        <div className="rightSide">
          <ButtonLoading title='Add New Batch' leftIcon='material-symbols:add-rounded' />

          {/* Batch cards */}
          <div className="my-8 batchCards">
            <StocksBatchCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BatchesPage
