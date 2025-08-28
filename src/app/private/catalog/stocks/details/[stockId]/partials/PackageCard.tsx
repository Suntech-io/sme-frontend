'use client';

import { FocusIcon, Package, SquarePenIcon, Trash2Icon } from 'lucide-react';
import React from 'react'

const PackageCard = () => {
    return (
        <div className='packageCard bg-white hover:scale-[100.2%] rounded-lg p-4 shadow-sm hover:shadow-md transition-all'>
            {/* header */}
            <div className="header flex items-center justify-between">
                {/* title */}
                <p className="unitTitle font-thin text-gray-500 text-lg">Large Box</p>
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

            {/* unit size name */}
            {/* <div className="unitSizeName flex items-center text-sm space-x-2 mt-2 text-primary px-4 py-1 bg-primary/10 rounded-full w-fit text">
                <FocusIcon className='size-3' />
                <p className="unitName">
                    Small
                </p>
            </div> */}

            {/* package size info */}
            {/* Package Details */}
            <div className="space-y-3 mt-4">
                <div className="flex items-center justify-between py-2 px-3 bg-primary/10 rounded-lg">
                    <span className="text-sm font-medium text-slate-700 italic">Unit in box</span>
                    <span className="text-lg font-bold text-slate-900">Small</span>
                </div>

                <div className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">Pieces per package</span>
                    <span className="text-lg font-bold text-slate-900">{10}</span>
                </div>

                <div className="border-t border-slate-100 pt-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Total package size</span>
                        <div className="text-right">
                            <div className="font-semibold text-slate-900">{10}</div>
                            <div className="text-xs text-slate-500">{'kg'}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Package Stats */}
            <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        <span>Active</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        <span>Package #{1}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PackageCard
