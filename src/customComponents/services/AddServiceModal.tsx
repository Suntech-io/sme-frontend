'use client'

import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ButtonLoading from '../Button'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { CheckBoxFormField, InputFormField, SelectFormField } from '../FormFields'
import { mobileMoneyProviders, paymentTypes } from '@/lib/globalConstants'
import StepperCard from '../StepperCard'
import NewServiceForm from './NewServiceForm'


const steps = [
    {
        id: 1,
        title: "Personal Information",
        description: "Enter your basic details",
        content: (
            // <div className="space-y-4">
            //     <div>
            //         <label className="block text-sm font-medium mb-2">Full Name</label>
            //         <input
            //             type="text"
            //             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            //             placeholder="Enter your full name"
            //         />
            //     </div>
            //     <div>
            //         <label className="block text-sm font-medium mb-2">Email Address</label>
            //         <input
            //             type="email"
            //             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            //             placeholder="Enter your email"
            //         />
            //     </div>
            //     <div>
            //         <label className="block text-sm font-medium mb-2">Phone Number</label>
            //         <input
            //             type="tel"
            //             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            //             placeholder="Enter your phone number"
            //         />
            //     </div>
            // </div>
            <NewServiceForm />
        ),
    },
    {
        id: 2,
        title: "Account Setup",
        description: "Configure your account preferences",
        content: (
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Username</label>
                    <input
                        type="text"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Choose a username"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input
                        type="password"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Create a password"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Account Type</label>
                    <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                        <option>Personal</option>
                        <option>Business</option>
                        <option>Enterprise</option>
                    </select>
                </div>
            </div>
        ),
    },
]


type AddCategoryProps = {
    modal?: boolean;
    open: boolean;
    onOpenChange?: (open: boolean) => void;
};

const addCategorySchema = z.object({
    categoryName: z.string().min(1, 'Category name is required'),
    LastName: z.string().min(1, 'Last Name is required'),
    email: z.string().min(1, 'Account number is required'),
    role: z.string().min(1, 'Role is required'),
});

const AddServiceModal = ({ modal = true, open = false, onOpenChange }: AddCategoryProps) => {
    const form = useForm<z.infer<typeof addCategorySchema>>({
        resolver: zodResolver(addCategorySchema),
        defaultValues: {
            categoryName: '',
            LastName: '',
            email: '',
            role: 'Active',
        },
    });


    const handleNextPage = (val: any) => {
        // Logic to handle next page
        console.log('Next page clicked', val);
        val()
    }

    const handlePrevPage =(val: any) => {
        // Logic to handle next page
        console.log('prev page clicked', val);
        val()
    }

    
    return (
        <Dialog modal={modal} open={open} onOpenChange={onOpenChange}>
            <Form {...form}>
                <form>
                    <DialogContent className="sm:max-w-[500px] h-[90vh] flex flex-col testg">
                        <DialogHeader>
                            <DialogTitle>Add Service</DialogTitle>
                            <DialogDescription>
                                Add a new Services to the ones that you already offer.
                            </DialogDescription>
                        </DialogHeader>

                        {/* stepper */}
                        <StepperCard steps={steps} description="" title='' rightBtnClicked={handleNextPage} leftBtnClicked={handlePrevPage}/>

                    </DialogContent>
                </form>
            </Form>
        </Dialog>
    )
}

export default AddServiceModal
