'use client';

import React from 'react';


import { Form } from '@/components/ui/form'
import { InputFormField, SelectFormField, TextAreaFormField } from '../FormFields';



const NewServiceImageForm = ({form,onSubmit}:{form:any,onSubmit:()=>void}) => {

    return (
        <div className='w-full h-full'>
            <Form {...form}>
                <form className='space-y-4' onSubmit={onSubmit}>
                    <InputFormField form={form} name='serviceName' label="Service Name" placeholder='Enter service name...' />
                    <TextAreaFormField form={form} name='description' label="Service description" placeholder='Enter product description...' />
                    <SelectFormField form={form} name="category" label="Category" placeholder="Select category" options={[]} />
                    <div className="priceTypeNPrice grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                        <SelectFormField form={form} name="priceType" label="Price Type" placeholder="select Price" options={[]} />
                        <InputFormField form={form} name='price' label="Price" placeholder='Enter service price...' />
                    </div>
                    <SelectFormField form={form} name="status" label="Status" placeholder="Select status" options={[]} />
                </form>
            </Form>

        </div>
    )
}

export default NewServiceImageForm
