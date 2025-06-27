'use client';

import React from 'react'

const TopCustomers = () => {
  return (
    <div className='p-4 bg-white rounded-xl shadow'>
            {/* header */}
            <div className="headerSide flex items-center justify-between">
                <p className="text-base font-semibold">Top Customers</p>
            </div>

            {/* products list */}
            <div className="products mt-9 flex flex-col gap-4 divide-y *:pb-4">
                <div className="product flex items-center justify-between">
                    <div className="imgDets flex items-center gap-2">
                        {/* image */}
                        <div className="image size-[70px] bg-lightGrey rounded-full"></div>
                        {/* details */}
                        <div className="details">
                            <p className="text-sm font-semibold">Nike Supreme</p>
                            <p className="text-xs text-darkGrey">Men's running shoe</p>
                        </div>
                    </div>

                    <div className="percentage">
                        <p className="text-sm font-semibold">78%</p>
                        <p className="text-xs text-darkGrey">Sales</p>
                    </div>
                </div>
                <div className="product flex items-center justify-between">
                    <div className="imgDets flex items-center gap-2">
                        {/* image */}
                        <div className="image size-[70px] bg-lightGrey rounded-full"></div>
                        {/* details */}
                        <div className="details">
                            <p className="text-sm font-semibold">Nike Supreme</p>
                            <p className="text-xs text-darkGrey">Men's running shoe</p>
                        </div>
                    </div>

                    <div className="percentage">
                        <p className="text-sm font-semibold">78%</p>
                        <p className="text-xs text-darkGrey">Sales</p>
                    </div>
                </div>
                <div className="product flex items-center justify-between">
                    <div className="imgDets flex items-center gap-2">
                        {/* image */}
                        <div className="image size-[70px] bg-lightGrey rounded-full"></div>
                        {/* details */}
                        <div className="details">
                            <p className="text-sm font-semibold">Nike Supreme</p>
                            <p className="text-xs text-darkGrey">Men's running shoe</p>
                        </div>
                    </div>

                    <div className="percentage">
                        <p className="text-sm font-semibold">78%</p>
                        <p className="text-xs text-darkGrey">Sales</p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default TopCustomers
