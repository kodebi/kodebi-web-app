import * as React from 'react'

const Dropdown = (props) => {
  return (
    <>
      <div className='form-control'>
        <label htmlFor={props.htmlFor} name={props.name}>
          {props.htmlFor}
        </label>
        <select
          name={props.name}
          id={props.id}
          onChange={props.onChange}
          defaultValue={props.value}
        >
          {props.options.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            )
          })}
        </select>
      </div>
    </>
  )
}

export default Dropdown
