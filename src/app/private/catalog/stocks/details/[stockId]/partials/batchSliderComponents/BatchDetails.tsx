'use client';

import { Form } from '@/components/ui/form';
import AppDivider from '@/customComponents/AppDivider';
import { InputFormField, SelectFormField, TextAreaFormField } from '@/customComponents/FormFields';
import IconifyIcon from '@/customComponents/IconifyIcon';
import { v4 as uuidv4 } from 'uuid';
import React from 'react'

const BatchDetails = ({ form, stocksFields, appendStock, removeStock, onSubmit }: {
  form: any, stocksFields: {
    id: string;
    package: string;
    costPrice: string;
    quantity: string;
  }[], appendStock: (val: any) => void, removeStock: (val: any) => void, onSubmit: () => void
}) => {


  const handleAddStock = () =>
    appendStock({
      costPrice: '',
      package: '',
      quantity: '',
      id: uuidv4()
    });


  return (
    <div className='BacthDetails h-full w-full'>
      <Form {...form}>
        <form action="" className='space-y-4' onSubmit={onSubmit}>
          <InputFormField form={form} name='batchNumber' label='Batch Number' />
          <InputFormField form={form} name='expiryDate' label='Expiry Date' />

          {/* -----------------------------------------------------------------------------Batch stocks----------------------------------------------------------------------------------- */}
          <AppDivider text='Stocks' position='center' className='my-' />

          {/* stocks */}
          <div className="quantities bg-gray-50 p-3 flex flex-col gap-4 rounded-xl relative">
            {/* stock quantity info */}
            {stocksFields.map((stock, idx) => (
              <div className="stock grid grid-cols-4 gap-4 pr-4 relative" key={stock.id}>
                <div className="package col-span-2">
                  <SelectFormField form={form} name={`stocks.${idx}.package`} label="Package" placeholder="Select the unit" options={[]} className="" />
                </div>

                <div className="costPrice col-span-1">
                  <InputFormField form={form} name={`stocks.${idx}.costPrice`} type="number" label="Cost Price" placeholder="Enter Cost Price..." />
                </div>

                <div className="Quantity col-span-1">
                  <InputFormField form={form} name={`stocks.${idx}.quantity`} type="number" label="Quantity" placeholder="Enter Quantity..." />
                </div>

                {idx !== 0 && (
                  <div className="icon absolute -right-1.5 bottom-4 size-5">
                    <IconifyIcon icon="line-md:close" className="h-full w-full !text-sm !p-0.5" onClick={() => removeStock(idx)} />
                  </div>
                )}
              </div>
            ))}

            <div className="addPackageBtn ">
              <div onClick={handleAddStock} className="addVariantBtn w-fit flex items-center gap-2 cursor-pointer">
                {/* icon */}
                <IconifyIcon icon='lucide:plus' className='bg-primary text-white' />
                <p className='text-sm'>Add {('variants').length ? <span>another</span> : <span>a</span>} Stock</p>
              </div>
            </div>
          </div>

          {/* supplier's information */}
          {/* ---------------------------------------------------Supplier information---------------------------------------------------------------------------------------------------------------------- */}
          <AppDivider text="Supplier's Information" position='center' className='my-4' />

          <div className="supplierInformation flex flex-col gap-3 mt-4">
            <InputFormField form={form} name="supplierName" label="Supplier Name" placeholder="Enter Stock name..." />
            <InputFormField form={form} name="supplierContact" label="Supplier Contact" placeholder="Enter Stock name..." />
          </div>



          <AppDivider text="Stock Notes" position='center' className='my-4' />
          {/* Notes on the stock */}
          <TextAreaFormField form={form} name="note" label="Stock Notes" placeholder="Enter more Information about the stock..." />
        </form>
      </Form>
    </div>
  )
}

export default BatchDetails

