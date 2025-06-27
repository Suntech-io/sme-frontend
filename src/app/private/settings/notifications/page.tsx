'use client';


import React from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form';
import { SwitchFormField } from '@/customComponents/FormFields'

const notificationsSettingsSchema = z.object({
  lowStockAlert: z.boolean().default(false),
  paymentReceivedAlert: z.boolean().default(false),
  newOrderAlert: z.boolean().default(false),
  newServiceBookingAlert: z.boolean().default(false),
  emailChannel: z.boolean().default(false),
  smsChannel: z.boolean().default(false),
  inAppChannel: z.boolean().default(false),
});


const page = () => {

  const notificationsForm = useForm<z.infer<typeof notificationsSettingsSchema>>({
    resolver: zodResolver(notificationsSettingsSchema),
    defaultValues: {
      lowStockAlert: false,
      paymentReceivedAlert: false,
      newOrderAlert: false,
      newServiceBookingAlert: false,
      emailChannel: false,
      smsChannel: false,
      inAppChannel: false,
    }
  });

  return (
    <div className='notificationsSettingsPage bg-white w-full p-4 rounded-xl border'>
      <div className="headerText">
        <p className="subHeader text-[24px] text-darkGrey">
          Settings
        </p>

        <p className='subText text-base mt-2 text-darkGrey'>Manage your store configurations and other business managerial functions here.</p>
      </div>

      {/* form */}
      <Form {...notificationsForm}>
        <form className='mt-6'>
          <section className="notificationPreferences">
            {/* heading */}
            <p>
              <span className='text-lg font-semibold'>Notification Preferences</span>
            </p>

            <div className="cardsContainer mt-4 space-y-3">
              {/* lowstock card */}
              <div className="lowStockCard border hover:shadow transition-all flex justify-between items-center rounded-xl px-4 py-6">
                <div className="cardInfo">
                  <p className='text-base font-semibold'>Low Stock Alert</p>
                  <p className='text-sm text-mediumGrey'>Stay updated when the verification of a building model is completed.</p>
                </div>
                {/* switch */}
                <SwitchFormField form={notificationsForm} name='lowStockAlert' />
              </div>
              {/* payment received */}
              <div className="paymentReceivedCard hover:shadow transition-all border flex justify-between items-center rounded-xl px-4 py-6">
                <div className="cardInfo">
                  <p className='text-base font-semibold'>Payment Received Alert</p>
                  <p className='text-sm text-mediumGrey'>Get notified when a payment is successfully received.</p>
                </div>
                {/* switch */}
                <SwitchFormField form={notificationsForm} name='paymentReceivedAlert' />
              </div>
              {/* new order */}
              <div className="newOrderCard border hover:shadow transition-all flex justify-between items-center rounded-xl px-4 py-6">
                <div className="cardInfo">
                  <p className='text-base font-semibold'>New Order Alert</p>
                  <p className='text-sm text-mediumGrey'>Receive notifications for new orders placed in your store.</p>
                </div>
                {/* switch */}
                <SwitchFormField form={notificationsForm} name='newOrderAlert' />
              </div>
              {/* new service booking */}
              <div className="newServiceBookingCard hover:shadow transition-all border flex justify-between items-center rounded-xl px-4 py-6">
                <div className="cardInfo">
                  <p className='text-base font-semibold'>New Service Booking Alert</p>
                  <p className='text-sm text-mediumGrey'>Get notified when a new service booking is made.</p>
                </div>
                {/* switch */}
                <SwitchFormField form={notificationsForm} name='newServiceBookingAlert' />
              </div>
            </div>


          </section>
        </form>
      </Form>

    </div>
  )
}

export default page
