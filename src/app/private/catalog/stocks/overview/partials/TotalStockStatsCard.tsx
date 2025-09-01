'use client';

import { ClipboardCheckIcon, TrendingUpIcon } from 'lucide-react';
import React from 'react'

interface ITotalStockStatsCardProps {
    cardTitle?: string;
    value?: number;
    trend?: number;
}

const TotalStockStatsCard = ({ cardTitle, trend, value }: ITotalStockStatsCardProps) => {
    return (
        <div className='TotalStockStatsCard rounded-xl bg-white shadow p-4'>
            <div className="header flex items-center justify-between">
                <h2 className='text-2xl font-semibold'>{value}</h2>
                <div className="icon rounded-full bg-primary/10 text-primary p-2 ">
                    <ClipboardCheckIcon className='size-4' />
                </div>
            </div>

            <p className='mt-2 text-lg font-medium text-darkGrey'>{cardTitle}</p>

            {/* trend */}
            <div className="trend mt-6 flex items-center gap-2">
                {/* icon */}
                <div className="trendIcon">
                    {/* upwardTrend */}
                    {trend && trend > 0 ? (
                        <TrendingUpIcon className='size-4 text-green-500' />
                    ) : (
                        <TrendingUpIcon className='rotate-180 size-4 text-red-500' />
                    )}
                </div>

                <div className="trendInfo flex items-center text-gray-500 text-sm tracking-wide">
                    {/* sign */}
                    <div>{trend && trend > 0 ? '+' : ''}</div>
                    <div><span>{trend}</span>% <span>{trend && trend > 0 ? 'up' : 'down'}</span> last month</div>
                </div>
            </div>
        </div>
    )
}

export default TotalStockStatsCard
