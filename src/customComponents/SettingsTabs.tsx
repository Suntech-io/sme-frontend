'use client'

import React from 'react'
import CustomNavTabs from './CustomNavTabs'

const SettingsTabs = () => {
    const handleTabClicked = (value: string) => {
        console.log('tab clicked', value)
    }

    return (
        <div>
            <CustomNavTabs tabs={['All Services', 'Categories', 'Analytics']} clicked={handleTabClicked} />
        </div>
    )
}

export default SettingsTabs
