import React from 'react'
import Form from './Form'
import TextAreaInput from './TextAreaInput'
import FilterButton from './FilterButton'
import ModalWrapper from './ModalWrapper'
import { motion } from 'framer-motion'

const MessageModal = ({
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
            <FilterButton type='submit' style={{ margin: '1rem' }}>
              Abschicken
            </FilterButton>
            <FilterButton
              onClick={closeMessageModal}
              style={{ margin: '1rem' }}
            >
              Abbrechen
            </FilterButton>
          </Form>
        </motion.aside>
      </ModalWrapper>
    </>
  )
}

export default MessageModal
