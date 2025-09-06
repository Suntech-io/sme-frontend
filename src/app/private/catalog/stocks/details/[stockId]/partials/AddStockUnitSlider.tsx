'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import ButtonLoading from '@/customComponents/Button';
import { InputFormField, SelectFormField } from '@/customComponents/FormFields';
import { ProgressBarStepperRef } from '@/customComponents/ProgressBarStepper';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';

type AddBatchSliderProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const stockUnitSchema = z.object({
    sizeName: z.string().min(1, 'Size name is required'),
    size: z.string().min(1, 'Size is required'),
    unitOfMeasurement: z.string().min(1, 'Unit of measurement is required'),
})

const AddStockUnitSlider = ({ open, onOpenChange }: AddBatchSliderProps) => {

    const form = useForm<z.infer<typeof stockUnitSchema>>({
        resolver: zodResolver(stockUnitSchema),
        defaultValues: {
            size: '',
            sizeName: '',
            unitOfMeasurement: '',
        }
    })
    return (
        <Sheet modal={true} open={open} onOpenChange={onOpenChange}>
            <SheetContent className="min-w-[450px] max-h-screen flex flex-col">
                <SheetHeader className="shrink-0">
                    <SheetTitle >Add Stock Unit</SheetTitle>
                    <SheetDescription>
                        Add new stock units to this stock.
                    </SheetDescription>
                </SheetHeader>

                {/* main form content */}
                <div className="mainFormContent flex-1 overflow-y-auto p-4 max-h-full">
                    <Form {...form}>
                        <form action="" className='space-y-4'>
                            <InputFormField label='Size Name' name='sizeName' form={form} />
                            <div className="sizeNUnitOfMeasurement grid grid-cols-2 gap-4">
                                <InputFormField label='Size' name='size' form={form} />
                                <SelectFormField label='Unit of Measurement' name='unitOfMeasurement' form={form} options={[]} />
                            </div>
                        </form>
                    </Form>
                </div>

                <SheetFooter>
                    <ButtonLoading type="submit" title='Add Unit'></ButtonLoading>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default AddStockUnitSlider
