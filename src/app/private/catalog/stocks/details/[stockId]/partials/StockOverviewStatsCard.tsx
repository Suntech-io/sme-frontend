'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import React from 'react'


interface IStockOverviewStatsCard {
    classes?: {
        cardClass?: string;
        cardTitleClass?: string;
        cardValueClass?: string;
        cardSubtitleCalss?: string;
    },
    title: 'Total Quantity' | 'Total Value' | 'Active Batches' | 'Category';
    value: string | number;
    subValue: string | number
    progress?: number
}

const StockOverviewStatsCard = ({ subValue, title, value, progress, classes }: IStockOverviewStatsCard) => {
    return (
        <Card className={cn('')}>
            <CardHeader className={cn("pb-1")}>
                <CardTitle className={cn("text-sm font-medium text-slate-600")}>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className={cn("text-2xl font-bold text-slate-900")}> <span>{title == 'Total Value' && '$'}</span> {value}</div>
                <div className={cn("text-sm text-slate-500")}><span>{title == 'Total Quantity' ? 'Stock Limit' : title == 'Total Value' ? 'Avg' : title == 'Active Batches' ? 'Suppliers' : 'Unit Sizes'}:</span> {subValue}</div>
                {progress && <Progress value={progress as number} className="mt-2 h-2" />}
            </CardContent>
        </Card>
    )
}

export default StockOverviewStatsCard
