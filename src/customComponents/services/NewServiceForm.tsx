'use client';

import React from 'react';


import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { InputFormField, SelectFormField, TextAreaFormField } from '../FormFields';

const newServiceFormSchema = z.object({
    serviceName: z.string().min(1, 'Service Name is required'),
    description: z.string().min(1, 'Description is required'),
    category: z.string().min(1, 'Category is required'),
    pricingType: z.string().min(1, 'Pricing type is required'),
    price: z.string().min(1, 'Price is required'),
    status: z.string().min(1, 'Status is required'),
})

const NewServiceForm = () => {
    const form = useForm<z.infer<typeof newServiceFormSchema>>({
        resolver: zodResolver(newServiceFormSchema),
        defaultValues: {
            category: '',
            description: '',
            price: '',
            pricingType: '',
            serviceName: '',
            status: ''
        },
    });

    return (
        <div className='w-full h-full'>
            <Form {...form}>
                <form className='space-y-4'>
                    <InputFormField form={form} name='serviceName' label="Service Name" placeholder='Enter service name...' />
                    <TextAreaFormField form={form} name='description' label="Service description" placeholder='Enter product description...' />
                    <SelectFormField form={form} name="category" label="Category" placeholder="Select category" options={[]} />
                    <div className="priceTypeNPrice grid grid-cols-2 items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <SelectFormField form={form} name="priceType" label="Price Type" placeholder="select Price" options={[]} />
                        <InputFormField form={form} name='Type' label="Price" placeholder='Enter service price...' />
                    </div>
                    <SelectFormField form={form} name="status" label="Status" placeholder="Select status" options={[]} />
                </form>
            </Form>

        </div>
    )
}

export default NewServiceForm
