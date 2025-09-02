'use client';

import MonthPicker from '@/customComponents/MonthPicker';
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, ChartData } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend);

const stockData: ChartData<'doughnut'> = {
    labels: ["Raw Materials", "Packing", "Consumables", "Others"],
    datasets: [
        {
            data: [40, 30, 20, 10],
            backgroundColor: [
                "#22543d", // Dark green
                "#38a169", // Medium green
                "#68d391", // Light green
                "#c6f6d5", // Very light green
            ],
            borderWidth: 0,
        },
    ],

}

const chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'right'
        },
        tooltip: {
            callbacks: {
                label: (context: any) => `${context.label}: ${context.parsed}%`,
            },
        },
    },
    cutout: "60%",

}
/**
 * To set the chart height and control the layout between the chart and the legend,
 * use a flex container for the chart area and set a fixed height for the chart.
 * Also, set `maintainAspectRatio: false` in chartOptions.
 */

chartOptions.maintainAspectRatio = false;
const StockDistributionChart = () => {
    return (
        <div className='bg-white p-4 rounded-xl'>
            {/* header part */}
            <div className="header flex items-center justify-between">
                <h2 className='text-lg font-semibold'>Stock Distribution</h2>

                {/* month picker */}
                <MonthPicker />
            </div>

            {/* react chart portion */}
            <div className="chart mt-6 h-[230px] flex items-center justify-between">
                <Doughnut data={stockData} options={chartOptions} />
            </div>
        </div>
    )
}

export default StockDistributionChart
