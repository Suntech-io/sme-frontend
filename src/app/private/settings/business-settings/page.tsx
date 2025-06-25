'use client'

import React from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { InputFormField, TextAreaFormField, SelectFormField, PhoneNumberFormField } from '@/customComponents/FormFields'
import ButtonLoading from '@/customComponents/Button'
import { ghanaPhoneRegex } from '@/lib/globalConstants'
import { useForm } from 'react-hook-form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const businessInformationSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  businessType: z.string().min(1, 'Business type is required'),
  registrationNumber: z.string().min(1, 'Registration number is required'),
  industry: z.string().min(1, 'Industry is required'),
  businessDescription: z.string().min(1, 'Business description is required'),
  businessLogo: z.any().optional()
})

const businessAddressSchema = z.object({
  businessAddress: z.string().min(1, 'Business address is required'),
  location: z.string().min(1, 'Location is required'),
  phoneNumber: z.string()
    .min(10, "Phone number must not be less than 10 digits")
    .regex(ghanaPhoneRegex, "Phone number must be a valid Ghanaian number"),
  email: z.string().email().min(1, 'Email is required'),
})

const page = () => {
  const businessInfoForm = useForm<z.infer<typeof businessInformationSchema>>({
    resolver: zodResolver(businessInformationSchema),
    defaultValues: {
      businessName: '',
      businessType: '',
      registrationNumber: '',
      industry: '',
      businessDescription: '',
      businessLogo: null
    }
  })

  const businessAddressForm = useForm<z.infer<typeof businessAddressSchema>>({
    resolver: zodResolver(businessAddressSchema),
    defaultValues: {
      businessAddress: '',
      location: '',
      phoneNumber: '',
      email: ''
    }
  })


  return (
    <div>
      {/* Business Information */}
      <div className="businessInformation bg-white rounded-lg border p-6 h-full ">
        {/* heading */}
        <div className=''>
          <p className='text-xl font-semibold'>Business Information</p>

          <p className='mt-1 text-mediumGrey text-sm'>Basic details that define your business across the platform</p>
        </div>

        {/* Form for Business Information */}
        <div className="businessInfoForm mt-6">
          <Form {...businessInfoForm}>
            <form onSubmit={businessInfoForm.handleSubmit(data => {
              businessInfoForm.reset();
              console.log("Business Information Submitted:", data);
            })} className="grid grid-cols-2 gap-x-10 gap-y-4">

              <InputFormField form={businessInfoForm} name="businessName" label="Business Name" placeholder="Enter your business name" />
              {/* <InputFormField form={businessInfoForm} name="businessType" label="Business Type" placeholder="Enter your business type" /> */}
              <SelectFormField form={businessInfoForm} name="businessType" label="Business Type" placeholder="Enter your business type" options={[]} className=''/>

              <InputFormField form={businessInfoForm} name="registrationNumber" label="Registration Number" placeholder="Enter your registration number" />
              {/* <InputFormField form={businessInfoForm} name="industry" label="Industry" placeholder="Enter your industry" />
               */}
              <SelectFormField form={businessInfoForm} name="industry" label="Industry" placeholder="Enter your industry" options={[]} />
              <TextAreaFormField form={businessInfoForm} name="businessDescription" label="Business Description" placeholder="Describe your business" />
              {/* business logo selection */}
              <div className="profileImageSelection flex items-center gap-2 mt-4">
                <div className="avatar size-14">
                  <Avatar className='w-full !h-full'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                {/* image selection */}
                <div className="imageSelection">
                  <label htmlFor='profilePic'>
                    <div className="chooser bg-[#5993C94D] text-xs px-2 py-1 rounded">Choose File</div>
                    <input type="file" id='profilePic' className='hidden' />
                  </label>
                </div>

                <p className='text-xs text-mediumGrey'>The maximum size is 2MB</p>
              </div>

              <div className="btnContainer mt-2">
                <ButtonLoading type="submit" title='Save Changes' />
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Contact and Location Details */}
      <div className="businessLocationDetails">
        <div className="businessAddress bg-white rounded-lg border p-6 h-full mt-5">
          {/* heading */}
          <div className=''>
            <p className='text-xl font-semibold'>Contact and Location Details</p>

            <p className='mt-1 text-mediumGrey text-sm'>Provide your business contact and location details</p>
          </div>

          {/* Form for Business Address */}
          <div className="businessAddressForm mt-6">
            <Form {...businessAddressForm}>
              <form onSubmit={businessAddressForm.handleSubmit(data => {
                businessAddressForm.reset();
                console.log("Business Address Submitted:", data);
              })} className="grid grid-cols-2 gap-x-10 gap-y-4">

                <InputFormField form={businessAddressForm} name="businessAddress" label="Business Address" placeholder="Enter your business address" />
                <InputFormField form={businessAddressForm} name="location" label="Location" placeholder="Enter your location" />
                <PhoneNumberFormField form={businessAddressForm} name="phoneNumber" label="Phone Number" placeholder="Enter your phone number" />
                <InputFormField form={businessAddressForm} name="email" label="Email" placeholder="Enter your email address" />

                <div className="btnContainer mt-2">
                  <ButtonLoading type="submit" title='Save Changes' />
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
