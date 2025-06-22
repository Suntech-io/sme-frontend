'use client'

import React from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { InputFormField, PasswordFormField, PhoneNumberFormField } from '@/customComponents/FormFields'
import ButtonLoading from '@/customComponents/Button'
import { ghanaPhoneRegex } from '@/lib/globalConstants'
import { useForm } from 'react-hook-form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const personalDetailsSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    middleName: z.string(),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email().min(1, 'Email is required'),
    phoneNumber: z.string()
        .min(10, "Phone number must not be less than 10 digits")
        .regex(ghanaPhoneRegex, "Phone number must be a valid Ghanaian number"),
    profilePic: z.any()
})

const securityDetailsSchema = z.object({
    currentPassword: z.string().min(8, 'Your current password is required'),
    newPassword: z.string().min(8, 'Your new password is required'),
    confirmPassword: z.string().min(8, 'You have to confirm your new password'),
}).superRefine((data, ctx) => {
    if (data.confirmPassword !== data.newPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['confirmPassword'],
            message: "Passwords do not match"
        });
    }
});

const page = () => {
    const personalDetsForm = useForm<z.infer<typeof personalDetailsSchema>>({
        resolver: zodResolver(personalDetailsSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            middleName: '',
            phoneNumber: ''
        }
    })

    const securityDetsForm = useForm<z.infer<typeof securityDetailsSchema>>({
        resolver: zodResolver(securityDetailsSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    })
    // Handle form submission for personal details
    const handlePersonalDetailsSubmit = async (data: z.infer<typeof personalDetailsSchema>) => {
        personalDetsForm.reset();
        console.log("Personal Details Submitted:", data);
        // Here you would typically send the data to your server
    }
    // Handle form submission for security details
    const handleSecurityDetailsSubmit = async (data: z.infer<typeof securityDetailsSchema>) => {
        securityDetsForm.reset();
        console.log("Security Details Submitted:", data);
        // Here you would typically send the data to your server
    }
    return (
        <div className='userProfilePage h-full grid grid-cols-2 gap-5'>
            {/* Personal Details */}
            <section className="personalDetails bg-white rounded-lg border p-6 h-full flex flex-col">
                {/* heading */}
                <div className=''>
                    <p className='text-xl font-semibold'>Personal Details</p>

                    <p className='mt-1 text-mediumGrey text-sm'>To update your details, change the fields and click on update, below...</p>
                </div>

                {/* form */}
                <div className="personalDetsForm mt-6 h-full ">
                    <Form {...personalDetsForm}>
                        <form className='space-y-4 h-full flex flex-col'  onSubmit={personalDetsForm.handleSubmit(handlePersonalDetailsSubmit)}>
                            <InputFormField form={personalDetsForm} name='firstName' label="First Name" placeholder='Enter First name...' />
                            <InputFormField form={personalDetsForm} name='middleName' label="Middle Name" placeholder='Enter Middle name...' />
                            <InputFormField form={personalDetsForm} name='lastName' label="Last Name" placeholder='Enter Last name...' />
                            <InputFormField form={personalDetsForm} name='email' label="Email" placeholder='Enter email name...' />
                            <PhoneNumberFormField form={personalDetsForm} name="phoneNumber"
                                label="Phone Number"
                                placeholder="Phone number"
                                className='w-[50%]'
                            />

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

                            <div className="submitBtn w-fit mt-auto">
                                <ButtonLoading
                                    className='w-full mt-4'
                                    type='submit'
                                    loading={personalDetsForm.formState.isSubmitting}
                                    disabled={personalDetsForm.formState.isSubmitting}
                                    title='Update Details'
                                />
                            </div>
                        </form>
                    </Form>
                </div>
            </section>
            {/* security details */}
            <section className="securityDetails bg-white rounded-lg border p-6 h-full flex flex-col">
                {/* heading */}
                <div className=''>
                    <p className='text-xl font-semibold'>Security Details</p>

                    <p className='mt-1 text-mediumGrey text-sm'>Make sure your new Password is atleast 8 characters and with either a number or symbol...</p>
                </div>

                {/* form */}
                <div className="SecurityDetsForm mt-6 h-full ">
                    <Form {...securityDetsForm}>
                        <form className='space-y-4 h-full flex flex-col'  onSubmit={securityDetsForm.handleSubmit(handleSecurityDetailsSubmit)}>
                            <PasswordFormField form={securityDetsForm} name='currentPassword' label="Current Password" placeholder='Enter Current password...' />
                            <PasswordFormField form={securityDetsForm} name='newPassword' label="New Password" placeholder='Enter New password...' />
                            <PasswordFormField form={securityDetsForm} name='confirmPassword' label="Confirm Password" placeholder='Confirm your password...' />

                            <div className="submitBtn w-fit mt-auto">
                                <ButtonLoading
                                    className='w-full mt-4'
                                    type='submit'
                                    loading={securityDetsForm.formState.isSubmitting}
                                    disabled={securityDetsForm.formState.isSubmitting}
                                    title='Update Details'
                                />
                            </div>
                        </form>
                    </Form>
                </div>
            </section>

        </div>
    )
}

export default page
