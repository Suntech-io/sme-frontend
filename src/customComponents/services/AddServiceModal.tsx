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
import ProgressBarStepperCard from '../ProgressBarStepper'
import ServiceImageSelectionForm from './ServiceImageSelectionForm'


type AddCategoryProps = {
    modal?: boolean;
    open: boolean;
    onOpenChange?: (open: boolean) => void;
};

const newServiceFormSchema = z.object({
    serviceName: z.string().min(1, 'Service Name is required'),
    description: z.string().min(1, 'Description is required'),
    category: z.string().min(1, 'Category is required'),
    priceType: z.string().min(1, 'Pricing type is required'),
    price: z.string().min(1, 'Price is required'),
    status: z.string().min(1, 'Status is required'),
})


const AddServiceModal = ({ modal = true, open = false, onOpenChange }: AddCategoryProps) => {

    const Serviceform = useForm<z.infer<typeof newServiceFormSchema>>({
        resolver: zodResolver(newServiceFormSchema),
        mode:'onChange',
        defaultValues: {
            category: 'sd',
            description: 'Some Description',
            price: '',
            priceType: 'dsd',
            serviceName: '',
            status: 'good'
        },
    });
     const handleNextPage = async (val: any) => {
        console.log('------->', val)
        // Logic to handle next page
        const isValid = await Serviceform.trigger()
        // handleServiceFormSubmit()
        if (isValid) {
            val()
        }
    }

    const handlePrevPage = (val: any) => {
        // Logic to handle next page
        console.log('prev page clicked', val);
        val()
    }

    const handleServiceFormSubmit = (data:any) => {
        console.log('first', data)
        console.log('form', Serviceform.getValues())
    }


    // STEPS -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    const steps = [
        {
            id: 1,
            // title: "Personal Information",
            // description: "Enter your basic details",
            content: (
                <NewServiceForm form={Serviceform} onSubmit={Serviceform.handleSubmit(handleServiceFormSubmit)} />
            ),
        },
        {
            id: 2,
            // title: "Account Setup",
            // description: "Configure your account preferences",
            content: (
                <ServiceImageSelectionForm />
            ),
        },
    ]



    return (
        <Dialog modal={modal} open={open} onOpenChange={onOpenChange}>

            <DialogContent className="sm:max-w-[500px] h-[90vh] flex flex-col testg">
                <DialogHeader>
                    <DialogTitle>Add Service</DialogTitle>
                    <DialogDescription>
                        Add a new Services to the ones that you already offer.
                    </DialogDescription>
                </DialogHeader>

                {/* stepper */}
                {/* <StepperCard steps={steps} description="" title='' rightBtnClicked={handleNextPage} leftBtnClicked={handlePrevPage} /> */}
                <ProgressBarStepperCard steps={steps} rightBtnClicked={handleNextPage} leftBtnClicked={handlePrevPage}/>

            </DialogContent>
        </Dialog>
    )
}

export default AddServiceModal
