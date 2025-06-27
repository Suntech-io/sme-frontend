import ServicesTabs from '@/customComponents/ServicesTabs'
import React, { ReactNode } from 'react'

const ServicesLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className="layoutContainer p-4 h-full flex flex-col mb-10">
                    <div className="headerText">
                        <p className="subHeader text-[24px] text-darkGrey">
                            Services Management
                        </p>

                        <p className='subText text-base mt-2 text-darkGrey'>Manage all services you render to your clients here.</p>
                    </div>

                    {/* tabs */}
                    <div className="tabs my-6 h-[36px] sticky top-0 z-10 bg-[#f8f8fb]">
                        <ServicesTabs />
                    </div>
                    <main className="w-full h-full">{children}</main>

                </div>
  )
}

export default ServicesLayout
