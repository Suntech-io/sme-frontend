'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import React from 'react'


interface IStockOverviewStatsCard {
    classes?: {
        cardClass?: string;
        cardTitleClass?: string;
        cardValueClass?: string;
        cardSubtitleCalss?: string;
    },
    title:string;
    value:string|number;
    subValue:string|number
    
}

const StockOverviewStatsCard = () => {
    return (
        <Card className=''>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Quantity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-slate-900">{'stock.totalQuantity'}</div>
                <div className="text-xs text-slate-500">Stock Limit: {'stock.stockLimit'}</div>
                {/* <Progress value={50 || '(stock.totalQuantity / (stock.stockLimit * 2)) * 100'} className="mt-2 h-2" /> */}
                <Progress value={50} className="mt-2 h-2" />
            </CardContent>
        </Card>
    )
}

export default StockOverviewStatsCard
