import React from 'react'
import { Form } from './Form'
import { TextAreaInput } from '../TextAreaInput'
import { FilterBtn } from '../FilterButton'
import { ModalWrapper } from '../ModalWrapper'
import { motion } from 'framer-motion'

export const MessageModal = ({
  showMessageModal,
  newConv,
  msgModalInput,
  startConv,
  closeMessageModal,
}) => {
  return (
    <>
      <ModalWrapper
        showMessageModal={showMessageModal}
        onClick={closeMessageModal}
      >
        <motion.aside
          drag
          className='msg-modal'
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className='modal-title'>Deine Nachricht:</h3>
          <Form onSubmit={startConv}>
            <TextAreaInput
              name='message'
              rows='3'
              value={newConv.message}
              onChange={msgModalInput}
            />
            <FilterBtn type='submit' style={{ margin: '1rem' }}>
              Abschicken
            </FilterBtn>
            <FilterBtn onClick={closeMessageModal} style={{ margin: '1rem' }}>
              Abbrechen
            </FilterBtn>
          </Form>
        </motion.aside>
      </ModalWrapper>
    </>
  )
}
