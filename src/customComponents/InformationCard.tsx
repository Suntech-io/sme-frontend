'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import IconifyIcon from './IconifyIcon';


interface IInformationCardProps {
    styling?: {
        mainContainer?: string;
        icon?: string;
        description?: string;
        title?: string;
        info?:string
    };
    title?: string;
    description?: React.ComponentType<any> | React.ReactElement | string;
    icon?: string
}

const InformationCard = ({ styling, description, icon, title }: IInformationCardProps) => {
    return (
        <div className={cn('rounded-lg flex items-center gap-4 border p-3',styling?.mainContainer)} >
            {/* icon */}
            <IconifyIcon icon={icon || 'noto-v1:information'} className={cn('',styling?.icon)}/>

            {/* information part */}
            <div className={cn("infoContent",styling?.info)}>
                {/* title */}
                <p className={cn('title font-semibold',styling?.title)}>{title}</p>

                <div className={cn("description text-sm text-gray-500",styling?.description)}>
                    {description &&
                        (typeof description === "function"
                            ? React.createElement(description)
                            : description)}
                </div>
            </div>
        </div>
    )
}

export default InformationCard
