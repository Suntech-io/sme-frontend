'use client'

import { useAppSettingsStore } from '@/app/store/appSettings'
import React, { useEffect, useLayoutEffect } from 'react'

const page = () => {
  const {updatenoMaxWidthStatus} = useAppSettingsStore()

  useEffect(() => {
    updatenoMaxWidthStatus(true)
  
    return () => {
      updatenoMaxWidthStatus(false)
    };
  }, [])
    
  return (
    <div className='h-full m-o'>
      <p>Add product page</p>

      <div className="addProductsPage">
        Add Products
      </div>
    </div>
  )
}

export default page
