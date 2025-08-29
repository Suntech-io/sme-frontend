'use client';

import ButtonLoading from '@/customComponents/Button';
import React from 'react'

const SupplierCard = () => {
    return (
        <div className='supplierCard group bg-white rounded-lg p-7 shadow-sm hover:shadow-md transition-all'>
            <div className="header flex items-center justify-between">
                <div className="nameNBatchCount">
                    <p className="supplierName font-semibold text-lg">Supplier Name</p>
                    <p className="batchCount text-sm font-light text-mediumGrey italic">3 Batches Supplied</p>
                </div>

                <div className="viewDetailsBtn">
                    <ButtonLoading title='View Supplier' className='hidden group-hover:block' />
                </div>
            </div>


            {/* lower section */}
            <div className="lowerSection mt-8 flex items-center justify-between">
                <div className="totalQuantity">
                    <p className='text-sm font-light text-mediumGrey'>Total Quantity</p>
                    <p className='text-xl font-semibold'>120</p>
                </div>
                <div className="totalValue">
                    <p className='text-sm font-light text-mediumGrey'>Total Value</p>
                    <p className='text-xl font-semibold'><span>$</span><span>5460.00</span></p>
                </div>
                <div className="avgBatchCost">
                    <p className='text-sm font-light text-mediumGrey'>Average Badge Cost</p>
                    <p className='text-xl font-semibold'><span>$</span><span>400.00</span></p>
                </div>
            </div>
        </div>
    )
}

export default SupplierCard
