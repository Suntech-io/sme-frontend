'use client';

import React from 'react'
import { cn } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const TopSellingProducts = () => {
    return (
        <div className='p-4 bg-white rounded-xl shadow'>
            {/* header */}
            <div className="headerSide flex items-center justify-between">
                <p className="text-base font-semibold">Top Selling Products</p>

                {/* year and month */}
                <div className="yearMonth flex items-center">
                    {/* year */}
                    <Select >
                        <SelectTrigger className="w-[110px] rounded-r-none">
                            <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Months</SelectLabel>
                                <SelectItem value="Januray">January</SelectItem>
                                <SelectItem value="February">February</SelectItem>
                                <SelectItem value="March">March</SelectItem>
                                <SelectItem value="April">April</SelectItem>
                                <SelectItem value="May">May</SelectItem>
                                <SelectItem value="June">June</SelectItem>
                                <SelectItem value="July">July</SelectItem>
                                <SelectItem value="August">August</SelectItem>
                                <SelectItem value="September">September</SelectItem>
                                <SelectItem value="October">October</SelectItem>
                                <SelectItem value="November">November</SelectItem>
                                <SelectItem value="December">December</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {/* Month */}
                    <Select>
                        <SelectTrigger className="w-[100px] border border-l-0 rounded-l-none">
                            <SelectValue placeholder="year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Years</SelectLabel>
                                <SelectItem value="2025">2025</SelectItem>
                                <SelectItem value="2026">2026</SelectItem>
                                <SelectItem value="2027">2027</SelectItem>
                                <SelectItem value="2028">2028</SelectItem>
                                <SelectItem value="2029">2029</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* products list */}
            <div className="products mt-6 flex flex-col gap-4 divide-y *:pb-4">
                <div className="product flex items-center justify-between">
                    <div className="imgDets flex items-center gap-2">
                        {/* image */}
                        <div className="image size-[70px] bg-lightGrey rounded-md"></div>
                        {/* details */}
                        <div className="details">
                            <p className="text-sm font-semibold">Nike Supreme</p>
                            <p className="text-xs text-darkGrey">Men's running shoe</p>
                        </div>
                    </div>

                    <div className="percentage">
                        <p className="text-sm font-semibold">78%</p>
                        <p className="text-xs text-darkGrey">Sales</p>
                    </div>
                </div>
                <div className="product flex items-center justify-between">
                    <div className="imgDets flex items-center gap-2">
                        {/* image */}
                        <div className="image size-[70px] bg-lightGrey rounded-md"></div>
                        {/* details */}
                        <div className="details">
                            <p className="text-sm font-semibold">Nike Supreme</p>
                            <p className="text-xs text-darkGrey">Men's running shoe</p>
                        </div>
                    </div>

                    <div className="percentage">
                        <p className="text-sm font-semibold">78%</p>
                        <p className="text-xs text-darkGrey">Sales</p>
                    </div>
                </div>
                <div className="product flex items-center justify-between">
                    <div className="imgDets flex items-center gap-2">
                        {/* image */}
                        <div className="image size-[70px] bg-lightGrey rounded-md"></div>
                        {/* details */}
                        <div className="details">
                            <p className="text-sm font-semibold">Nike Supreme</p>
                            <p className="text-xs text-darkGrey">Men's running shoe</p>
                        </div>
                    </div>

                    <div className="percentage">
                        <p className="text-sm font-semibold">78%</p>
                        <p className="text-xs text-darkGrey">Sales</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopSellingProducts
