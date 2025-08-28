'use client';

import ButtonLoading from '@/customComponents/Button';
import React from 'react'
import UnitSizeCard from './UnitSizeCard';

const UnitsNPackagesPage = () => {
  return (
    <div>
      {/* Unit Sizes */}
      <div className="unitSizesCards border bg-gray-100 p-8 rounded-xl mb-10">
        {/* header section */}
        {/* heading */}
        <div className='flex items-center justify-between gap-10'>
          <div className="leftSide">
            <p className='text-lg font-semibold'>Unit Sizes</p>
            <p className='mt-1 text-mediumGrey text-sm'>Unit sizes are the sizes of one item of the same product</p>
          </div>

          {/* right side */}
          <div className="rightSide">
            <ButtonLoading title='Add Unit Size' leftIcon='material-symbols:add-rounded' />
          </div>
        </div>

        {/* unit size cards */}
        <div className="unitSizeCards mt-8 grid grid-cols-4 gap-4">
          <UnitSizeCard />
          <UnitSizeCard />
          <UnitSizeCard />
          <UnitSizeCard />
        </div>
      </div>


      {/* Packages */}
      <div className="unitSizesCards border bg-gray-100 p-8 rounded-xl mb-8">
        {/* header section */}
        {/* heading */}
        <div className='flex items-center justify-between gap-10'>
          <div className="leftSide">
            <p className='text-lg font-semibold'>Packages / Packets</p>
            <p className='mt-1 text-mediumGrey text-sm'>Grouped units forming a Package or Bundle</p>
          </div>

          {/* right side */}
          <div className="rightSide">
            <ButtonLoading title='Add Unit Size' leftIcon='material-symbols:add-rounded' />
          </div>
        </div>

        {/* unit size cards */}
        <div className="unitSizeCards mt-8 grid grid-cols-4 gap-4">
          <UnitSizeCard />
          <UnitSizeCard />
          <UnitSizeCard />
          <UnitSizeCard />
        </div>
      </div>
    </div>
  )
}

export default UnitsNPackagesPage
