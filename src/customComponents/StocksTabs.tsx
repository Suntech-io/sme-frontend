'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import CustomLinkTabs from './CustomLinkTabs'
import { ILinkTab } from './CustomLinkTabs'

type IServicesTitle = 'All Stocks' | 'Categories' | 'Analytics' | 'Overview'
type IServicesLink = '/private/catalog/stocks/list' | '/private/catalog/stocks/categories' | '/private/catalog/stocks/analytics' | '/private/catalog/stocks/overview'



const settingsPages: ILinkTab<{ title: IServicesTitle, link: IServicesLink }>[] = [
    { title: 'Overview', link: '/private/catalog/stocks/overview' },
    { title: 'All Stocks', link: '/private/catalog/stocks/list' },
    { title: 'Categories', link: '/private/catalog/stocks/categories' },
    { title: 'Analytics', link: '/private/catalog/stocks/analytics' },
]

const StocksTabs = () => {
    const router = useRouter()

    const handleTabClicked = (value: any) => {
        console.log('value', value)
    }

    return (
        <div>
            <div className="newTabs">
                <CustomLinkTabs tabs={settingsPages} />
            </div>
        </div>
    )
}

export default StocksTabs
