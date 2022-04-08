import React from 'react'

export const InputField = (props) => {
  return (
    <>
      <div className='form-control'>
        <label htmlFor={props.htmlFor} name={props.name}>
          {props.htmlFor}
        </label>
        <input {...props} />
      </div>
    </>
  )
}
