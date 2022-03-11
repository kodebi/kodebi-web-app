import React from 'react'

export const SigninBtn = (props) => {
  return (
    <>
      <button className='signin-btn' {...props}>
        {props.children}
      </button>
    </>
  )
}
