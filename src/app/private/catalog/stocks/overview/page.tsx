'use client';

import React from 'react'
import TotalStockStatsCard from './partials/TotalStockStatsCard';
import StockDistributionChart from './partials/StockDistributionChart';
import SoonToExpireProducts from './partials/SoonToExpireProducts';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '@/customComponents/datatable';

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

interface RecentStockMovement {
  id: number;
  stockName: string;
  type: 'in' | 'out';
  quantity: number;
  unit: string;
  date: string;
  supplier: string;
}

// recent stock movements data (dummy data for illustration)
const recentStockMovements: RecentStockMovement[] = [
  {
    id: 1,
    stockName: 'Apple iPhone 14',
    type: 'in',
    quantity: 50,
    unit: 'pieces',
    date: '2025-03-15',
    supplier: 'Tech Distributors Inc.',
  },
  {
    id: 2,
    stockName: 'Samsung Galaxy S21',
    type: 'out',
    quantity: 30,
    unit: 'pieces',
    date: '2025-03-14',
    supplier: 'Mobile World Ltd.',
  },
  {
    id: 3,
    stockName: 'Dell XPS 13 Laptop',
    type: 'in',
    quantity: 20,
    unit: 'pieces',
    date: '2025-03-13',
    supplier: 'Computers & More Co.',
  },
  {
    id: 4,
    stockName: 'Sony WH-1000XM4 Headphones',
    type: 'out',
    quantity: 15,
    unit: 'pieces',
    date: '2025-03-12',
    supplier: 'Audio Gear Supplies',
  },
];

const stockMovementColumns: ColumnDef<RecentStockMovement>[] = [
  {
    accessorKey: 'stockName',
    header: 'Stock Name',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: info => `${info.getValue()} ${info.row.original.unit}`,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'supplier',
    header: 'Supplier',
    cell: info => info.getValue(),
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
        <SoonToExpireProducts />
      </div>


      {/* Recent Stock Movement */}
      <div className="recentStockMovements mt-4">
        <DataTable tableContainerClass='border-none' data={recentStockMovements} columns={stockMovementColumns} totalPages={1} pageIndex={0} tableInformationContent={<div className='my-4 font-semibold'>Recent Stock Movements</div>} showHeader={false} />
      </div>
    </div>
  )
}

export default page
