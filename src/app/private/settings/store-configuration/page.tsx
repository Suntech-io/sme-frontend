'use client'

import React from 'react'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { InputFormField, SwitchFormField } from '@/customComponents/FormFields'
import ButtonLoading from '@/customComponents/Button'
import { ghanaPhoneRegex } from '@/lib/globalConstants'
import { useForm } from 'react-hook-form'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from '@/customComponents/datatable'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import IconifyIcon from '@/customComponents/IconifyIcon'
import { cn } from '@/lib/utils'


const productConfigurationSchema = z.object({
  defaultCurrency: z.string().min(1, 'Default currency is required'),
  defaultShortageLimit: z.number().min(0, 'Default shortage limit must be a positive number'),
  showTaxInclusivePrices: z.boolean(),
  showDiscounts: z.boolean().optional(),
})


const paymentMethodData = [
  {
    type: 'Mobile Money',
    provider: 'MTN',
    accountNumber: '0541234567',
    status: 'Active',
  },
  {
    type: 'Mobile Money',
    provider: 'Telecel',
    accountNumber: '0206789063',
    status: 'Active',
  },
  {
    type: 'Bank',
    provider: 'Access Bank',
    accountNumber: '10344556789123',
    status: 'Active',
  },
  {
    type: 'Card Payment',
    provider: 'Master Card',
    accountNumber: '1234-5678-9012-3456',
    status: 'Active',
  },
  {
    type: 'Gateway',
    provider: 'Paystack',
    accountNumber: 'paystack-123456',
    status: 'Not Active',
  },
]

function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconifyIcon icon='solar:menu-dots-bold' />
      </PopoverTrigger>
      <PopoverContent className="w-40 px-2">
        <div className="grid gap-3">
          <div className="">
            {/* <p className="leading-none font-medium text-sm">Actions</p> */}

          </div>
          <div className="grid gap-2 text-xs text-darkGrey">
            <div className="grid p-2 hover:bg-gray-50">
              Edit
            </div>
            <div className="grid p-2 hover:bg-gray-50">
              Disable
            </div>
            <div className="grid p-2 hover:bg-gray-50">
              Delete
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const paymentMethodColumns: ColumnDef<any>[] = [
  {
    header: "Type",
    id: "type",
    accessorKey: "type",
  },
  {
    header: "Provider",
    id: "provider",
    accessorKey: "provider",
  },
  {
    header: "Account Number",
    id: "accountNumber",
    accessorKey: "accountNumber",
  },
  {
    header: "Status",
    id: "status",
    cell: ({ row }: any) => (
      <div className="w-[120px]">
        <div className={cn("status flex items-center gap-1 rounded-xl",row.original?.status === 'Active' ? 'bg-[#3E875E] text-white' : 'bg-lightGrey')}>
          <IconifyIcon fontSize={16} icon={row.original?.status === 'Active' ?'ic:round-check-circle':'mynaui:badge'} className={cn(row.original?.status === 'Active' ? 'text-white' : 'bg-lightGrey')} />
          <p>{row.original?.status}</p>
        </div>
      </div>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }: any) => (
      <PopoverDemo />
    ),
  },
]

const page = () => {
  const storeConfigForm = useForm<z.infer<typeof productConfigurationSchema>>({
    resolver: zodResolver(productConfigurationSchema),
    defaultValues: {
      defaultCurrency: '',
      defaultShortageLimit: 0,
      showTaxInclusivePrices: false,
      showDiscounts: false,
    }
  })


  return (
    <div className='storeConfigurationPage h-full'>
      <section className="stockSettings bg-white rounded-xl border p-4">
        {/* heading */}
        <div className=''>
          <p className='text-xl font-semibold'>Product Settings</p>

          <p className='mt-1 text-mediumGrey text-sm'>Control how your inventory is tracked, updated and monitored across your store.</p>
        </div>


        {/* form */}
        <div className="mt-6 ">
          <Form {...storeConfigForm}>
            <form onSubmit={storeConfigForm.handleSubmit((data) => {
              console.log("Store Configuration Submitted:", data);
              storeConfigForm.reset();
            })}
              className='space-y-4'>
              <div className="inputs grid grid-cols-2 gap-4">
                <InputFormField form={storeConfigForm} name='defaultCurrency' label="Default Currency" placeholder='Enter default currency...' />
                <InputFormField form={storeConfigForm} name='defaultShortageLimit' label="Default Shortage Limit" placeholder='Enter default shortage limit...' type='number' />
                <SwitchFormField form={storeConfigForm} name='showTaxInclusivePrices' label="Show Tax Inclusive Prices"  />
                <SwitchFormField form={storeConfigForm} name='showDiscounts' label="Show Discounts"  />
              </div>

              <div className="submitBtn w-fit mt-auto">
                <ButtonLoading className='' type='submit' loading={storeConfigForm.formState.isSubmitting} title='Save changes' />
              </div>
            </form>
          </Form>
        </div>

      </section>

      <section className="paymentMethodTable mt-10">
        <DataTable tableInformationContent={<div className='pb-5 flex justify-between'>
          {/* left side */}
          <div className="leftSide">
            <p className='text-xl font-semibold'>Payment Method</p>
            <p className='mt-1 text-mediumGrey text-sm'>Set up your preferred payment options to receive money from customers</p>
          </div>
          {/* right side */}
          <div className="rightSide">
            <ButtonLoading title='Add Payment Method' leftIcon='formkit:add' className='cursor-pointer w-fit' onClick={() => { console.log("Add Payment Method Clicked") }} />
          </div>

        </div>} columns={paymentMethodColumns} data={paymentMethodData} totalPages={1} />
      </section>
    </div>
  )
}

export default page
