'use client'

import { cn } from '@/lib/utils';
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import IconifyIcon from '../IconifyIcon';
import ButtonLoading from '../Button';
import { Ear } from 'lucide-react';
import EarningsChart from './EarningsChart';

interface EarningsOverviewCardProps {
    className?: string;
}

const EarningsOverviewCard = ({ className }: EarningsOverviewCardProps) => {
    const growthDirection = 'up'; // or 'down', this can be dynamic based on your data


    return (
        <div className={cn('bg-white p-4 rounded-xl shadow', className)}>
            {/* header */}
            <div className="headerSide flex items-center justify-between">
                <p className="text-base font-semibold">Earnings Overview</p>

                {/* month selector */}
                {/* <Select defaultValue='january'>
                    <SelectTrigger className="w-[200px] p-0 m-0 flex items-center justify-between">
                        <div className='text-sm text-mediumGrey bg-gray-50 h-full w-1/2 flex items-center justify-center'>Month</div>
                        <SelectValue placeholder="Select a fruit" className='' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Months</SelectLabel>
                            <SelectItem value="january">January</SelectItem>
                            <SelectItem value="february">February</SelectItem>
                            <SelectItem value="march">March</SelectItem>
                            <SelectItem value="april">April</SelectItem>
                            <SelectItem value="may">May</SelectItem>
                            <SelectItem value="june">June</SelectItem>
                            <SelectItem value="july">July</SelectItem>
                            <SelectItem value="august">August</SelectItem>
                            <SelectItem value="september">September</SelectItem>
                            <SelectItem value="october">October</SelectItem>
                            <SelectItem value="november">November</SelectItem>
                            <SelectItem value="december">December</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select> */}


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

            {/* chart and content */}
            <div className="chartNContent grid grid-cols-6 gap-5 w-full  mt-9">
                {/* content */}
                <div className="leftSide col-span-1 ">
                    <p className='text-darkGrey'>This month</p>

                    {/* growth direction and amount */}
                    <div className="amountNDirection flex items-center gap-2 mt-2">
                        <p className='text-xl font-semibold'>$14,045</p>
                        <IconifyIcon icon={`ep:arrow-${growthDirection}-bold`} className='' style={{ color: growthDirection == 'up' ? '#00A63E' : '#fb2c36' }} />
                    </div>

                    {/* growth percentage */}
                    {/* footer */}
                    <div className="footer flex items-center gap-2 mt-6">
                        <div className='text-sm flex items-center rounded pr-2' style={{
                            color: growthDirection == 'up' ? '#00A63E' : '#fb2c36',
                            backgroundColor: growthDirection == 'up' ? '#E6F9E6' : '#FDEDED',
                        }}><span className=''><IconifyIcon icon='basil:plus-outline' className='' /></span> {50}%</div>
                        <p className="text-sm text-mediumGrey">
                            from previous month
                        </p>
                    </div>

                    <div className="previousMonth mt-6">
                        <p>Last month (April)</p>

                        {/* growth direction and amount */}
                        <div className="amountNDirection flex items-center gap-2 mt-2">
                            <p className='text-base font-semibold'>$13,045</p>
                        </div>
                    </div>

                    {/* view details */}
                    <div className="viewDetails mt-6">
                        <ButtonLoading rightIcon='ep:arrow-right-bold' title='View details' />
                    </div>
                </div>

                {/* chart */}
                <div className="rightSide col-span-5 ">
                    <EarningsChart />
                </div>
            </div>
        </div>
    )
}

export default EarningsOverviewCard
