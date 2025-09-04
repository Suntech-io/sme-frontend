"use client"

import React, { useEffect } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


export function MonthPicker() {
    const [date, setDate] = React.useState<Date>()


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[150px] justify-start text-left font-normal rounded-lg",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "MMMM yyyy") : <span>Pick a month</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="hidden"
                    // 👇 this makes it a MONTH picker
                    captionLayout="dropdown-months"
                    // hide the days grid and show only months
                    classNames={{
                        months: "flex flex-col space-y-4",
                        month: "space-y-4",
                        caption_label: "hidden", // hide default caption
                        table: "hidden", // hide day cells
                    }}
                />
                <div className="grid grid-cols-3 gap-2 p-2">
                    {Array.from({ length: 12 }).map((_, i) => {
                        const d = new Date(date?.getFullYear() ?? new Date().getFullYear(), i, 1)
                        return (
                            <Button
                                key={i}
                                variant={date?.getMonth() === i ? "default" : "outline"}
                                onClick={() => setDate(d)}
                            >
                                {format(d, "MMM")}
                            </Button>
                        )
                    })}
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default MonthPicker;
