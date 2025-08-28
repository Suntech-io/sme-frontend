'use client';

import { cn } from '@/lib/utils';
import { Calendar, DollarSign, Package, TrendingUp } from 'lucide-react';
import React from 'react'


interface IBatchStatsCardProps {
    title: 'Quantity' | 'Cost Price' | 'Expiry Date' | 'Total Value',
    value: string | number
}

const BatchStatsCard = ({ title, value }: IBatchStatsCardProps) => {
    return (
        <div className={
            cn("BatchStatsCard p-4 border rounded-lg",
                //  title == 'Quantity' ? 'border-cyan-600 bg-cyan-50' : title == 'Cost Price' ? 'border-green-600 bg-green-50' : title == 'Expiry Date' ? 'border-red-500 bg-red-50' : 'border-purple-600 bg-purple-50'
                )
            }>
            <div className="header flex items-center gap-3">
                <div className="icon">
                    {title == 'Quantity' && <Package className="h-4 w-4 text-cyan-600" />}
                    {title == 'Cost Price' && <DollarSign className="h-4 w-4 text-green-600" />}
                    {title == 'Expiry Date' && <Calendar className="h-4 w-4 text-red-500" />}
                    {title == 'Total Value' && <TrendingUp className="h-4 w-4 text-purple-600" />}
                </div>
                <p className="text-lg font-medium">{title}</p>
            </div>

            <div className="value font-semibold text-xl mt-2 pl-7">
                {(title == 'Cost Price' || title == 'Total Value') && <span>$ </span>}
                <span className=''>{value}</span>
            </div>
            
        </div>
    )
}

export default BatchStatsCard
