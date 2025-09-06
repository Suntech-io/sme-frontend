'use client';


import React, { useEffect, useState } from 'react';
import IconifyIcon from '@/customComponents/IconifyIcon';
import { useAppSettingsStore } from '@/app/store/appSettings';
import * as z from 'zod'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { CustomComboboxFormField, InputFormField, SelectFormField, SwitchFormField, TextAreaFormField } from '@/customComponents/FormFields';
import { DialogFooter } from '@/components/ui/dialog';
import ButtonLoading from '@/customComponents/Button';
import AppDivider from '@/customComponents/AppDivider';
import { mobileMoneyProviders, paymentTypes, TMeasurementUnit, unitOfMeasurement, unitOfMeasuremtentCategories } from '@/lib/globalConstants';
import InformationCard from '@/customComponents/InformationCard';
// Import v4 function
import { v4 as uuidv4 } from 'uuid';


const addNewStockSchema = z.object({
  stockName: z.string().min(1, 'Stock Name is required'),
  stockType: z.string().min(1, 'Stock type is required'),
  expiryDate: z.string().optional(),
  limit: z.string().min(1, 'Limit is required'),
  batchNumber: z.string().optional(),
  measurementCategory: z.string().min(1, 'Category is required'),
  stockNotes: z.string(),

  unitSizes: z.array(z.object({
    sizeName: z.string().min(1, 'Size name is required'),
    size: z.string().min(1, 'Size is required'),
    unitOfMeasurement: z.string().min(1, 'Unit of measurement is required'),
    id: z.string()
  })),

  packages: z.array(z.object({
    packageName: z.string().min(1, 'Package name is required'),
    unitSize: z.string().min(1, 'Measurement size is required'),
    packageSize: z.string().min(1, 'Package size is required'),
    id: z.string()
  })),

  stocks: z.array(z.object({
    package: z.string().min(1, 'Package is required'),
    costPrice: z.string().min(1, 'Cost price is required'),
    quantity: z.string().min(1, 'Quantity is required'),
    id: z.string()
  })),

  batchNotes:z.string(),

  supplierName: z.string().min(1, 'Supplier Name is required'),
  supplierContact: z.string().min(1, 'Supplier contact is required'),
  isActive: z.boolean().optional(),
  Description: z.string().optional(),

  // PAYMENT DETAILS
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
  .refine(
    (data) => data.stockType !== 'perishable' || (data.expiryDate && data.expiryDate.length > 0),
    {
      message: 'Expiry Date is required for perishable stock',
      path: ['expiryDate'],
    }
  )
  .superRefine((data, ctx) => {
    // Mobile Money required fields
    if (data.paymentType === "Mobile Money") {
      const mm = data.payeeDetails.mobileMoney;
      if (!mm?.provider || !mm?.walletNumber || !mm?.walletName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Mobile Money details are required",
          path: ["payeeDetails", "mobileMoney"]
        });
      }
    }

    // Bank required fields
    if (data.paymentType === "Bank") {
      const bank = data.payeeDetails.bankTransfer;
      if (!bank?.bankName || !bank?.accountNumber || !bank?.accountName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Bank Transfer details are required",
          path: ["payeeDetails", "bankTransfer"]
        });
      }
    }

    // Cheque required fields
    if (data.paymentType === "Cheque") {
      const cheque = data.payeeDetails.cheque;
      if (!cheque?.bankName || !cheque?.accountNumber || !cheque?.accountName || !cheque?.chequeNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cheque details are required",
          path: ["payeeDetails", "cheque"]
        });
      }
    }
  });

// unit of measurement description for information card
const UnitOfMeasurementInformation = () => {
  return (
    <div className='ml-3'>
      <ul className='list-disc'>
        <li>
          <span className='font-semibold'>Category:</span><span> The groupings of the units of measurement</span>
        </li>
        <li>
          <span className='font-semibold'>Unit:</span><span> These are standardized quantities used to express physical quantities such as length, mass, time, temperature, volume, etc.</span>
        </li>
      </ul>
    </div>
  )
}

