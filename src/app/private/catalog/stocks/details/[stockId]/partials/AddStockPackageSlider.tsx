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

const stockPackageSchema = z.object({
    packageName: z.string().min(1, 'Package name is required'),
    unitSize: z.string().min(1, 'Measurement size is required'),
    packageSize: z.string().min(1, 'Package size is required'),
})

const AddStockPackageSlider = ({ open, onOpenChange }: AddBatchSliderProps) => {

    const form = useForm<z.infer<typeof stockPackageSchema>>({
        resolver: zodResolver(stockPackageSchema),
        defaultValues: {
            packageName: '',
            packageSize: '',
            unitSize: '',
        }
    })
    return (
        <Sheet modal={true} open={open} onOpenChange={onOpenChange}>
            <SheetContent className="min-w-[450px] max-h-screen flex flex-col">
                <SheetHeader className="shrink-0">
                    <SheetTitle >Add Stock Packages/Bundles</SheetTitle>
                    <SheetDescription>
                        Add new stock packages to this stock.
                    </SheetDescription>
                </SheetHeader>

                {/* main form content */}
                <div className="mainFormContent flex-1 overflow-y-auto p-4 max-h-full">
                    <Form {...form}>
                        <form action="" className='space-y-4'>
                            <InputFormField label='Package Name' name='packageName' form={form} />
                            <div className="sizeNUnitOfMeasurement grid grid-cols-2 gap-4">
                                <SelectFormField label='Unit Size' name='unitSize' form={form} options={[]} />
                                <InputFormField label='No. of Pieces' name='packageSize' form={form} />
                            </div>
                        </form>
                    </Form>

                    {/* card on selected unit size */}
                    <div className="selectedUnitSizeContainer border bg-gray-100 p-8 rounded-xl my-10">

                        {/* card title */}
                        <p className="cardTitle text-primary mb-4">
                            Selected Unit size
                        </p>

                        {/* unit card */}
                        <div className='UnitSizeCard bg-white hover:scale-[100.2%] rounded-lg p-4 shadow-sm hover:shadow-md transition-all'>
                            {/* header */}
                            <div className="header flex items-center justify-between">
                                {/* title */}
                                <p className="unitTitle font-thin text-gray-500 text-lg">Small</p>

                            </div>
                            {/* value */}
                            <div className="value mt-4 flex items-center space-x-2">
                                <p className='text-gray-600 text-3xl font-semibold'>5</p>
                                <p className='text-[11px] bg-primary/10 px-4 py-0.5 rounded-full'>Litres</p>
                            </div>

                            {/* packages unit size has been used in */}
                            <div className="packagesUsedIn mt-4">
                                <p className='text-sm text-mediumGrey italic font-light'>Used in 3 Packages</p>
                            </div>

                        </div>
                    </div>
                </div>

                <SheetFooter>
                    <ButtonLoading type="submit" title='Add Package'></ButtonLoading>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default AddStockPackageSlider
