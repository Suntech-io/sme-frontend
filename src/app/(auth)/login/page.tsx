'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { InputFormField, PasswordFormField } from '@/customComponents/FormFields'
import ButtonLoading from '@/customComponents/Button'
import { Button } from '@/components/ui/button'

const loginSchema = z.object({
  email: z.string().min(1, 'Email or username is required'),
  password: z.string().min(6, 'Password is required and must be atleast 6 characters')
})

const page = () => {

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  return (
    <div className='flex flex-col justify-center items-center w-[500px] mx-auto h-full'>
      <div className="headerSection text-left  w-full">
        {/* main header */}
        <p className="header ">
          Welcome Back
        </p>

        <p className="description mt-2 text-gray-500">
          Enter your email and password to login
        </p>
      </div>
      <Form {...loginForm}>
        <form className='w-full flex flex-col gap-3 mt-10'>
          <InputFormField form={loginForm} name='email' type='email' label="Email" />
          <PasswordFormField form={loginForm} name='email' label="Password" />

          <ButtonLoading title='Login' />
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

  )
}

export default page
