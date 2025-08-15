'use client';

import React, { useEffect, useState } from 'react';
import IconifyIcon from '@/customComponents/IconifyIcon';
import { useAppSettingsStore } from '@/store/appSettings';
import * as z from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import {
  CustomComboboxFormField,
  InputFormField,
  SelectFormField,
  SwitchFormField,
  TextAreaFormField
} from '@/customComponents/FormFields';
import ButtonLoading from '@/customComponents/Button';
import AppDivider from '@/customComponents/AppDivider';
import {
  mobileMoneyProviders,
  paymentTypes,
  TMeasurementUnit,
  unitOfMeasurement,
  unitOfMeasuremtentCategories
} from '@/lib/globalConstants';
import InformationCard from '@/customComponents/InformationCard';
import { v4 as uuidv4 } from 'uuid';

const addNewStockChema = z.object({
  stockName: z.string().min(1, 'Stock Name is required'),
  stockType: z.string().min(1, 'Stock type is required'),
  expiryDate: z.string().optional(),
  limit: z.string().min(1, 'Limit is required'),
  batchNumber: z.string().optional(),
  measurementCategory: z.string().min(1, 'Category is required'),
  unitSizes: z.array(
    z.object({
      sizeName: z.string().min(1, 'Size name is required'),
      size: z.string().min(1, 'Size is required'),
      unitOfMeasurement: z.string().min(1, 'Unit of measurement is required'),
      id: z.string()
    })
  ),
  packages: z.array(
    z.object({
      packageName: z.string().min(1, 'Package name is required'),
      unitSize: z.string().min(1, 'Measurement size is required'),
      packageSize: z.string().min(1, 'Package size is required'),
      id: z.string()
    })
  ),
  stocks: z.array(
    z.object({
      package: z.string().min(1, 'Package is required'),
      costPrice: z.string().min(1, 'Cost price is required'),
      quantity: z.string().min(1, 'Quantity is required'),
      id: z.string()
    })
  ),
  supplierName: z.string().min(1, 'Supplier Name is required'),
  supplierContact: z.string().min(1, 'Supplier contact is required'),
  isActive: z.boolean().optional(),
  Description: z.string().optional()
}).refine(
  (data) => data.stockType !== 'perishable' || (data.expiryDate && data.expiryDate.length > 0),
  {
    message: 'Expiry Date is required for perishable stock',
    path: ['expiryDate']
  }
);

const UnitOfMeasurementInformation = () => (
  <div className="ml-3">
    <ul className="list-disc">
      <li>
        <span className="font-semibold">Category:</span>
        <span> The groupings of the units of measurement</span>
      </li>
      <li>
        <span className="font-semibold">Unit:</span>
        <span>
          {' '}
          These are standardized quantities used to express physical quantities such as length,
          mass, time, temperature, volume, etc.
        </span>
      </li>
    </ul>
  </div>
);

const PackagesInformation = () => (
  <div>
    <p>Packages are the presentation of how the stock comes. Either in packets/groups or as a unit</p>
    <ul className="list-disc mt-1 ml-3">
      <li>
        <span className="font-semibold">Package Name:</span>
        <span> The name of a package - eg. 1 Litre</span>
      </li>
      <li>
        <span className="font-semibold">Measurement Size:</span>
        <span> How many units make </span>
      </li>
      <li>
        <span className="font-semibold">1 Litre:</span>
        <span> 1000 Millilitres</span>
      </li>
    </ul>
  </div>
);

const StockQuantityInformation = () => (
  <div>
    <p>Stock quantities are the sizes and quantities of the stocks being added</p>
    <ul className="list-disc mt-1 ml-3">
      <li>
        <span className="font-semibold">Package:</span>
        <span>What package the stock comes in</span>
      </li>
      <li>
        <span className="font-semibold">Cost price:</span>
        <span> Price per unit package</span>
      </li>
      <li>
        <span className="font-semibold">Quantity:</span>
        <span> Quantity of the package</span>
      </li>
    </ul>
  </div>
);

