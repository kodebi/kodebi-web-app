import * as React from 'react'
import { LayoutContext } from '../context/LayoutContext'

const Tab = () => {
  const { isTabLeft, setIsTabLeft } = React.useContext(LayoutContext)
  return (
    <>
      <div className='tab-container'>
        <button
          className={`tab-btn ${!isTabLeft && 'not-active'}`}
          onClick={() => {
            setIsTabLeft(true)
          }}
        >
          Login
        </button>
        <button
          className={`tab-btn ${isTabLeft && 'not-active'}`}
          onClick={() => {
            setIsTabLeft(false)
          }}
        >
          Registrieren
        </button>
      </div>
    </>
  )
}

export default Tab
