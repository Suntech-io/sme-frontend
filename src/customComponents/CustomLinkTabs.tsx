'use client';


import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation' // 1. Import usePathname

// Make ILinkTab generic
export interface ILinkTab<T = { title: string; link: string }> {
    title: T extends { title: infer U } ? U : string;
    link: T extends { link: infer U } ? U : string;
}

// Make NavTabsProps generic
interface NavTabsProps<T extends { title: any; link: any }> {
    tabs: Array<ILinkTab<T>>;
    clicked?: (value: ILinkTab<T>) => void;
}

// Make CustomLinkTabs generic
const CustomLinkTabs = <T extends { title: any; link: any }>({ tabs, clicked }: NavTabsProps<T>) => {
    const pathName = usePathname()
    // function to get the initial tab
     const getInitialTab = () => tabs.find(tab => tab.link === pathName)
    const [activeTab, setActiveTab] = useState<ILinkTab>(tabs[0])
    const [borderStyle, setBorderStyle] = useState({ left: 0, width: 0 })
    const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

    useEffect(() => {
        const initialTab = getInitialTab()
        if(initialTab){
            setActiveTab(initialTab)
        }
      return () => {
        
      };
    }, [])

    useEffect(() => {
        const activeTabElement = tabRefs.current[activeTab.title]
        if (activeTabElement) {
            const { offsetLeft, offsetWidth } = activeTabElement
            setBorderStyle({ left: offsetLeft, width: offsetWidth })
        }
    }, [activeTab])

    const handleTabClick = (tabKey:ILinkTab) => {
        setActiveTab(tabKey)
        clicked?.(tabKey)
    }



    return (
        <div>
            {/* Tabs */}
            <div className="border-b border-gray-200 relative">
                <nav className="-mb-px flex relative overflow-x-auto">
                    {
                        tabs.map((tab, idx) => (
                            <Link href={tab.link} key={tab.title}>
                                <button
                                    ref={(el) => { tabRefs.current[tab.title] = el; }}
                                    onClick={() => handleTabClick(tab)}
                                    className={`py-2 px-3 text-sm font-medium min-w-fit transition-colors relative z-10 ${activeTab.title === tab.title ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    {tab.title}
                                </button>
                            </Link>
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

export default CustomLinkTabs
