'use client'

import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ButtonLoading from '../Button'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { CustomComboboxFormField, InputFormField, SwitchFormField, TextAreaFormField } from '../FormFields'
import IconifyIcon from '../IconifyIcon'
import { Description } from '@radix-ui/react-dialog'

type AddPaymentMethodProps = {
    modal?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
};

const addNewStockChema = z.object({
    name: z.string().min(1, 'Stock Name is required'),
    type: z.string().min(1, 'Stock type is required'),
    expiryDate: z.string().optional(),
    limit: z.string().transform(val => Number(val)).refine(val => !isNaN(val) && val >= 1, { message: 'Limit is required' }),
    quantity: z.string().transform(val => Number(val)).refine(val => !isNaN(val) && val >= 1, { message: 'Quantity is required' }),
    costPerUnit: z.string().transform(val => Number(val)).refine(val => !isNaN(val) && val >= 1, { message: 'Price is required' }),
    batchNumber: z.string().optional(),
    isActive: z.boolean().optional(),
    Description: z.string().optional(),
}).refine(
    (data) => data.type !== 'perishable' || (data.expiryDate && data.expiryDate.length > 0),
    {
        message: 'Expiry Date is required for perishable stock',
        path: ['expiryDate'],
    }
)

const stockTypes: { value: any; label: string, customCmp: React.ComponentType<any> | React.ReactElement }[] = [
    {
        value: 'perishable',
        label: 'Perishable',
        customCmp: <div className="flex items-center gap-1">
            {/* icon */}
            <IconifyIcon icon='noto:green-apple' className="" />
            {/* optionDetails */}
            <div className="optionDets">
                {/* optionName */}
                <span className="font-medium text-green-500">Perishable</span>
                {/* optionDescription */}
                <div className="text-xs text-gray-500">Items that have a limited shelf life and require careful handling.</div>
            </div>
        </div>,
    },
    {
        value: 'non-perishable',
        label: 'Non-Perishable',
        customCmp: <div className="flex items-center gap-1">
            {/* icon */}
            <IconifyIcon icon='fluent-emoji-flat:canned-food' className="" />
            {/* optionDetails */}
            <div className="optionDets">
                {/* optionName */}
                <span className="font-medium text-yellow-500">Non-Perishable</span>
                {/* optionDescription */}
                <div className="text-xs text-gray-500">Items that are processed or packaged to prolonge storage to delay decay or spoiling.</div>
            </div>
        </div>,
    },
    {
        value: 'hazardous',
        label: 'Hazardous',
        customCmp: <div className="flex items-center gap-1">
            {/* icon */}
            <IconifyIcon icon='twemoji:biohazard' className="" />
            {/* optionDetails */}
            <div className="optionDets">
                {/* optionName */}
                <span className="font-medium text-orange-500">Hazardous</span>
                {/* optionDescription */}
                <div className="text-xs text-gray-500">Dangerous items that pose a risk to health, safety, property or the environment.</div>
            </div>
        </div>,
    },
    {
        value: 'regulated',
        label: 'Regulated',
        customCmp: <div className="flex items-center gap-1">
            {/* icon */}
            <IconifyIcon icon='vscode-icons:file-type-licensebat' className="" />
            {/* optionDetails */}
            <div className="optionDets">
                {/* optionName */}
                <span className="font-medium text-blue-500">Regulated</span>
                {/* optionDescription */}
                <div className="text-xs text-gray-500">Items that require special permits, licenses or certifications before they can be moved or sold.</div>
            </div>
        </div>,
    },
    {
        value: 'tool',
        label: 'Tool',
        customCmp: <div className="flex items-center gap-1">
            {/* icon */}
            <IconifyIcon icon='vscode-icons:folder-type-tools' className="" />
            {/* optionDetails */}
            <div className="optionDets">
                {/* optionName */}
                <span className="font-medium">Tool/Equipment</span>
                {/* optionDescription */}
                <div className="text-xs text-gray-500">It is an item that is used to facilitate the creation of a product or the delivery of a service.</div>
            </div>
        </div>,
    }
]

const AddStockModal = ({ modal = true, open = false, onOpenChange }: AddPaymentMethodProps) => {
    const form = useForm<z.infer<typeof addNewStockChema>>({
        resolver: zodResolver(addNewStockChema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            type: '',
            expiryDate: '',
            limit: 0,
            batchNumber: '',
            quantity: 0,
            costPerUnit: 0,
            isActive: false,
            Description: '',
        },
    });


    const submitForm = (data: any) => {
        console.log('data', data)
    }

    return (
        <Dialog modal={modal} open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add new Stock</DialogTitle>
                    <DialogDescription>
                        Add a new stock to the list of stocks you use in either providing a service or manufacturing a product.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitForm)}>
                        {/* inputs-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                        <div className="formInputs space-y-4">
                            <div className="isActive flex justify-end">
                                {/* isActive */}
                                <SwitchFormField form={form} name='isActive' label="Active" />
                            </div>
                            <InputFormField form={form} name="name" label="Stock Name" placeholder="Enter Stock name..." />
                            {/* type */}
                            <CustomComboboxFormField options={stockTypes} form={form} name='type' placeholder='Select type' label='Stock type' />
                            {/* expiryDate - show only for perishable, hazardous, regulated */}
                            {(form.watch('type') === 'perishable' ||
                                form.watch('type') === 'hazardous' ||
                                form.watch('type') === 'regulated') && (
                                    <InputFormField
                                        form={form}
                                        name="expiryDate"
                                        label="Expiry Date"
                                        placeholder="Enter expiry date..."
                                        type='date'
                                    />
                                )}
                            {/* limit */}
                            <InputFormField form={form} name="limit" label="Stock Limit" placeholder="" type='number'/>
                            {/* batchNumber */}
                            <InputFormField form={form} name="batchNumber" label="Batch Number" placeholder="Enter batch number..." />
                            <InputFormField form={form} name="quantity" label="Quantity" placeholder="Enter stock quantity..." type='number' />
                            <InputFormField form={form} name="costPerUnit" label="Cost per unit" placeholder="Enter cost per unit..." type='number' />
                            {/* description */}
                            <TextAreaFormField form={form} name="description" label="Description" placeholder="Enter more description..." />
                        </div>
                        <DialogFooter className='mt-4'>
                            <DialogClose asChild>
                                <ButtonLoading type='button' variant={'outline'} title='Cancel' className='text-red-500' />
                            </DialogClose>
                            <ButtonLoading title='Add Stock' type='submit' />
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddStockModal
