'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { InputFormField, PasswordFormField } from '@/customComponents/FormFields'
import ButtonLoading from '@/customComponents/Button'
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'


const loginSchema = z.object({
  email: z.string().min(1, 'Email or username is required'),
  password: z.string().min(6, 'Password is required and must be atleast 6 characters')
})


const login = () => {
    const navigate = useRouter()

    const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

    return (
        <div className='loginPage h-screen grid grid-cols-4 w-full'>
            {/* hero Section */}
            <div className={cn("heroSection col-span-2 h-full relative px-[60px] flex justify-center", 'bg-[#e6f6fe74]')}>

                <div className="heroContainer mt-28 w-[600px]">
                    <p className="header text-[40px] font-semibold">
                        Manage your business smarter with <span className='text-primary'>OneBiz</span>
                    </p>

                    <p className="font-medium text-[18px] mt-4 text-mediumGrey">
                        Your all-in-one platform for products, services, and sales. Start growing today.
                    </p>

                    {/* heroImage */}
                    <div className="heroImage mt-14">
                        <img src="/images/loginHero.svg" alt="hero image" className='w-full h-full object-cover' />
                    </div>
                </div>
            </div>

            {/* child views */}
            <div className='p-4 h-full flex flex-col col-span-2'>
                {/* logo */}
                <div className="logo cursor-pointer">
                    <p className='' >
                        Logos
                    </p>
                </div>

                <div className='flex flex-col justify-center items-center w-[500px] mx-auto h-full'>
                    <div className="headerSection text-left  w-full">
                        {/* main header */}
                        <p className="header ">
                            Welcome Back to OneBiz
                        </p>

                        <p className="description mt-2 text-gray-500">
                            Access your business dashboard in seconds. Log in into your account
                        </p>
                    </div>
                    <Form {...loginForm}>
                        <form className='w-full flex flex-col gap-3 mt-10'>
                            <InputFormField form={loginForm} name='email' type='email' label="Email" placeholder='Enter email...'/>
                            <PasswordFormField form={loginForm} name='password' label="Password" placeholder='Enter password...'/>

                            <ButtonLoading title='Login' onClick={() => navigate.push('/private/dashboard')}/>
                        </form>
                        <Button variant="link" className='self-end cursor-pointer'>Forgot Password</Button>
                    </Form>


                    {/* footer */}
                    <div className="footer mt-4">
                        <p className="text-sm text-gray-500 ">
                            By signing in or creating an account, you agree to our{' '}
                            <a href="/terms" className="text-blue-500 underline">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="/privacy" className="text-blue-500 underline">
                                Privacy Policy
                            </a>.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default login
