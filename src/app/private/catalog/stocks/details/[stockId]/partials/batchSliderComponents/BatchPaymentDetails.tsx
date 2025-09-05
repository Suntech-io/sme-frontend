'use client';

import { Form } from '@/components/ui/form';
import AppDivider from '@/customComponents/AppDivider';
import { InputFormField, SelectFormField, TextAreaFormField } from '@/customComponents/FormFields';
import { mobileMoneyProviders, paymentTypes } from '@/lib/globalConstants';
import React from 'react'

const BatchPaymentDetails = ({ form, onSubmit }: { form: any, onSubmit: (val?: any) => void }) => {
  return (
    <div className='BatchPaymentDetails h-full w-full'>
      <Form {...form}>
        <form action="" className='space-y-4' onSubmit={onSubmit}>
          <InputFormField form={form} name="amountPaid" label="Amount Paid" placeholder="Enter Stock name..." />
          <InputFormField form={form} name="paymentDate" label="Payment Date" placeholder="Enter Date payment was made..." type='date' />
          <SelectFormField form={form} name="paymentType" label="Payment Type" placeholder="Select the payment method..." options={paymentTypes} className='' />

          {/* ---------------------------------------------------Payee Details------------------------------------------------------------------------------------ */}
          <AppDivider text='Payee Details' position='center' className='my-4' />
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
            <div className="payerDetails space-y-4">
              <InputFormField form={form} name="payerDetails.payerName" label="Payer Name" placeholder="Enter Account Number..." />
              <InputFormField form={form} name="payerDetails.payerContact" label="Payer Contact" placeholder="Account name..." />
            </div>
          </div>}

          <AppDivider text='Payment Description/Notes' position='center' className='my-4' />
          {/* description */}
          <TextAreaFormField form={form} name="description" label="Description" placeholder="Enter more description..." />
        </form>
      </Form>
    </div>
  )
}

export default BatchPaymentDetails
