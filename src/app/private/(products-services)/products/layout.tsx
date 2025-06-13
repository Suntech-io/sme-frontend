import React, { ReactNode } from 'react'

const ProductsLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='ProductsLayout w-full h-full p-4'>
            {/* <p>Products Layout </p> */}
            {children}
        </div>
    )
}

export default ProductsLayout
