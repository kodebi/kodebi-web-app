import React from 'react'
import ModalWrapper from './ModalWrapper'
import { motion } from 'framer-motion'
import InputField from './InputField'
import TextAreaInput from './TextAreaInput'
import ActionBtn from './ActionBtn'
import Dropdown from './Dropdown'
import { genres, languages, conditions, status } from '../utils/dropdown'

const EditBook = ({
  book,
  showEditBook,
  updateBookDetails,
  changeBookDetails,
  closeEditWindow,
}) => {
  return (
    <>
      <ModalWrapper showEditBook={showEditBook} onClick={closeEditWindow}>
        <motion.form
          drag
          className='book-update-form'
          onSubmit={updateBookDetails}
          onClick={(e) => e.stopPropagation()}
        >
          <div className='info-upload'>
            <InputField
              type='text'
              htmlFor='Name:'
              name='name'
              id='name'
              placeholder='Name des Buches'
              value={book.name}
              onChange={changeBookDetails}
            />
            <InputField
              type='text'
              htmlFor='Autor*in:'
              name='author'
              id='author'
              placeholder='Autor*in des Buches'
              value={book.author}
              onChange={changeBookDetails}
            />
            <Dropdown
              htmlFor='Genre:'
              name='category'
              id='category'
              options={genres}
              value={book.category}
              onChange={changeBookDetails}
            />
            <Dropdown
              htmlFor='Sprache:'
              name='language'
              id='language'
              options={languages}
              value={book.language}
              onChange={changeBookDetails}
            />
            <Dropdown
              htmlFor='Zustand:'
              name='condition'
              id='condition'
              options={conditions}
              value={book.condition}
              onChange={changeBookDetails}
            />
            <Dropdown
              htmlFor='Status:'
              name='status'
              id='status'
              options={status}
              value={book.status}
              onChange={changeBookDetails}
            />
            <TextAreaInput
              htmlFor='Beschreibung:'
              name='description'
              id='description'
              rows='2'
              placeholder='Kurze Beschreibung des Buches'
              value={book.description}
              onChange={changeBookDetails}
            />
            <div className='action-btn-container'>
              <ActionBtn type='submit'>Jetzt speichern</ActionBtn>
              <ActionBtn onClick={closeEditWindow}>Abbrechen</ActionBtn>
            </div>
          </div>
        </motion.form>
      </ModalWrapper>
    </>
  )
}

export default EditBook
