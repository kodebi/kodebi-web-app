import React from 'react'

export const TextAreaInput = (props) => {
  return (
    <>
      <div className='form-control'>
        <label htmlFor={props.htmlFor} name={props.name}>
          {props.htmlFor}
        </label>
        <textarea {...props} />
      </div>
    </>
  )
}