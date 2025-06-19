import React from "react";
import { Line } from "react-chartjs-2";
import type { ChartData } from "chart.js";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler, // <-- Import Filler
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler); // <-- Register Filler

const data:ChartData<'line'> = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
        {
            label: "Earnings",
            data: [1200, 1900, 3000, 2500, 3200, 4000, 3500, 4500, 5000, 6000, 7000, 8000],
            borderColor: "#54C3F8",
            backgroundColor: "rgba(84, 195, 248, 0.2)", // translucent fill for area effect
            // backgroundColor: "rgba(84, 195, 248, 0.2)", // translucent fill for area effect
            fill: true, // this makes it an area chart
            tension: 0.5,
            pointRadius: 0,
            
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: "top" as const,
        },
        filler: {
                propagate: true
            }
    },
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

const EarningsChart: React.FC = () => (
    <div className="">
        <Line data={data} options={options} style={{ width: "100%", maxHeight: "300px" }} className="" />
    </div>
);

export default EarningsChart;