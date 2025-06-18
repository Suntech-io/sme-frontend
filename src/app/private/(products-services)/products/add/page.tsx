'use client'

import { useAppSettingsStore } from '@/app/store/appSettings'
import IconifyIcon from '@/customComponents/IconifyIcon'
import React, { useEffect, useLayoutEffect, useState } from 'react'

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

import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { InputFormField, TextAreaFormField } from '@/customComponents/FormFields'
import ButtonLoading from '@/customComponents/Button'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

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

type ProductFormType = z.infer<typeof productSchema>;
type VariantType = ProductFormType['variants'][number];

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
      productImages: [],
      variants: [],
    }
  })

  const [optionField, setoptionField] = useState<Record<string, any>>({})

  const addOption = (option: { name: string; value: string }, variantIdx: number) => {
  const variants = productForm.getValues('variants') || [];
  if (!variants[variantIdx]) return;

  const updatedVariants = [...variants];
  updatedVariants[variantIdx] = {
    ...updatedVariants[variantIdx],
    options: [...(updatedVariants[variantIdx].options || []), option],
  };
  productForm.setValue('variants', updatedVariants);
};

  const addVariant = () => {
    const newVariant: VariantType = {
      options: [],
      price: '',
      quantity: '',
      images: []
    }
    // Get current variants
    const variants = productForm.getValues('variants') || [];
    // Add the new variant to the array
    const updatedVariants = [...variants, newVariant];
    // Update the form state
    productForm.setValue('variants', updatedVariants);
    console.log('variants', productForm.getValues('variants'))
  };

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

                    {/* variant */}
                    {
                      productForm.watch('variants')?.map((variant, idx) => (
                        <div className="variant bg-gray-50 p-3 flex flex-col gap-2 rounded-lg" key={idx}>
                          {/* variant options options */}
                          <div className="addOption flex items-center gap-1 ">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" className='!text-xs'>Add Option</Button>
                              </DialogTrigger>
                              <DialogContent className="w-[400px]">
                                <DialogHeader>
                                  <DialogTitle>Add Option</DialogTitle>
                                  <DialogDescription>
                                    Input the name of the option (eg. size)
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="flex items-center gap-2">
                                  <div className="grid flex-1 gap-2">
                                    <Label htmlFor="link" className="sr-only">
                                      Option Name
                                    </Label>
                                    <Input
                                      onChange={(e) => { setoptionField({ name: e.target.value, value: '' }) }}
                                    />
                                  </div>
                                </div>
                                <DialogFooter className="sm:justify-start">
                                  <DialogClose asChild>
                                    <Button type="button" variant="secondary" onClick={() => { addOption({ name: optionField.name, value: '' }, idx) }}>
                                      Add Option
                                    </Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>

                          <div className="options">
                            {
                              variant.options.map((option, optionIdx) => (
                                <InputFormField key={optionIdx} form={productForm} name={`variants.${idx}.options.${optionIdx}.value`} label={option.name} placeholder='Enter option value...' />
                              ))
                            }
                          </div>

                          {/* price and qty */}
                          <div className="priceNQty grid grid-cols-2 gap-4">
                            <InputFormField form={productForm} name='name' label="Price" placeholder='Enter variant price...' />
                            <InputFormField form={productForm} name='name' label="Quantity" placeholder='Enter variant quantity...' />
                          </div>
                        </div>
                      ))
                    }


                    <div className="addVariantBtn ">
                      <div onClick={() => { addVariant() }} className="addVariantBtn w-fit flex items-center gap-2 cursor-pointer">
                        {/* icon */}
                        <IconifyIcon icon='lucide:plus' className='bg-primary text-white' />
                        <p>Add {productForm.watch('variants').length ? <span>another</span> : <span>a</span>} variant</p>
                      </div>
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
