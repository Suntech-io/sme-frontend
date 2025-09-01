'use client';

import React from 'react'
import TotalStockStatsCard from './partials/TotalStockStatsCard';
import StockDistributionChart from './partials/StockDistributionChart';

const sampleStockOverViewData = [
  {
    id: 1,
    cardTitle: 'Total Stocks Items',
    value: 1200,
    trend: 5.4, // positive trend
  },
  {
    id: 2,
    cardTitle: 'Total Stock Value',
    value: 150,
    trend: -2.1, // negative trend
  },
  {
    id: 3,
    cardTitle: 'Low Stock Items',
    value: 300,
    trend: 3.2, // positive trend
  },
  {
    id: 4,
    cardTitle: 'Expiring Soon Items',
    value: 75,
    trend: -1.5, // positive trend
  },
];

const page = () => {
  return (
    <div className='StockOverviewPage w-full h-full'>
      {/* total stock statistics */}
      <div className="totalStockStatistics grid grid-cols-4 gap-4">
        {sampleStockOverViewData.map((data) => (
          <TotalStockStatsCard
            key={data.id}
            cardTitle={data.cardTitle}
            value={data.value}
            trend={data.trend}
          />
        ))}

      </div>

      {/* total stock distribution and other stuff*/}
      <div className="totalStocksDistributionNOthers grid grid-cols-2 gap-4 mt-4">
        {/* stock distribution chart */}
        <StockDistributionChart />
        {/* other stuff */}

      </div>

    </div>
  )
}

export default page
