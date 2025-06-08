'use client'

import React from 'react'
import IconifyIcon from '../IconifyIcon'

interface StatsCardProps {
    icon?: string;
    title: string;
    value: string | number;
    growthPercentage: string | number;
    growthDirection: 'up' | 'down';
}

const StatsCard = ({ growthDirection = 'up', growthPercentage, title, value, icon = 'mdi:dollar' }: StatsCardProps) => {
    return (
        <div className='bg-white p-4 rounded-lg shadow'>
            {/* header */}
            <div className="header flex items-center gap-3">
                {/* icon */}
                <div className="icon p-1.5 rounded bg-primary/10 text-primary">
                    <IconifyIcon icon={icon} />
                </div>
                {/* title */}
                <p className="cardTitle text-base font-medium">{title}</p>
            </div>

            {/* growth */}
            <div className="growth flex items-center mt-4">
                <p className="text-xl font-semibold">
                    {value}
                </p>

                <IconifyIcon icon={`ep:arrow-${growthDirection}-bold`} className='' style={{ color: growthDirection == 'up' ? '#00A63E' : '#fb2c36' }} />

            </div>

            {/* footer */}
            <div className="footer flex items-center gap-2 mt-4">
                <div className='text-sm flex items-center rounded pr-2' style={{
                    color: growthDirection == 'up' ? '#00A63E' : '#fb2c36',
                    backgroundColor: growthDirection == 'up' ? '#E6F9E6' : '#FDEDED',
                }}><span className=''><IconifyIcon icon='basil:plus-outline' className='' /></span> {growthPercentage}%</div>
                <p className="text-sm text-mediumGrey">
                    from previous month
                </p>
            </div>
        </div>
    )
}

export default StatsCard
