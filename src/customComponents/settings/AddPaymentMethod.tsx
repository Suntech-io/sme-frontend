'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ButtonLoading from '../Button'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { CheckBoxFormField, InputFormField, SelectFormField } from '../FormFields'
import { mobileMoneyProviders, paymentTypes } from '@/lib/globalConstants'

type AddPaymentMethodProps = {
    modal?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
};

const addPaymentMethodSchema = z.object({
    paymentType: z.string().min(1, 'Payment type is required'),
    setAsDefault: z.boolean(),
    provider: z.string().min(1, 'Provider is required'),
    accountNumber: z.string().min(1, 'Account number is required'),
    status: z.enum(['Active', 'Not Active']),
});

const AddPaymentMethod = ({ modal = true, open = false, onOpenChange }: AddPaymentMethodProps) => {
    const form = useForm<z.infer<typeof addPaymentMethodSchema>>({
        resolver: zodResolver(addPaymentMethodSchema),
        defaultValues: {
            paymentType: '',
            setAsDefault: false,
            provider: '',
            accountNumber: '',
            status: 'Active',
        },
    });
    return (
        <Dialog modal={modal} open={open} onOpenChange={onOpenChange}>
            <Form {...form}>
                <form>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Add Payment Method</DialogTitle>
                            <DialogDescription>
                                Add a new payment method to your store. You can add multiple payment methods and manage them from the settings.
                            </DialogDescription>
                        </DialogHeader>
                        {/* inputs-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                        <div className="formInputs space-y-4">
                            {/* payment type */}
                            <div className="paymentType">
                                <SelectFormField form={form} name="paymentType" label="Payment Type" placeholder="Select payment type" options={paymentTypes} />
                                <CheckBoxFormField form={form} name='setAsDefault' label='set as default' containerClassName='justify-end gap-2 flex items-center flex-row-reverse mt-3 text-mediumGrey' />
                            </div>
                            {/* provider */}
                            <SelectFormField form={form} name="provider" label="Provider" placeholder="Select provider" options={mobileMoneyProviders} />

                            {/* account number */}
                            <InputFormField form={form} name="accountNumber" label="Account Number" placeholder="Enter account number" type='text' />
                            {/* account number */}
                            <InputFormField form={form} name="accountNumber" label="Account Number" placeholder="Enter account number" type='text' />
                            {/* status */}
                            <SelectFormField form={form} name="status" label="Status" placeholder="Select status" options={[
                                { label: 'Active', value: 'Active' },
                                { label: 'Not Active', value: 'Not Active' },
                            ]} />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <ButtonLoading variant={'outline'} title='Cancel' className='text-red-500 border-red-500 hover:bg-red-500 hover:text-white' />
                                {/* <Button variant="outline">Cancel</Button> */}
                            </DialogClose>
                            <ButtonLoading title='Save payment method' />
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Form>
        </Dialog>
    )
}

export default AddPaymentMethod
