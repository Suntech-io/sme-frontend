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
import { InputFormField, SelectFormField, SwitchFormField, TextAreaFormField } from "../FormFields";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Description } from "@radix-ui/react-dialog";


type AddPaymentMethodProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const stockOutModalSchema = z.object({
  name: z.string().min(1, 'Stock Name is required'),
  type: z.string().min(1, 'Stock type is required'),
  isActive: z.boolean().optional(),
  purpose: z.string().min(1, 'Purpose is required'),
  productMade: z.string().optional(),
  serviceRendered: z.string().optional(),
  description: z.string(),
  quantity: z.number().min(1, 'Quantity is required'),
});

export default function StockOutSideModal({ open, onOpenChange }: AddPaymentMethodProps) {
  const form = useForm<z.infer<typeof stockOutModalSchema>>({
    resolver: zodResolver(stockOutModalSchema),
    defaultValues: {
      name: '',
      type: '',
      isActive: true,
      purpose: '',
      description: '',
      quantity: 0,
    },
  });

  return (
    <Sheet modal={true} open={open} onOpenChange={onOpenChange} >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Stock Out</SheetTitle>
          <SheetDescription>
            Move stock out of your inventory. Ensure all details are correct before proceeding.
          </SheetDescription>
        </SheetHeader>
        <Form {...form} >
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
              {/* purpose */}
              <SelectFormField form={form} label="Purpose" name="purpose" options={[{ label: 'Render service', value: 'service' }, { label: 'Manufacture', value: 'manufacture' }, { label: 'Others', value: 'other' }]} />
              {/* productMade - show only if purpose is manufacture */}
              {form.watch('purpose') === 'manufacture' && (
                <SelectFormField options={[{ label: 'Bofrot', value: 'Bofrot' }]} form={form} name="productMade" label="Product Made" placeholder="Enter product made..." />
              )}
              {/* serviceRendered - show only if purpose is service */}
              {form.watch('purpose') === 'service' && (
                <SelectFormField options={[{ label: 'Barbering', value: 'Barbering' }]} form={form} name="serviceRendered" label="Service Rendered" placeholder="Enter service rendered..." />
              )}
              {/* quantity */}
              <InputFormField form={form} name="quantity" label="Quantity" placeholder="Enter stock quantity..." />
              {/* provided there are different batches of stocks selecting the stock and quantity */}
              <div className="batchSelectionsNQuantities">
                {/* This can be a dynamic list of batch selections and quantities */}
                <p className="text-sm text-mediumGrey">Select batch and quantity for the stock</p>
                {/* bathc and quantity */}
                <div className="grid grid-cols-6 gap-4 mt-2">
                  <div className="batch col-span-4">
                    <SelectFormField options={[{ label: 'Batch 1', value: 'Batch 1' }]} className="" form={form} name="batchNumber" label="Batch Number" placeholder="Enter batch number..." />
                  </div>
                  <div className="qty col-span-2">
                    <InputFormField className="" form={form} name="quantity" label="Quantity" placeholder="Enter quantity..." />
                  </div>
                </div>
              </div>
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
