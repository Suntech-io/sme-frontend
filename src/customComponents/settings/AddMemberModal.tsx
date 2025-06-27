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

type AddPaymentMethodProps = {
    modal?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
};

const addNewMemberSchema = z.object({
    firstName: z.string().min(1, 'First Name is required'),
    LastName: z.string().min(1, 'Last Name is required'),
    email: z.string().min(1, 'Account number is required'),
    role: z.string().min(1, 'Role is required'),
});

const AddMemberModal = ({ modal = true, open = false, onOpenChange }: AddPaymentMethodProps) => {
    const form = useForm<z.infer<typeof addNewMemberSchema>>({
        resolver: zodResolver(addNewMemberSchema),
        defaultValues: {
            firstName: '',
            LastName: '',
            email: '',
            role: 'Active',
        },
    });
    return (
        <Dialog modal={modal} open={open} onOpenChange={onOpenChange}>
            <Form {...form}>
                <form>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Add Member</DialogTitle>
                            <DialogDescription>
                                Add a new member to your store.
                            </DialogDescription>
                        </DialogHeader>
                        {/* inputs-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                        <div className="formInputs space-y-4">
                            <InputFormField form={form} name="firstName" label="First Name" placeholder="Enter First name..." />

                            {/* LastName */}
                            <InputFormField form={form} name="LastName" label="LastName" placeholder="Select LastName..." />
                            {/* Email */}
                            <InputFormField form={form} name="email" label="Email" placeholder="Enter email..." type='email' />
                            {/* role */}
                            <SelectFormField form={form} name="role" label="role" placeholder="Select role..." options={[
                                { label: 'Administrator', value: 'Administrator' },
                                { label: 'Sales Agent', value: 'Sales Agent' },
                            ]} />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <ButtonLoading variant={'outline'} title='Cancel' className='text-red-500' />
                                {/* <Button variant="outline">Cancel</Button> */}
                            </DialogClose>
                            <ButtonLoading title='Send invite' />
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Form>
        </Dialog>
    )
}

export default AddMemberModal
