import React from 'react'

export const FilterBtn = (props) => {
  return (
    <>
      <button className='filter-btn' key={props.id} {...props}>
        {props.children}
      </button>
    </>
  )
}
