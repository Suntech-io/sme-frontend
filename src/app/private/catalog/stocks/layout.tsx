'use client'


import StocksTabs from '@/customComponents/StocksTabs'
import { usePathname } from 'next/navigation'
import React, { ReactNode, useEffect } from 'react'

const noheadersPages = ['/private/catalog/stocks/add', '/private/catalog/stocks/details/']

const StocksLayout = ({ children }: { children: ReactNode }) => {

  const pathName = usePathname()
  // if the pathname is in the no headers pages, then we return null
  if (noheadersPages.some(item => pathName.startsWith(item))) {
    return <>{children}</>
  }

  // otherwise we return the layout with headers

  return (
    <div className="layoutContainer p-4 h-full flex flex-col mb-10">

      {/* shared layout headers */}
      <div className="sharedLayout h-fit">
        <div className="headerText">
          <p className="subHeader text-[24px] text-darkGrey">
            Stocks Management
          </p>

          <p className='subText text-base mt-2 text-darkGrey'>Manage all Stocks here.</p>
        </div>

      </div>

      {/* tabs */}
      <div className="tabs my-6 h-[36px] sticky top-0 z-10 bg-[#f8f8fb]">
        <StocksTabs />
      </div>


      {/* portals or main content */}
      <main className="w-full h-full flex flex-col">{children}</main>

    </div>
  )
}

export default StocksLayout
