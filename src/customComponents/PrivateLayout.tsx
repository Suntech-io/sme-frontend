'use client'

import { useAppSettingsStore } from '@/app/store/appSettings'
import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

const PrivateLayoutLocal = ({ children }: { children: ReactNode }) => {
    const { noMaxWidthStatus } = useAppSettingsStore()

    return (
        <div className={cn("w-full h-full min-h-fit", !noMaxWidthStatus && 'maximum-width')}>
            {children}
        </div>
    )
}

export default PrivateLayoutLocal
