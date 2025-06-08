'use client'

import EarningsOverviewCard from '@/customComponents/dashboard/EarningsOverviewCard'
import ExpenditureBreakdown from '@/customComponents/dashboard/ExpenditureBreakdown'
import StatsCard from '@/customComponents/dashboard/StatsCard'
import TopCustomers from '@/customComponents/dashboard/TopCustomers'
import TopSellingProducts from '@/customComponents/dashboard/TopSellingProducts'
import React from 'react'

const page = () => {
  return (
    <div className='p-4'>
      <div className="headerText">
        <p className="subHeader text-[24px] text-darkGrey">
          Dashboard
        </p>

        <p className='subText text-base mt-2 text-darkGrey'>Welcome back! Here is what’s happening with your business today</p>
      </div>

      {/* stats cards */}
      <div className="statsCardContainer mt-6 grid grid-cols-4 gap-4">
        <StatsCard title='Total Revenue' value={'$' + (14045).toLocaleString()} growthDirection='up' growthPercentage={50} />
        <StatsCard title='Product Sales' value={'$' + (17045).toLocaleString()} growthDirection='up' growthPercentage={10} />
        <StatsCard title='Orders' value={(14045).toLocaleString()} growthDirection='down' growthPercentage={0.6} />
        <StatsCard title='Conversion Rate' value={(25) + '%'} growthDirection='up' growthPercentage={50} />
      </div>

      {/* earnings Overview Card */}
      <EarningsOverviewCard className='mt-6' />

      {/* Footer */}
      <div className="footer grid grid-cols-3 gap-4 mt-6">
        <ExpenditureBreakdown />

        <TopSellingProducts />

        <TopCustomers />
      </div>
    </div>
  )
}

export default page
