import React, { ReactNode } from 'react'

const StocksLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className='StocksLayout'>
      <p>Stocks Layout </p>

      {children}
    </div>
  )
}

export default StocksLayout
