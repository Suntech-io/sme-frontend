'use client'

import { useAppSettingsStore } from '@/app/store/appSettings'
import IconifyIcon from '@/customComponents/IconifyIcon'
import React, { useEffect, useLayoutEffect } from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { InputFormField, TextAreaFormField } from '@/customComponents/FormFields'
import ButtonLoading from '@/customComponents/Button'

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  category: z.string().min(1, 'Product category is required'),
  description: z.string().min(1, 'Product description is required'),
  brand: z.string(),
  price: z.string({ message: 'Price must be a number' }).min(1, 'Price is required'),
  shortageLimit: z.string({ message: 'Shortage limit must be a number' }).min(1, 'Shortage limit is required'),
  productImages: z.array(z.any()),
  variants: z.array(z.object({
    options: z.array(z.object({ name: z.string().min(1), value: z.string().min(1) })),
    price: z.string().min(1, 'Price of variant is required'),
    quantity: z.string().min(1),
    images: z.array(z.any()).min(1).max(3)
  }))
})
const page = () => {
  const { updatenoMaxWidthStatus } = useAppSettingsStore()

  useEffect(() => {
    updatenoMaxWidthStatus(true)

    return () => {
      updatenoMaxWidthStatus(false)
    };
  }, [])

  const productForm = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      brand: '',
      category: '',
      description: '',
      name: '',
      price: '',
      shortageLimit: '',
      productImages: []
    }
  })

  return (
    <div className='h-full m-o'>
      <div className="topBar border-b bg-white px-8 py-6">
        <div className="barContents mx-auto maximum-width flex items-center gap-6">
          {/* back */}
          <div className="arrowBack size-8 rounded-full bg-lightGrey">
            <IconifyIcon icon='ep:back' fontSize={14} />
          </div>
          {/* header details */}
          <div className="headerDetails">
            <p className='font-semibold text-2xl mb-1'>Add Product</p>
            <p>Seamlessly add and manage your product effortlessly</p>
          </div>
        </div>
      </div>

      <div className="addProductsPage mx auto maximum-width mt-6 border rounded-[8px] bg-white p-6 py-8">
        {/* form content */}
        <Form {...productForm}>
          <form className="formContent w-full ">
            <div className="inputsContainer grid gap-10 grid-cols-2 w-full">
              {/* left side */}
              <div className="leftSide px-4 py-6 border shadow flex flex-col gap-4 rounded">
                <InputFormField form={productForm} name='name' label="Product Name" placeholder='Enter product name...' />
                <InputFormField form={productForm} name='category' label="Category" placeholder='Enter product category...' />
                <TextAreaFormField form={productForm} name='name' label="Product description" placeholder='Enter product description...' />
                <InputFormField form={productForm} name='brand' label="Brand" placeholder='Enter brand name...' />
                <InputFormField form={productForm} name='price' label="Price" placeholder='Enter price...' />
                <InputFormField form={productForm} name='name' label="Product Name" placeholder='Enter product name...' />
                <InputFormField form={productForm} name='shortageLimit' label="Stock threshold alert" placeholder='Enter shortage limit...' />
              </div>

              {/* right side */}
              <div className="rightSide px-4 py-6 border shadow flex flex-col gap-4 rounded">
                <div className="images">
                  {/* image selection */}
                  <div className="imageSelection ">
                    <label htmlFor='productImages' className=' flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 data-[error=true]:text-destructive'>Product images <span className='text-red-500'>*</span></label>
                    <div className="selectionContainer bg-[#F7F9FF] h-[227px] border border-dashed mt-2 rounded flex flex-col items-center justify-center gap-2">
                      {/* image icon */}
                      <IconifyIcon icon='mage:image-upload' fontSize={40} className='text-lg text-blue-600' />
                      <div className="textSection text-center">
                        <p className='text-sm'> <label className='text-blue-600' htmlFor='productImages'>Click here</label> to upload or drag and drop</p>
                        <p className='text-xs'>Maximum file size 2MB</p>
                        <input type='file' className='hidden' id='productImages' />
                      </div>
                    </div>
                  </div>
                  {/* list of selected images */}
                  <div className="selectedImagesList mt-4 p-.5">
                    <div className="prodImage size-[85px] rounded-lg shadow relative">
                      <img
                        src="/images/sampleProdImage.png"
                        alt="Picture of the author"
                        className='size-full bg-cover'
                      />

                      {/* remove btn */}
                      <div className="icon absolute right-0 top-0 size-4">
                        <IconifyIcon icon='line-md:close' className='h-full w-full !text-sm !p-0.5' />
                      </div>
                    </div>
                  </div>

                  {/* add other variants */}
                  <section className="variants flex flex-col gap-4 mt-8">

                    <div className="variant bg-gray-50 p-3 flex flex-col gap-2">
                        {/* variant options options */}
                        <div className="addOption flex items-center gap-1">
                          <IconifyIcon icon='formkit:add' className=''/>
                          <p className="text-sm">Add Option</p>
                        </div>

                        <InputFormField form={productForm} name='name' label="Product Name" placeholder='Enter product name...' />
                    </div>


                    <div className="addVariantBtn flex items-center gap-4">
                      {/* icon */}
                      <IconifyIcon icon='iconoir:plus' className='bg-primary text-white' />
                      <p>Add {true ? <span>a</span> : <span>another</span>} variant</p>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* buttoms */}
            <div className="btns flex justify-end mt-6 items-center gap-4">
              <ButtonLoading title='Cancel' className='text-red-500' outline />
              <ButtonLoading title='Add Product' />
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default page
