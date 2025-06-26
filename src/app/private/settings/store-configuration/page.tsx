'use client'

import React from 'react'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { InputFormField, PasswordFormField, PhoneNumberFormField } from '@/customComponents/FormFields'
import ButtonLoading from '@/customComponents/Button'
import { ghanaPhoneRegex } from '@/lib/globalConstants'
import { useForm } from 'react-hook-form'


const productConfigurationSchema = z.object({
  defaultCurrency: z.string().min(1, 'Default currency is required'),
  defaultShortageLimit: z.number().min(0, 'Default shortage limit must be a positive number'),
  showTaxInclusivePrices: z.boolean(),
  showDiscounts: z.boolean().optional(),
})

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
      <section className="stockSettings bg-white rounded-lg border p-6">
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
                <InputFormField form={storeConfigForm} name='showTaxInclusivePrices' label="Show Tax Inclusive Prices" type='checkbox' />
                <InputFormField form={storeConfigForm} name='showDiscounts' label="Show Discounts" type='checkbox' />
              </div>

              <div className="submitBtn w-fit mt-auto">
                <ButtonLoading className='' type='submit' loading={storeConfigForm.formState.isSubmitting} title='Update Settings' />
              </div>
            </form>
          </Form>
        </div>

      </section>

      Store config
    </div>
  )
}

export default page
