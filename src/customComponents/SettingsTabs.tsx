'use client'

import React from 'react'
import CustomNavTabs from './CustomNavTabs'
import { useRouter } from 'next/navigation'

type ISettingsPages = 'User Profile' | 'Business Settings' | 'Store Configuration' | 'User Management' | 'Notifications'

const settingsPages: ISettingsPages[] = [
    'User Profile',
    'Business Settings',
    'Store Configuration',
    'User Management',
    'Notifications'
]

const SettingsTabs = () => {
    const router = useRouter()

    const handleTabClicked = (value: string) => {
        switch (value as ISettingsPages) {
            case 'User Profile':
                router.push('/private/settings/user-profile')
                break;
            case 'Business Settings':
                router.push('/private/settings/business-settings')
                break;
            case 'Store Configuration':
                router.push('/private/settings/store-configuration')
                break;
            case 'User Management':
                router.push('/private/settings/user-management')
                break;
            case 'Notifications':
                router.push('/private/settings/notifications')
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <CustomNavTabs tabs={settingsPages} clicked={handleTabClicked} />
        </div>
    )
}

export default SettingsTabs
