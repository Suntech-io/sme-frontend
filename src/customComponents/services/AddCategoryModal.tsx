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
import { CheckBoxFormField, InputFormField, SelectFormField, TextAreaFormField } from '../FormFields'
import { mobileMoneyProviders, paymentTypes } from '@/lib/globalConstants'

type AddCategoryProps = {
    modal?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
};

const addCategorySchema = z.object({
    categoryName: z.string().min(1, 'Category name is required'),
    description: z.string().min(1, 'Description is required'),
    status: z.string().min(1, 'Account number is required'),
    icon: z.string().min(1, 'Icon is required'),
});

const AddCategoryModal = ({ modal = true, open = false, onOpenChange }: AddCategoryProps) => {
    const form = useForm<z.infer<typeof addCategorySchema>>({
        resolver: zodResolver(addCategorySchema),
        defaultValues: {
            categoryName: '',
            description: '',
            status: '',
            icon: 'Active',
        },
    });
    return (
        <Dialog modal={modal} open={open} onOpenChange={onOpenChange}>
            <Form {...form}>
                <form>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Add Category</DialogTitle>
                            <DialogDescription>
                                Add a new Category of service to your business.sss
                            </DialogDescription>
                        </DialogHeader>
                        {/* inputs-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                        <div className="formInputs space-y-4">
                            <InputFormField form={form} name="categoryName" label="Category Name" placeholder="Enter First name..." />
                            {/* description */}
                            <TextAreaFormField form={form} name="description" label="Description" placeholder="Category description..." />
                            {/* status */}
                            <SelectFormField form={form} name="status" label="Set Status" placeholder="Set status" options={[
                                { label: 'Administrator', value: 'Administrator' },
                                { label: 'Sales Agent', value: 'Sales Agent' },
                            ]} />
                            {/* Icon */}
                            <SelectFormField form={form} name="icon" label="Icon" placeholder="Select icon..." options={[
                                { label: 'Administrator', value: 'Administrator' },
                                { label: 'Sales Agent', value: 'Sales Agent' },
                            ]} />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <ButtonLoading variant={'outline'} title='Cancel' className='text-red-500' />
                                {/* <Button variant="outline">Cancel</Button> */}
                            </DialogClose>
                            <ButtonLoading title='Send invite' />
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Form>
        </Dialog>
    )
}

export default AddCategoryModal
