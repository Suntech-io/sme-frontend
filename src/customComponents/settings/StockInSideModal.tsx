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
import { InputFormField, SwitchFormField, TextAreaFormField } from "../FormFields";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";


type AddPaymentMethodProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const stockInModalSchema = z.object({
    name: z.string().min(1, 'Stock Name is required'),
    type: z.string().min(1, 'Stock type is required'),
    expiryDate: z.string().optional(),
    batchNumber: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
    quantity: z.number().min(1, 'Quantity is required'),
    dateReceived: z.string(),
});

export default function StockInModal({ open, onOpenChange }: AddPaymentMethodProps) {
    const form = useForm<z.infer<typeof stockInModalSchema>>({
        resolver: zodResolver(stockInModalSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            type: '',
            expiryDate: '',
            batchNumber: '',
            quantity: 0,
            dateReceived: new Date().toISOString().split('T')[0],
            isActive: true,
            description: '',
        },
    });

    return (
        <Sheet modal={true} open={open} onOpenChange={onOpenChange}>
            <SheetContent className="flex flex-col justify-between h-full">
                <SheetHeader>
                    <SheetTitle>Stock In</SheetTitle>
                    <SheetDescription>
                        Add new stock to your inventory. Ensure all details are correct before proceeding.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form action="" className="flex flex-col flex-1 max-h-[80vh] overflow-y-auto">
                        <div className="grid flex-1 auto-rows-min gap-6 px-4">
                            <div className="isActive flex justify-end">
                                {/* isActive */}
                                <SwitchFormField form={form} name='isActive' label="Active" />
                            </div>
                            {/* name */}
                            <InputFormField form={form} name="name" label="Stock Name" placeholder="Enter stock name..." />
                            {/* type */}
                            <InputFormField form={form} name="type" label="Stock Type" placeholder="Enter stock type..." />
                            {/* expiryDate */}
                            <InputFormField form={form} name="expiryDate" label="Expiry Date" placeholder="Enter expiry date..." />
                            {/* batchNumber */}
                            <InputFormField form={form} name="batchNumber" label="Batch Number" placeholder="Enter batch number..." />
                            {/* quantity */}
                            <InputFormField form={form} name="quantity" label="Quantity" placeholder="Enter stock quantity..." />
                            {/* dateReceived */}
                            <InputFormField form={form} name="dateReceived" label="Date Received" type="date" placeholder="Enter date received..." />
                            {/* description */}
                            <TextAreaFormField form={form} name="description" label="Description" placeholder="Enter more description..." />
                        </div>
                    </form>
                </Form>
                <SheetFooter>
                    <Button type="submit">Save changes</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
