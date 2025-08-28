'use client';

import { SquarePenIcon, Trash2Icon } from 'lucide-react';
import React from 'react'

const UnitSizeCard = () => {
    return (
        <div className='UnitSizeCard bg-white hover:scale-[100.2%] rounded-lg p-4 shadow-sm hover:shadow-md transition-all'>
            {/* header */}
            <div className="header flex items-center justify-between">
                {/* title */}
                <p className="unitTitle font-thin text-gray-500 text-lg">Small</p>
                {/* actions */}
                <div className="actions flex items-center space-x-3 ">
                    {/* edit */}
                    <button className='text-blue-600 font-medium text-sm hover:underline'>
                        <SquarePenIcon className='size-4' />
                    </button>
                    {/* delete */}
                    <button className='text-red-600 font-medium text-sm hover:underline'>
                        <Trash2Icon className='size-4' />
                    </button>
                </div>

            </div>
            {/* value */}
            <div className="value mt-4 flex items-center space-x-2">
                <p className='text-gray-600 text-3xl font-semibold'>5</p>
                <p className='text-[11px] bg-primary/10 px-4 py-0.5 rounded-full'>Litres</p>
            </div>

            {/* packages unit size has been used in */}
            <div className="packagesUsedIn mt-4">
                <p className='text-sm text-mediumGrey italic font-light'>Used in 3 Packages</p>
            </div>

        </div>
    )
}

export default UnitSizeCard
