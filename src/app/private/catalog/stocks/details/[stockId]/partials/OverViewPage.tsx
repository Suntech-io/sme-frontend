'use client'

import AppDivider from '@/customComponents/AppDivider'
import dayjs from 'dayjs'
import { TrendingUp } from 'lucide-react'
import React from 'react'

const OverViewPage = () => {
    return (
        <div className='bg-white p-8 rounded-xl border grid grid-cols-2 gap-8'>
            {/* stock information */}
            <div className="stockInformation space-y-8 hover:shadow-sm border p-4 rounded-lg">
                {/* heading */}
                <div className=''>
                    <p className='text-lg font-semibold'>Stock Information</p>
                    <p className='mt-1 text-mediumGrey text-sm'>Find below the details of the stock item...</p>
                </div>

                <div className="details grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-sm font-medium text-slate-600">Stock Name</label>
                        <p className="text-slate-900">Tomato</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-600">Stock Type</label>
                        <p className="text-slate-900">Perishable</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-600">Measurement Category</label>
                        <p className="text-slate-900">Weight</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-600">Stock Limit</label>
                        <p className="text-slate-900">50</p>
                    </div>
                </div>

                {/* app divider */}
                <div className="appDivider">
                    <AppDivider position='center' text='Stock Notes text-darkGrey' />
                    <p className="stockNotes mt-2 text-sm">
                        These are some long as notes Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, provident id nesciunt veniam excepturi molestiae ut possimus repellendus ex quas, laudantium nisi, harum numquam. Non libero veritatis qui officia quia.
                    </p>
                </div>



            </div>

            {/* recent Activity */}
            <div className="recentActivity hover:shadow-sm border p-4 space-y-8 rounded-lg">
                {/* heading */}
                <div className=''>
                    <p className='text-lg font-semibold'>Recent Activity</p>
                    <p className='mt-1 text-mediumGrey text-sm'>Recent Activities that has happened on this stock...</p>
                </div>

                <div className="recentActivity divide-y">
                    {/* activity */}
                    {[1, 2, 3, 4].map(el => (
                        <div
                            className="flex activity items-center justify-between p-2 px-4"
                            key={el}
                        >
                            <div className="flex items-center space-x-3">
                                <div
                                    className={`p-1 rounded-full bg-green-100`}
                                >
                                    <TrendingUp className="h-3 w-3 text-green-600" />
                                </div>
                                <div>
                                    <p className="text- font-medium text-slate-900">Purchase</p>
                                    <p className="text-xs text-slate-500">SO-2024-005</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text- font-medium text-slate-900">{Math.abs(50)}</p>
                                <p className="text-xs text-slate-500">{'23-09-2025'}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default OverViewPage
