'use client';


import React, { useEffect, useRef, useState } from 'react'

interface NavTabsProps {
    tabs: string[],
    clicked: (value: string) => void
}

const CustomNavTabs = ({ tabs, clicked }: NavTabsProps) => {
    const [activeTab, setActiveTab] = useState(tabs[0])
    const [borderStyle, setBorderStyle] = useState({ left: 0, width: 0 })
    const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

    useEffect(() => {
        const activeTabElement = tabRefs.current[activeTab]
        if (activeTabElement) {
            const { offsetLeft, offsetWidth } = activeTabElement
            setBorderStyle({ left: offsetLeft, width: offsetWidth })
        }
    }, [activeTab])

    const handleTabClick = (tabKey: string) => {
        setActiveTab(tabKey)
        clicked(tabKey)
    }



    return (
        <div>
            {/* Tabs */}
            <div className="border-b border-gray-200 relative">
                <nav className="-mb-px flex relative overflow-x-auto">
                    {
                        tabs.map((tab, idx) => (
                            <button
                                ref={(el) => { tabRefs.current[tab] = el; }}
                                key={idx}
                                onClick={() => handleTabClick(tab)}
                                className={`py-2 px-3 text-sm font-medium min-w-fit transition-colors relative z-10 ${activeTab === tab ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))

                    }

                    {/* Animated border */}
                    <div
                        className="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"
                        style={{
                            left: `${borderStyle.left}px`,
                            width: `${borderStyle.width}px`,
                        }}
                    />
                </nav>
            </div>

        </div>
    )
}

export default CustomNavTabs
