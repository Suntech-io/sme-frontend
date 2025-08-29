'use client';

import ButtonLoading from '@/customComponents/Button';
import React from 'react'
import SupplierCard from './SupplierCard';

const SuppliersPage = () => {
  return (
    <div className='bg-gray-100 p-8 rounded-xl border'>
      {/* heading */}
      <div className='flex items-center justify-between gap-10'>
        <div className="leftSide">
          <p className='text-lg font-semibold'>Suppliers</p>
          <p className='mt-1 text-mediumGrey text-sm'>These are the suppliers that you've purchased {'Banku'} from so far</p>
        </div>

      </div>

      <div className="supplierCard space-y-6  my-8 supplierCard">
        <SupplierCard />
      </div>
    </div>
  )
}

export default SuppliersPage
