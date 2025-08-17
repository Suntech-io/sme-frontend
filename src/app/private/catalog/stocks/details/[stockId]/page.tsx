'use client'

import React, { useEffect } from 'react';
import IconifyIcon from '@/customComponents/IconifyIcon';
import { useAppSettingsStore } from '@/app/store/appSettings';

const page = () => {
  const { updatenoMaxWidthStatus } = useAppSettingsStore()

  // this is a useeffect that updates the no max width status to true when the page is mounted
  useEffect(() => {
    updatenoMaxWidthStatus(true)
    return () => {
      updatenoMaxWidthStatus(false)
    };
  }, [])



  return (
    <div>
      {/* page header */}
      <div className="topBar border-b bg-white z-20 px-8 py-6 sticky top-0">
        <div className="barContents mx-auto maximum-width flex items-center gap-6">
          {/* back */}
          <div className="arrowBack size-8 rounded-full bg-lightGrey">
            <IconifyIcon icon='ep:back' fontSize={14} />
          </div>
          {/* header details */}
          <div className="headerDetails">
            <p className='font-semibold text-2xl mb-1'>Stock details - <span>Tomato</span></p>
            <p>Seamlessly add and manage your Stocks effortlessly</p>
          </div>
        </div>
      </div>

      {/* page content */}
      <div className="stockDetailsPageContent mx auto maximum-width mt-6 p-4 py-8 border">

      </div>
    </div>
  )
}

export default page
