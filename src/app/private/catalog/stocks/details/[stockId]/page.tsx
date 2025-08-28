'use client'

import React, { useEffect, useState } from 'react';
import IconifyIcon from '@/customComponents/IconifyIcon';
import { useAppSettingsStore } from '@/app/store/appSettings';
import { cn } from '@/lib/utils';
import StockOverviewStatsCard from './partials/StockOverviewStatsCard';
import CustomNavTabs from '@/customComponents/CustomNavTabs';
import OverViewPage from './partials/OverViewPage';
import BatchesPage from './partials/BatchesPage';
import UnitsNPackagesPage from './partials/UnitsNPackagesPage';
import MovementsPage from './partials/MovementsPage';
import SuppliersPage from './partials/SuppliersPage';

type TPages = 'Overview' | 'Batches' |  'Units & Packages' | 'Movements' | 'Suppliers'
const pageTabs: TPages[] = ['Overview', 'Batches', 'Units & Packages', 'Movements', 'Suppliers']


const page = () => {
  const { updatenoMaxWidthStatus } = useAppSettingsStore()

  // the current page
  const [currentPage, setcurrentPage] = useState<TPages>('Overview')

  // this is a useeffect that updates the no max width status to true when the page is mounted
  useEffect(() => {
    updatenoMaxWidthStatus(true)
    return () => {
      updatenoMaxWidthStatus(false)
    };
  }, [])

  const handleTabClicked = (tab: TPages) => {
    setcurrentPage(tab)
  }

  return (
    <div className='h-full'>
      {/* page header */}
      <div className="topBar border-b bg-white z-20 px-8 py-6 sticky top-0">
        <div className="barContents mx-auto maximum-width flex items-center justify-between w-full">
          {/* left side */}
          <div className="leftSide flex items-center gap-6">
            {/* back */}
            <div className="arrowBack size-8 rounded-full bg-lightGrey">
              <IconifyIcon icon='ep:back' fontSize={14} />
            </div>
            {/* header details */}
            <div className="headerDetails">
              <p className='font-semibold text-2xl mb-1'>Stock details - <span>Tomato</span></p>
              <p>Seamlessly add and manage your Stocks effortlessly</p>
            </div>
          </div>

          {/* right side */}
          <div className="rightSide">
            {/* status */}
            <div className="itemStatus">

            </div>

            <div className={cn("flex items-center gap-1 text-sm text-green-700 bg-green-50 px-4 py-1 rounded-lg")}>
              Perishable
            </div>
          </div>
        </div>
      </div>

      {/* page content */}
      <div className="stockDetailsPageContent flex flex-col h-full mx auto maximum-width py-8">
        {/* stats cards */}
        <div className="statsCards grid grid-cols-4 gap-4">
          <StockOverviewStatsCard title='Total Quantity' value={245} subValue={50} progress={90} />
          <StockOverviewStatsCard title='Total Value' value={1015.4} subValue={43.2} />
          <StockOverviewStatsCard title='Active Batches' value={2} subValue={2} />
          <StockOverviewStatsCard title='Category' value={'Weight'} subValue={3} />
        </div>

        {/* tabs */}
        <div className="customNavTabs my-8 h-[36px] sticky top-[109px] z-20 bg-[#f8f8fb] border-t border-t-transparent">
          <CustomNavTabs tabs={pageTabs as string[]} clicked={(e: string) => handleTabClicked(e as TPages)} />
        </div>


        {/* Pages */}
        <div className="pages">
          {currentPage == 'Overview' && <OverViewPage />}
          {currentPage == 'Batches' && <BatchesPage />}
          {currentPage == 'Units & Packages' && <UnitsNPackagesPage />}
          {currentPage == 'Movements' && <MovementsPage />}
          {currentPage == 'Suppliers' && <SuppliersPage />}
        </div>
      </div>
    </div>
  )
}

export default page
