import * as React from 'react'
import { LayoutContext } from '../../context/LayoutContext'

export const Loading2 = () => {
  const { loading } = React.useContext(LayoutContext)
  return (
    <>
      <div className={`${loading ? 'load-wrapper open' : 'load-wrapper'}`}>
        <div className='loader'></div>
      </div>
    </>
  )
}