const PackagesInformation = () => {
  return (
    <div className=''>
      <p>Packages are the presentation of how the stock comes. Either in packets/groups or as a unit</p>
      <ul className='list-disc mt-1 ml-3'>
        <li>
          <span className='font-semibold'>Package Name:</span><span> The name of a package - eg. 1 Litre</span>
        </li>
        <li>
          <span className='font-semibold'>Measurement Size:</span><span> How many units make </span>
        </li>
        <li>
          <span className='font-semibold'>1 Litre:</span><span> 1000 Millilitres</span>
        </li>
      </ul>
    </div>
  )
}


const StockQuantityInformation = () => {
  return (
    <div className=''>
      <p>Stock quantities are the sizes and quantities of the stocks being added</p>
      <ul className='list-disc mt-1 ml-3'>
        <li>
          <span className='font-semibold'>Package:</span><span>What package the stock comes in</span>
        </li>
        <li>
          <span className='font-semibold'>Cost price:</span><span> Price per unit package</span>
        </li>
        <li>
          <span className='font-semibold'>Quantity:</span><span> Quantity of the package</span>
        </li>
      </ul>
    </div>
  )
}


const page = () => {
  const { updatenoMaxWidthStatus } = useAppSettingsStore()
  const [stockUnits, setStockUnits] = useState<{ label: string, value: string }[]>([])
  const [sizeOptions, setSizeOptions] = useState<{ label: string, value: string }[]>([])
  const [packageOptions, setPackageOptions] = useState<{ label: string, value: string }[]>([]);

  // this is a useeffect that updates the no max width status to true when the page is mounted
  useEffect(() => {
    updatenoMaxWidthStatus(true)
    return () => {
      updatenoMaxWidthStatus(false)
    };
  }, [])


  const form = useForm<z.infer<typeof addNewStockSchema>>({
    resolver: zodResolver(addNewStockSchema),
    defaultValues: {
      stockName: '',
      stockType: '',
      expiryDate: '',
      measurementCategory: 'Weight',
      unitSizes: [{
        size: '',
        sizeName: '',
        unitOfMeasurement: '',
        id: uuidv4()
      }],
      packages: [
        {
          packageName: '',
          unitSize: '',
          packageSize: '',
          id: uuidv4()
        }
      ],
      stocks: [
        {
          costPrice: '',
          package: '',
          quantity: '',
          id: uuidv4()
        }
      ],
      limit: '',
      batchNumber: '',
      isActive: false,
      Description: '',

      // payment data
      paymentType: 'Cash',
      amountPaid: ''

    },
    mode: 'onChange'
  });


  // useFieldArray for each array field
  const {
    fields: unitSizesFields,
    append: appendUnitSize,
    remove: removeUnitSize,
    update: updateUnitSize
  } = useFieldArray({
    control: form.control,
    name: 'unitSizes',
    shouldUnregister: true
  });

  const {
    fields: packagesFields,
    append: appendPackage,
    remove: removePackage
  } = useFieldArray({
    control: form.control,
    name: 'packages'
  });

  const {
    fields: stocksFields,
    append: appendStock,
    remove: removeStock
  } = useFieldArray({
    control: form.control,
    name: 'stocks'
  });

  // Live watch for unitSizes
  const unitSizesWatch = useWatch({
    control: form.control,
    name: "unitSizes",
  });

  // Live watch for packages
  const packagesWatch = useWatch({
    control: form.control,
    name: "packages",
  });
  const stocks = form.watch('stocks')

  // useefect to update the stock unit options available 
  const measurementCategory = form.watch('measurementCategory')

  useEffect(() => {
    // handle the sizes provided the set category is countable
    if (measurementCategory == 'Countable') {
      form.setValue('unitSizes', [{
        size: '1',
        sizeName: 'Piece',
        unitOfMeasurement: 'Unit',
        id: uuidv4()
      }])
    }
    setStockUnits(unitOfMeasurement[measurementCategory as TMeasurementUnit])
    return () => {
    }
  }, [measurementCategory])

  // Update sizeOptions whenever unitSizes changes
  useEffect(() => {
    const formattedSizes = (unitSizesWatch || []).map((el) => ({
      label: el.sizeName || "",
      value: el.sizeName || uuidv4(),
    }));
    setSizeOptions(formattedSizes);
  }, [unitSizesWatch]);

  // Update packageOptions whenever packages changes
  useEffect(() => {
    const formattedPackages = (packagesWatch || []).map((el) => ({
      label: el.packageName || "",
      value: el.packageName || uuidv4(),
    }));
    setPackageOptions(formattedPackages);
  }, [packagesWatch]);


  const stockTypes: { value: any; label: string, customCmp: React.ComponentType<any> | React.ReactElement }[] = [
    {
      value: 'perishable',
      label: 'Perishable',
      customCmp: <div className="flex items-center gap-1">
        {/* icon */}
        <IconifyIcon icon='noto:green-apple' className="" />
        {/* optionDetails */}
        <div className="optionDets">
          {/* optionName */}
          <span className="font-medium text-green-500">Perishable</span>
          {/* optionDescription */}
          <div className="text-xs text-gray-500">Items that have a limited shelf life and require careful handling.</div>
        </div>
      </div>,
    },
    {
      value: 'non-perishable',
      label: 'Non-Perishable',
      customCmp: <div className="flex items-center gap-1">
        {/* icon */}
        <IconifyIcon icon='fluent-emoji-flat:canned-food' className="" />
        {/* optionDetails */}
        <div className="optionDets">
          {/* optionName */}
          <span className="font-medium text-yellow-500">Non-Perishable</span>
          {/* optionDescription */}
          <div className="text-xs text-gray-500">Items that are processed or packaged to prolonge storage to delay decay or spoiling.</div>
        </div>
      </div>,
    },
    {
      value: 'hazardous',
      label: 'Hazardous',
      customCmp: <div className="flex items-center gap-1">
        {/* icon */}
        <IconifyIcon icon='twemoji:biohazard' className="" />
        {/* optionDetails */}
        <div className="optionDets">
          {/* optionName */}
          <span className="font-medium text-orange-500">Hazardous</span>
          {/* optionDescription */}
          <div className="text-xs text-gray-500">Dangerous items that pose a risk to health, safety, property or the environment.</div>
        </div>
      </div>,
    },
    {
      value: 'regulated',
      label: 'Regulated',
      customCmp: <div className="flex items-center gap-1">
        {/* icon */}
        <IconifyIcon icon='vscode-icons:file-type-licensebat' className="" />
        {/* optionDetails */}
        <div className="optionDets">
          {/* optionName */}
          <span className="font-medium text-blue-500">Regulated</span>
          {/* optionDescription */}
          <div className="text-xs text-gray-500">Items that require special permits, licenses or certifications before they can be moved or sold.</div>
        </div>
      </div>,
    },
    {
      value: 'tool',
      label: 'Tool',
      customCmp: <div className="flex items-center gap-1">
        {/* icon */}
        <IconifyIcon icon='vscode-icons:folder-type-tools' className="" />
        {/* optionDetails */}
        <div className="optionDets">
          {/* optionName */}
          <span className="font-medium">Tool/Equipment</span>
          {/* optionDescription */}
          <div className="text-xs text-gray-500">It is an item that is used to facilitate the creation of a product or the delivery of a service.</div>
        </div>
      </div>,
    }
  ]

  // form submission
  const submitForm = (data: any) => {
    console.log('data', data)
  }

  // Add / remove helpers (useFieldArray append/remove)
  const handleAddSize = () =>
    appendUnitSize({
      size: '',
      sizeName: '',
      unitOfMeasurement: '',
      id: uuidv4()
    });

  const handleRemoveSize = (index: number) => removeUnitSize(index);

  const handleAddPackage = () =>
    appendPackage({
      packageName: '',
      unitSize: '',
      packageSize: '',
      id: uuidv4()
    });

  const handleRemovePackage = (index: number) => removePackage(index);

  const handleAddStock = () =>
    appendStock({
      costPrice: '',
      package: '',
      quantity: '',
      id: uuidv4()
    });

  const handleRemoveStock = (index: number) => removeStock(index);


  return (
    <div className='h-full min-h-fit m-o pb-10'>
      {/* page header */}
      <div className="topBar border-b bg-white z-20 px-8 py-6 sticky top-0">
        <div className="barContents mx-auto maximum-width flex items-center gap-6">
          {/* back */}
          <div className="arrowBack size-8 rounded-full bg-lightGrey">
            <IconifyIcon icon='ep:back' fontSize={14} />
          </div>
          {/* header details */}
          <div className="headerDetails">
            <p className='font-semibold text-2xl mb-1'>Add Stock</p>
            <p>Seamlessly add and manage your Stocks effortlessly</p>
          </div>
        </div>
      </div>

      {/* page content */}
      <div className="addProductsPage mx auto maximum-width mt-6 border rounded-[8px] bg-white p-4 py-8 ">
        {/* form content */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)} className='w-full'>

            <div className="formsContainer grid gap-10 grid-cols-2 relative">

              {/* STOCK INFORMATION SECTION --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
              <section className="stockInfo px-4 py-6 border hover:shadow-sm flex flex-col gap-4 rounded h-fit sticky ">
                <div className="formInputs space-y-4">
                  <div className="isActive flex items-center justify-between gap-10">
                    {/* stock price */}
                    <p className="totalStockCost">
                      <span className="text-gray-500 text-xs italic">Total Stock Cost:</span>
                      <span className="text-green-500 font-semibold"> $0.00</span>
                    </p>
                    {/* isActive */}
                    <SwitchFormField form={form} name='isActive' label="Active" className='flex flex-col items-end' />
                  </div>
                  <InputFormField form={form} name="stockName" label="Stock Name" placeholder="Enter Stock name..." />
                  {/* type */}
                  <CustomComboboxFormField options={stockTypes} form={form} name='stockType' placeholder='Select type' label='Stock type' />
                  {/* expiryDate - show only for perishable, hazardous, regulated */}
                  {(form.watch('stockType') === 'perishable' ||
                    form.watch('stockType') === 'hazardous' ||
                    form.watch('stockType') === 'regulated') && (
                      <InputFormField
                        form={form}
                        name="expiryDate"
                        label="Expiry Date"
                        placeholder="Enter expiry date..."
                        type='date'
                      />
                    )}
                  {/* limit */}
                  <InputFormField form={form} name="limit" label="Stock Limit" placeholder="" type='number' />
                  {/* batchNumber */}
                  <InputFormField form={form} name="batchNumber" label="Batch Number" placeholder="Enter batch number..." />
                  <AppDivider text="Stock Notes" position='center' className='my-4' />
                  {/* Notes on the stock */}
                  <TextAreaFormField form={form} name="stockNotes" label="Stock Notes" placeholder="Enter more Information about the stock..." />



                  {/* ---------------------------------------------------Unit of Measurement related information------------------------------------------------------------------------------------ */}
                  <AppDivider text='Unit of Measurement Setup' position='center' className='my-4' />
                  {/* some explanatory info on the packages */}
                  <InformationCard title='Measurement Legend' description={UnitOfMeasurementInformation} styling={{ mainContainer: 'bg-blue-50' }} />
                  {/* stock setup */}
                  <div className="stockSetup bg-gray-50 p-3 space-y-4 rounded-xl relative">
                    {/* unit category */}
                    <div className="unitCategory col-span-2">
                      <SelectFormField form={form} name="measurementCategory" label="Category of Unit of Measurement" placeholder="Select the category " options={unitOfMeasuremtentCategories} className='' />
                    </div>
                    {/* -----------------------------------------------------------------------------unit sizes setup----------------------------------------------------------------------------------- */}
                    <AppDivider text='Unit Sizes Setup' position='center' className='my-' />

                    {/* unit types */}
                    <div className="unitTypes space-y-4">
                      {/* unit */}
                      {unitSizesFields.map((field, idx) => (
                        <div className="unit grid grid-cols-4 gap-4 pr-4 relative" key={field.id}>
                          <div className="sizeName col-span-2">
                            <InputFormField disabled={form.watch('measurementCategory') == 'Countable'} form={form} name={`unitSizes.${idx}.sizeName`} label="Size Name" placeholder="Enter unit name..." />
                          </div>

                          <InputFormField disabled={form.watch('measurementCategory') == 'Countable'} form={form} name={`unitSizes.${idx}.size`} label="size" placeholder="Enter size.." type="number" />

                          <SelectFormField
                            form={form}
                            name={`unitSizes.${idx}.unitOfMeasurement`}
                            label="Unit of Measurement"
                            placeholder="Select the unit"
                            options={stockUnits}
                            disabled={form.watch('measurementCategory') == 'Countable'}
                            className=""
                          />

                          {idx !== 0 && (
                            <div className="icon absolute -right-1.5 bottom-4 size-5">
                              <IconifyIcon
                                icon="line-md:close"
                                className="h-full w-full !text-sm !p-0.5"
                                onClick={() => handleRemoveSize(idx)}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                      {form.watch('measurementCategory') !== 'Countable' && <div className="addVariantBtn ">
                        <div onClick={handleAddSize} className="addVariantBtn w-fit flex items-center gap-2 cursor-pointer">
                          {/* icon */}
                          <IconifyIcon icon='lucide:plus' className='bg-primary text-white' />
                          <p className='text-sm'>Add {('variants').length ? <span>another</span> : <span>a</span>} Size</p>
                        </div>
                      </div>}
                    </div>
                  </div>


                  {/* ---------------------------------------------------Packages Setup information---------------------------------------------------------------------------------------------------------------------- */}
                  <AppDivider text='Packages/Packets setup' position='center' className='my-4' />
                  {/* some explanatory info on the packages */}
                  <InformationCard title='Packages Setup Legend' description={PackagesInformation} styling={{ mainContainer: 'bg-blue-50' }} />

                  <div className="packagesSetup bg-gray-50 p-3 flex flex-col gap-4 rounded-xl relative">
                    {packagesFields.map((packet, idx) => (
                      <div className="package grid grid-cols-5 gap-4 pr-4 relative" key={packet.id}>
                        <div className="packageName col-span-2">
                          <InputFormField form={form} name={`packages.${idx}.packageName`} label="Package Name" placeholder="Enter Package name..." />
                        </div>

                        <div className="packageSize col-span-2">
                          <SelectFormField form={form} name={`packages.${idx}.unitSize`} label="Unit size" placeholder="Select the size" options={sizeOptions} className="" />
                        </div>

                        <div className="packageSize col-span-1">
                          <InputFormField form={form} name={`packages.${idx}.packageSize`} type="number" label="No. of Pieces." placeholder="Enter pieces..." />
                        </div>

                        {idx !== 0 && (
                          <div className="icon absolute -right-1.5 bottom-4 size-5">
                            <IconifyIcon icon="line-md:close" className="h-full w-full !text-sm !p-0.5" onClick={() => handleRemovePackage(idx)} />
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="addPackageBtn ">
                      <div onClick={handleAddPackage} className="addVariantBtn w-fit flex items-center gap-2 cursor-pointer">
                        {/* icon */}
                        <IconifyIcon icon='lucide:plus' className='bg-primary text-white' />
                        <p className='text-sm'>Add {('variants').length ? <span>another</span> : <span>a</span>} Package</p>
                      </div>
                    </div>
                  </div>



                  {/* ---------------------------------------------------Quantity and cost information for Batch---------------------------------------------------------------------------------------------------------------------- */}
                  <AppDivider text='Batch Quantity and Costs' position='center' className='my-4' />
                  {/* some explanatory info on the packages */}
                  <InformationCard title='Stock Quantity Legend' description={StockQuantityInformation} styling={{ mainContainer: 'bg-blue-50' }} />

                  <div className="quantities bg-gray-50 p-3 flex flex-col gap-4 rounded-xl relative">
                    {/* stock quantity info */}
                    {stocksFields.map((stock, idx) => (
                      <div className="stock grid grid-cols-4 gap-4 pr-4 relative" key={stock.id}>
                        <div className="package col-span-2">
                          <SelectFormField form={form} name={`stocks.${idx}.package`} label="Package" placeholder="Select the unit" options={packageOptions} className="" />
                        </div>

                        <div className="costPrice col-span-1">
                          <InputFormField form={form} name={`stocks.${idx}.costPrice`} type="number" label="Cost Price" placeholder="Enter Cost Price..." />
                        </div>

                        <div className="Quantity col-span-1">
                          <InputFormField form={form} name={`stocks.${idx}.quantity`} type="number" label="Quantity" placeholder="Enter Quantity..." />
                        </div>

                        {idx !== 0 && (
                          <div className="icon absolute -right-1.5 bottom-4 size-5">
                            <IconifyIcon icon="line-md:close" className="h-full w-full !text-sm !p-0.5" onClick={() => handleRemoveStock(idx)} />
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="addPackageBtn ">
                      <div onClick={handleAddStock} className="addVariantBtn w-fit flex items-center gap-2 cursor-pointer">
                        {/* icon */}
                        <IconifyIcon icon='lucide:plus' className='bg-primary text-white' />
                        <p className='text-sm'>Add {('variants').length ? <span>another</span> : <span>a</span>} Stock</p>
                      </div>
                    </div>
                  </div>

                  <AppDivider text="Batch Notes" position='center' className='my-4' />
                  {/* Notes on the stock */}
                  <TextAreaFormField form={form} name="batchNotes" label="Batch Notes" placeholder="Enter more Information about the Batch..." />


                  {/* supplier's information */}
                  {/* ---------------------------------------------------Supplier information---------------------------------------------------------------------------------------------------------------------- */}
                  <AppDivider text="Supplier's Information" position='center' className='my-4' />
                  {/* some explanatory info on the packages */}
                  <InformationCard title='Information' description={'this is some serious description'} styling={{ mainContainer: 'bg-blue-50' }} />
                  <div className="supplierInformation flex flex-col gap-3 mt-4">
                    <InputFormField form={form} name="supplierName" label="Supplier Name" placeholder="Enter Stock name..." />
                    <InputFormField form={form} name="supplierContact" label="Supplier Contact" placeholder="Enter Stock name..." />
                  </div>

                </div>
              </section>


              {/* STOCK PAYMENT SECTION --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
              <section className="stockInfo px-4 py-6 border hover:shadow-sm flex flex-col gap-4 rounded h-fit sticky top-30">
                <div className="formInputs space-y-4">
                  {/* Header sections */}
                  <div className="isActive flex items-center justify-between gap-10">
                    <div className="amounts space-y-">
                      {/* amount paid price */}
                      <p className="totalStockCost">
                        <span className="text-gray-500 text-xs italic">Total Amount Paid:</span>
                        <span className="text-green-500 font-semibold"> $0.00</span>
                      </p>
                      {/* amount still owed */}
                      <div className="amountOwed">
                        <p className="totalStockCost">
                          <span className="text-gray-500 text-xs italic">Total Amount Owed:</span>
                          <span className="text-red-500 font-semibold"> $0.00</span>
                        </p>
                      </div>
                    </div>
                    {/* isActive */}
                    <SwitchFormField form={form} name='paidInFull' label="Paid in Full" className='flex flex-col items-end' />
                  </div>
                  {/* -------------------------------------------------------------------------Payments Form-------------------------------------------------------------------------------------------- */}
                  <InputFormField form={form} name="amountPaid" label="Amount Paid" placeholder="Enter Stock name..." />
                  <InputFormField form={form} name="paymentDate" label="Payment Date" placeholder="Enter Date payment was made..." type='date' />
                  <SelectFormField form={form} name="paymentType" label="Payment Type" placeholder="Select the payment method..." options={paymentTypes} className='' />

                  {/* ---------------------------------------------------Payee Details------------------------------------------------------------------------------------ */}
                  <AppDivider text='Payee Details' position='center' className='my-4' />
                  <InformationCard title='Information' description={'this is some serious description'} styling={{ mainContainer: 'bg-blue-50' }} />
                  {/* Payee detailts */}
                  <div className="cashPaymentPayee space-y-4">
                    <InputFormField form={form} name={`payeeDetails.payeeName`} label="Payee Name" placeholder="Enter Payee name..." />
                    <InputFormField form={form} name="payeeDetails.payeeContact" label="Payee Contact" placeholder="Enter Payee Contact..." />
                  </div>

                  {/* Mobile Money */}
                  {form.watch('paymentType') == 'Mobile Money' && <div className="momo space-y-4">
                    <SelectFormField form={form} name="payeeDetails.mobileMoney.provider" label="Mobile Money Provider" placeholder="Select the provider..." options={mobileMoneyProviders} className='' />
                    <InputFormField form={form} name="payeeDetails.mobileMoney.walletNumber" label="Wallet Number" placeholder="Enter Wallet Number..." />
                    <InputFormField form={form} name="payeeDetails.mobileMoney.walletName" label="Wallet Name" placeholder="Wallet name..." />
                  </div>}

                  {/* bank transfer */}
                  {form.watch('paymentType') == 'Bank' && <div className="bankTransfer space-y-4">
                    <SelectFormField form={form} name="payeeDetails.bankTransfer.bankName" label="Bank Name" placeholder="Select the Bank Name..." options={mobileMoneyProviders} className='' />
                    <InputFormField form={form} name="payeeDetails.bankTransfer.accountNumber" label="Account Number" placeholder="Enter Account Number..." />
                    <InputFormField form={form} name="payeeDetails.bankTransfer.accountName" label="Account Name" placeholder="Account name..." />
                  </div>}

                  {/* Cheque */}
                  {form.watch('paymentType') == 'Cheque' && <div className="cheque space-y-4">
                    <SelectFormField form={form} name="payeeDetails.cheque.bankName" label="Bank Name" placeholder="Select the Bank Name..." options={mobileMoneyProviders} className='' />
                    <InputFormField form={form} name="payeeDetails.cheque.accountNumber" label="Account Number" placeholder="Enter Account Number..." />
                    <InputFormField form={form} name="payeeDetails.cheque.accountName" label="Account Name" placeholder="Account name..." />
                    <InputFormField form={form} name="payeeDetails.cheque.chequeNumber" label="Cheque Number" placeholder="Enter Cheque number..." />
                  </div>}


                  {/* payer details */}
                  {/* ---------------------------------------------------Payer Details------------------------------------------------------------------------------------ */}
                  {form.watch('paymentType') == 'Cash' && <div className="payerDet space-y-4">
                    <AppDivider text='Payer Details' position='center' className='my-4' />
                    <InformationCard title='' description={'this is some serious description'} styling={{ mainContainer: 'bg-blue-50' }} />
                    <div className="payerDetails space-y-4">
                      <InputFormField form={form} name="payerDetails.payerName" label="Payer Name" placeholder="Enter Account Number..." />
                      <InputFormField form={form} name="payerDetails.payerContact" label="Payer Contact" placeholder="Account name..." />
                    </div>
                  </div>}

                  <AppDivider text='Payment Description/Notes' position='center' className='my-4' />
                  {/* description */}
                  <TextAreaFormField form={form} name="paymentDescription" label="Payment Description" placeholder="Enter more description..." />
                </div>
              </section>

            </div>


            {/* buttoms */}
            <div className="btns flex justify-end mt-10 items-center gap-4">
              <ButtonLoading title='Cancel' className='text-red-500' outline />
              <ButtonLoading title='Add Product' />
            </div>

          </form>
        </Form >
      </div >
    </div >
  )
}

export default page
