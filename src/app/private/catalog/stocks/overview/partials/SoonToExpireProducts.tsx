'use client';

import MonthPicker from '@/customComponents/MonthPicker';
import React from 'react'

const SoonToExpireProducts = () => {
    return (
        <div className='bg-white p-4 rounded-xl'>
            {/* header part */}
            <div className="header flex items-center justify-between">
                <h2 className='text-lg font-semibold'>Expiring Products</h2>

                {/* month picker */}
                <MonthPicker />
            </div>
        </div>
    )
}

export default SoonToExpireProducts
