import React from 'react'

export const ModalWrapper = (props) => {
  return (
    <>
      <section
        className={`${props ? 'modal-wrapper open' : 'modal-wrapper'}`}
        onClick={props.onClick}
      >
        {props.children}
      </section>
    </>
  )
}
