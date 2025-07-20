'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import CustomLinkTabs from './CustomLinkTabs'
import { ILinkTab } from './CustomLinkTabs'

type IServicesTitle = 'All Services' | 'Categories' | 'Analytics'
type IServicesLink = '/private/catalog/services/list' | '/private/catalog/services/categories' | '/private/catalog/services/analytics'



const settingsPages: ILinkTab<{ title: IServicesTitle, link: IServicesLink }>[] = [
    { title: 'All Services', link: '/private/catalog/services/list' },
    { title: 'Categories', link: '/private/catalog/services/categories' },
    { title: 'Analytics', link: '/private/catalog/services/analytics' },
]

const ServicesTabs = () => {
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

export default ServicesTabs
