'use client'

import React from 'react'
import CustomNavTabs from './CustomNavTabs'
import { useRouter } from 'next/navigation'
import CustomLinkTabs from './CustomLinkTabs'
import { ILinkTab } from './CustomLinkTabs'

type ISettingsTitle = 'User Profile' | 'Business Settings' | 'Store Configuration' | 'User Management' | 'Notifications'
type ISettingsLink = '/private/settings/user-profile' | '/private/settings/business-settings' | '/private/settings/store-configuration' |
    '/private/settings/user-management' | '/private/settings/notifications'



const settingsPages: ILinkTab<{ title: ISettingsTitle, link: ISettingsLink }>[] = [
    { title: 'User Profile', link: '/private/settings/user-profile' },
    { title: 'Business Settings', link: '/private/settings/business-settings' },
    { title: 'Store Configuration', link: '/private/settings/store-configuration' },
    { title: 'User Management', link: '/private/settings/user-management' },
    { title: 'Notifications', link: '/private/settings/notifications' }
]

const SettingsTabs = () => {
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

export default SettingsTabs
