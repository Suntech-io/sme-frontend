import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { InputFormField, SelectFormField, SwitchFormField, TextAreaFormField } from "@/customComponents/FormFields";
import z from "zod";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import ProgressBarStepperCard, { ProgressBarStepperRef } from "@/customComponents/ProgressBarStepper";
import BatchDetails from "./batchSliderComponents/BatchDetails";
import BatchPaymentDetails from "./batchSliderComponents/BatchPaymentDetails";
import { useEffect, useRef, useState } from "react";
import ButtonLoading from "@/customComponents/Button";
import { v4 as uuidv4 } from 'uuid';

type AddPaymentMethodProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const newBatchSchema = z.object({
    batchNumber: z.string(),
    expiryDate: z.string().optional(),
    stocks: z.array(z.object({
        package: z.string().min(1, 'Package is required'),
        costPrice: z.string().min(1, 'Cost price is required'),
        quantity: z.string().min(1, 'Quantity is required'),
        id: z.string()
    })),
    batchNotes: z.string().optional(),
    supplierName: z.string().min(1, 'Supplier Name is required'),
    supplierContact: z.string().min(1, 'Supplier contact is required'),
});

const newBatchPaymentDataSchema = z.object({
    amountPaid: z.string().min(1, 'Amount paid is required'),
    paymentDate: z.string().min(1, 'Payment Date is required'),
    paymentType: z.enum(["Mobile Money", "Bank", "Cheque", "Cash"], {
        message: 'Payment type is required'
    }),

    // Payee details
    payeeDetails: z.object({
        payeeName: z.string().min(1, 'Payee Name is required'),
        payeeContact: z.string().min(1, 'Payee Contact'),

        mobileMoney: z.object({
            provider: z.string().min(1, 'Provider is required'),
            walletNumber: z.string().min(1, 'Wallet Number is required'),
            walletName: z.string().min(1, 'Wallet Name is required'),
        }).partial(), // will be conditionally required

        bankTransfer: z.object({
            bankName: z.string().min(1, 'Bank Name is required'),
            accountNumber: z.string().min(1, 'Account Number is required'),
            accountName: z.string().min(1, 'Account Name is required'),
        }).partial(),

        cheque: z.object({
            bankName: z.string().min(1, 'Bank Name is required'),
            accountNumber: z.string().min(1, 'Account Number is required'),
            accountName: z.string().min(1, 'Account Name is required'),
            chequeNumber: z.string().min(1, 'Cheque Number is required')
        }).partial(),

        payerDetails: z.object({
            payerName: z.string(),
            payerContact: z.string()
        }),
    }),

    payerDetails: z.object({
        payerName: z.string(),
        payerContact: z.string()
    }),

    paymentDescription: z.string()
})

// COMPONENT CODE--------------------------------------------------------------------
export default function AddBadgeSlider({ open, onOpenChange }: AddPaymentMethodProps) {
    const stepperRef = useRef<ProgressBarStepperRef>(null)
    const [currentPage, setcurrentPage] = useState<number>(1)

    const newBatchform = useForm<z.infer<typeof newBatchSchema>>({
        resolver: zodResolver(newBatchSchema),
        defaultValues: {
            batchNumber: '',
            stocks: [
                {
                    costPrice: '',
                    package: '',
                    quantity: '',
                    id: uuidv4()
                }
            ],
        },
    });


    const newBatchPaymentDataForm = useForm<z.infer<typeof newBatchPaymentDataSchema>>({
        resolver: zodResolver(newBatchPaymentDataSchema),
    })





    const handleNextPage = async () => {
        console.log('stepperRef current page', stepperRef.current?.currentStep)
        // Logic to handle next page
        // const isValid = await newBatchform.trigger()
        // handleServiceFormSubmit()
        stepperRef.current?.handleNext()
        // if (isValid) {
        //     val()
        // }
    }

    const handlePrevPage = () => {
        // Logic to handle next page
        stepperRef.current?.handlePrevious()
    }

    const {
        fields: stocksFields,
        append: appendStock,
        remove: removeStock
    } = useFieldArray({
        control: newBatchform.control,
        name: 'stocks'
    });


    // STEPS -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    const steps = [
        {
            id: 1,
            title: "Batch Information",
            stepHeaderStyle: "text-blue-600 text-base",
            // description: "Enter your basic details",

            content: (
                <BatchDetails form={newBatchform} onSubmit={() => { }} appendStock={appendStock} removeStock={removeStock} stocksFields={stocksFields} />
            ),
        },
        {
            id: 2,
            title: "Payment Information",
            // description: "Configure your account preferences",
            content: (
                <BatchPaymentDetails form={newBatchPaymentDataForm} onSubmit={() => { }} />
            ),
        },
    ]


    return (
        <Sheet modal={true} open={open} onOpenChange={onOpenChange} >
            <SheetContent className="min-w-[450px] max-h-screen flex flex-col">
                <SheetHeader className="shrink-0">
                    <SheetTitle>Add Batch</SheetTitle>
                    <SheetDescription>
                        Record the details of the new stock batch you want to add.
                    </SheetDescription>
                </SheetHeader>

                {/* main form content */}
                <div className="mainFormContent flex-1 overflow-y-auto p-4 max-h-full">
                    <ProgressBarStepperCard getCurrentStep={setcurrentPage} ref={stepperRef} steps={steps} mainContentClass="max-h-[85%] overflow-auto max-h-full" cardClass="max-h-full" progressBarClass="mb-1" hideControlButtons={true} />
                </div>

                <SheetFooter className="min-h-fit shrink-0">
                    <div className="affirmative">
                        {currentPage == 1 ? <Button type="submit" onClick={handleNextPage} className="w-full">Next</Button>
                            : <ButtonLoading type="submit" onClick={handleNextPage} className="w-full" title="Submit" />
                        }
                    </div>
                    {currentPage == 1 ? <SheetClose asChild className="transition-all">
                        <Button variant="outline">Cancel</Button>
                    </SheetClose>
                        :
                        <Button variant="outline" onClick={handlePrevPage} className="border border-primary text-primary">Previous</Button>
                    }
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
