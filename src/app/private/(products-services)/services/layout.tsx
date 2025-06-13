import React, { ReactNode } from 'react'

const ServicesLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className='ProductsLayout'>
      <p>Services Layout </p>

      {children}
    </div>
  )
}

export default ServicesLayout
