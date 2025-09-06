'use client';

import ButtonLoading from '@/customComponents/Button';
import React, { useState } from 'react'
import UnitSizeCard from './UnitSizeCard';
import PackageCard from './PackageCard';
import AddStockUnitSlider from './AddStockUnitSlider';
import AddStockPackageSlider from './AddStockPackageSlider';

const UnitsNPackagesPage = () => {
  const [showAddStockUnit, setshowAddStockUnit] = useState<boolean>(false)
  const [showAddPackage, setshowAddPackage] = useState<boolean>(false)
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
            <ButtonLoading title='Add Unit Size' leftIcon='material-symbols:add-rounded' onClick={() => setshowAddStockUnit(true)} />
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
            <ButtonLoading title='Add Package' leftIcon='material-symbols:add-rounded' onClick={() => setshowAddPackage(true)} />
          </div>
        </div>

        {/* unit size cards */}
        <div className="unitSizeCards mt-8 grid grid-cols-4 gap-4">
          <PackageCard />
        </div>
      </div>



      {/* MODALS */}
      {/* add new unit card */}
      <AddStockUnitSlider open={showAddStockUnit} onOpenChange={setshowAddStockUnit} />

      {/* add new package card */}
      <AddStockPackageSlider open={showAddPackage} onOpenChange={setshowAddPackage} />
    </div>
  )
}

export default UnitsNPackagesPage