const Page = () => {
  const { updatenoMaxWidthStatus } = useAppSettingsStore();
  const [stockUnits, setstockUnits] = useState<{ label: string; value: string }[]>([]);
  const [sizeOptions, setsizeOptions] = useState<{ label: string; value: string }[]>([]);
  const [packageOptions, setPackageOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    updatenoMaxWidthStatus(true);
    return () => {
      updatenoMaxWidthStatus(false);
    };
  }, [updatenoMaxWidthStatus]);

  const form = useForm<z.infer<typeof addNewStockChema>>({
    resolver: zodResolver(addNewStockChema),
    defaultValues: {
      stockName: '',
      stockType: '',
      expiryDate: '',
      measurementCategory: 'Weight',
      unitSizes: [
        {
          size: '',
          sizeName: '',
          unitOfMeasurement: '',
          id: uuidv4()
        }
      ],
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
      Description: ''
    },
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

  // watch values for dynamic option lists
  const measurementCategory = form.watch('measurementCategory');
  const unitSizesWatch = form.watch('unitSizes') || [];
  const packagesWatch = form.watch('packages') || [];

  // update stockUnits when measurementCategory changes
  useEffect(() => {
    setstockUnits(unitOfMeasurement[measurementCategory as TMeasurementUnit]);
  }, [measurementCategory]);

  // update sizeOptions when unitSizes change (for package unitSize select)
  useEffect(() => {
    console.log('unitSizesFields', unitSizesFields)
    const formattedSizes = (unitSizesWatch || []).map((el) => ({
      label: el.sizeName || '',
      value: el.sizeName || uuidv4()
    }));
    setsizeOptions(formattedSizes);
  }, [unitSizesWatch, unitSizesFields]);

  // update packageOptions when packages change (for stock.package select)
  useEffect(() => {
    const formatted = (packagesWatch || []).map((p) => ({
      label: p.packageName || '',
      value: p.packageName || uuidv4()
    }));
    setPackageOptions(formatted);
  }, [packagesWatch]);

  const stockTypes: { value: any; label: string; customCmp: React.ComponentType<any> | React.ReactElement }[] = [
    {
      value: 'perishable',
      label: 'Perishable',
      customCmp: (
        <div className="flex items-center gap-1">
          <IconifyIcon icon="noto:green-apple" className="" />
          <div className="optionDets">
            <span className="font-medium text-green-500">Perishable</span>
            <div className="text-xs text-gray-500">Items that have a limited shelf life and require careful handling.</div>
          </div>
        </div>
      )
    },
    {
      value: 'non-perishable',
      label: 'Non-Perishable',
      customCmp: (
        <div className="flex items-center gap-1">
          <IconifyIcon icon="fluent-emoji-flat:canned-food" className="" />
          <div className="optionDets">
            <span className="font-medium text-yellow-500">Non-Perishable</span>
            <div className="text-xs text-gray-500">Items that are processed or packaged to prolonge storage to delay decay or spoiling.</div>
          </div>
        </div>
      )
    },
    {
      value: 'hazardous',
      label: 'Hazardous',
      customCmp: (
        <div className="flex items-center gap-1">
          <IconifyIcon icon="twemoji:biohazard" className="" />
          <div className="optionDets">
            <span className="font-medium text-orange-500">Hazardous</span>
            <div className="text-xs text-gray-500">Dangerous items that pose a risk to health, safety, property or the environment.</div>
          </div>
        </div>
      )
    },
    {
      value: 'regulated',
      label: 'Regulated',
      customCmp: (
        <div className="flex items-center gap-1">
          <IconifyIcon icon="vscode-icons:file-type-licensebat" className="" />
          <div className="optionDets">
            <span className="font-medium text-blue-500">Regulated</span>
            <div className="text-xs text-gray-500">Items that require special permits, licenses or certifications before they can be moved or sold.</div>
          </div>
        </div>
      )
    },
    {
      value: 'tool',
      label: 'Tool',
      customCmp: (
        <div className="flex items-center gap-1">
          <IconifyIcon icon="vscode-icons:folder-type-tools" className="" />
          <div className="optionDets">
            <span className="font-medium">Tool/Equipment</span>
            <div className="text-xs text-gray-500">It is an item that is used to facilitate the creation of a product or the delivery of a service.</div>
          </div>
        </div>
      )
    }
  ];

  const submitForm = (data: any) => {
    console.log('data', data);
  };

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
    <div className="h-full min-h-fit m-o pb-10">
      <div className="topBar border-b bg-white z-20 px-8 py-6 sticky top-0">
        <div className="barContents mx-auto maximum-width flex items-center gap-6">
          <div className="arrowBack size-8 rounded-full bg-lightGrey">
            <IconifyIcon icon="ep:back" fontSize={14} />
          </div>
          <div className="headerDetails">
            <p className="font-semibold text-2xl mb-1">Add Stock</p>
            <p>Seamlessly add and manage your Stocks effortlessly</p>
          </div>
        </div>
      </div>

      <div className="addProductsPage mx auto maximum-width mt-6 border rounded-[8px] bg-white p-4 py-8 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)} className="w-full">
            <div className="formsContainer grid gap-10 grid-cols-2 relative">
              <section className="stockInfo px-4 py-6 border hover:shadow-sm flex flex-col gap-4 rounded h-fit sticky ">
                <div className="formInputs space-y-4">
                  <div className="isActive flex items-center justify-between gap-10">
                    <p className="totalStockCost">
                      <span className="text-gray-500 text-xs italic">Total Stock Cost:</span>
                      <span className="text-green-500 font-semibold"> $0.00</span>
                    </p>
                    <SwitchFormField form={form} name="isActive" label="Active" className="flex flex-col items-end" />
                  </div>

                  <InputFormField form={form} name="stockName" label="Stock Name" placeholder="Enter Stock name..." />
                  <CustomComboboxFormField options={stockTypes} form={form} name="stockType" placeholder="Select type" label="Stock type" />

                  {(form.watch('stockType') === 'perishable' ||
                    form.watch('stockType') === 'hazardous' ||
                    form.watch('stockType') === 'regulated') && (
                      <InputFormField form={form} name="expiryDate" label="Expiry Date" placeholder="Enter expiry date..." type="date" />
                    )}

                  <InputFormField form={form} name="limit" label="Stock Limit" placeholder="" type="number" />
                  <InputFormField form={form} name="batchNumber" label="Batch Number" placeholder="Enter batch number..." />

                  <AppDivider text="Unit of Measurement Setup" position="center" className="my-4" />
                  <InformationCard title="Measurement Legend" description={UnitOfMeasurementInformation} styling={{ mainContainer: 'bg-blue-50' }} />

                  <div className="stockSetup bg-gray-50 p-3 space-y-4 rounded-xl relative">
                    <div className="unitCategory col-span-2">
                      <SelectFormField
                        form={form}
                        name="measurementCategory"
                        label="Category of Unit of Measurement"
                        placeholder="Select the category "
                        options={unitOfMeasuremtentCategories}
                        className=""
                      />
                    </div>

                    <AppDivider text="Unit Sizes Setup" position="center" className="my-" />

                    <div className="unitTypes space-y-4">
                      {unitSizesFields.map((field, idx) => (
                        <div className="unit grid grid-cols-4 gap-4 pr-4 relative" key={field.id}>
                          <div className="sizeName col-span-2">
                            <InputFormField form={{ ...form, onchange: updateUnitSize }} name={`unitSizes.${idx}.sizeName`} label="Size Name" placeholder="Enter unit name..." />
                          </div>

                          <InputFormField form={{ ...form, onchange: updateUnitSize }} name={`unitSizes.${idx}.size`} label="size" placeholder="Enter size.." type="number" />

                          <SelectFormField
                            form={{ ...form, onchange: updateUnitSize }}
                            name={`unitSizes.${idx}.unitOfMeasurement`}
                            label="Unit of Measurement"
                            placeholder="Select the unit"
                            options={stockUnits}
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

                      <div className="addVariantBtn ">
                        <div onClick={handleAddSize} className="addVariantBtn w-fit flex items-center gap-2 cursor-pointer">
                          <IconifyIcon icon="lucide:plus" className="bg-primary text-white" />
                          <p className="text-sm">
                            Add {('variants').length ? <span>another</span> : <span>a</span>} Size
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <AppDivider text="Packages/Packets setup" position="center" className="my-4" />
                  <InformationCard title="Packages Setup Legend" description={PackagesInformation} styling={{ mainContainer: 'bg-blue-50' }} />

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
                        <IconifyIcon icon="lucide:plus" className="bg-primary text-white" />
                        <p className="text-sm">Add {('variants').length ? <span>another</span> : <span>a</span>} Package</p>
                      </div>
                    </div>
                  </div>

                  <AppDivider text="Stock Quantity and Costs" position="center" className="my-4" />
                  <InformationCard title="Stock Quantity Legend" description={StockQuantityInformation} styling={{ mainContainer: 'bg-blue-50' }} />

                  <div className="quantities bg-gray-50 p-3 flex flex-col gap-4 rounded-xl relative">
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
                        <IconifyIcon icon="lucide:plus" className="bg-primary text-white" />
                        <p className="text-sm">Add {('variants').length ? <span>another</span> : <span>a</span>} Stock</p>
                      </div>
                    </div>
                  </div>

                  <AppDivider text="Supplier's Information" position="center" className="my-4" />
                  <InformationCard title="Information" description={'this is some serious description'} styling={{ mainContainer: 'bg-blue-50' }} />
                  <div className="supplierInformation flex flex-col gap-3 mt-4">
                    <InputFormField form={form} name="supplierName" label="Supplier Name" placeholder="Enter Stock name..." />
                    <InputFormField form={form} name="supplierContact" label="Supplier Contact" placeholder="Enter Stock name..." />
                  </div>

                  <AppDivider text="Stock Notes" position="center" className="my-4" />
                  <TextAreaFormField form={form} name="Description" label="Stock Notes" placeholder="Enter more Information about the stock..." />
                </div>
              </section>

              <section className="stockInfo px-4 py-6 border hover:shadow-sm flex flex-col gap-4 rounded h-fit sticky top-30">
                <div className="formInputs space-y-4">
                  <div className="isActive flex items-center justify-between gap-10">
                    <div className="amounts space-y-">
                      <p className="totalStockCost">
                        <span className="text-gray-500 text-xs italic">Total Amount Paid:</span>
                        <span className="text-green-500 font-semibold"> $0.00</span>
                      </p>

                      <div className="amountOwed">
                        <p className="totalStockCost">
                          <span className="text-gray-500 text-xs italic">Total Amount Owed:</span>
                          <span className="text-red-500 font-semibold"> $0.00</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <AppDivider text="Payee Details" position="center" className="my-4" />
                  <InformationCard title="Information" description={'this is some serious description'} styling={{ mainContainer: 'bg-blue-50' }} />

                  {/* Payment fields commented out — keep your existing approach */}
                </div>
              </section>
            </div>

            <div className="btns flex justify-end mt-10 items-center gap-4">
              <ButtonLoading title="Cancel" className="text-red-500" outline />
              <ButtonLoading type="submit" title="Add Product" />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
