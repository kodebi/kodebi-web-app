import * as React from 'react'
import { LayoutContext } from '../../context/LayoutContext'
import {
  Alert,
  ImageUploader,
  InputField,
  TextAreaInput,
  ActionBtn,
  Form,
  Loading2,
  Dropdown,
  Title,
} from '../../components'
import { motion } from 'framer-motion'
import { genres, languages, conditions, status } from '../../utils/dropdown'
import useBookUpload from '../../hooks/useBookUpload'

export const UploadBook = () => {
  const { loading, alert, closeSubmenu } = React.useContext(LayoutContext)
  const {
    state: { newBook, bookImage },
    functions: { textChange, imageChange, startUpload, resetInput },
  } = useBookUpload()

  return (
    <>
      {loading && <Loading2 />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={closeSubmenu}
      >
        <Title content='Buch hochladen' />
        <Form className='book-form' onSubmit={startUpload}>
          <ImageUploader bookImage={bookImage} imageChange={imageChange} />
          <div className='info-upload'>
            <InputField
              type='text'
              htmlFor='Name:'
              name='name'
              id='name'
              placeholder='Name des Buches'
              value={newBook.name}
              onChange={textChange}
            />
            <InputField
              type='text'
              htmlFor='Autor*in:'
              name='author'
              id='author'
              placeholder='Autor*in des Buches'
              value={newBook.author}
              onChange={textChange}
            />
            <Dropdown
              htmlFor='Genre:'
              name='category'
              id='category'
              options={genres}
              value={newBook.category}
              onChange={textChange}
            />
            <Dropdown
              htmlFor='Sprache:'
              name='language'
              id='language'
              options={languages}
              value={newBook.language}
              onChange={textChange}
            />
            <Dropdown
              htmlFor='Zustand:'
              name='condition'
              id='condition'
              options={conditions}
              value={newBook.condition}
              onChange={textChange}
            />
            <Dropdown
              htmlFor='Status:'
              name='status'
              id='status'
              options={status}
              value={newBook.status}
              onChange={textChange}
            />
            <TextAreaInput
              htmlFor='Beschreibung:'
              name='desc'
              id='desc'
              rows='4'
              placeholder='Kurze Beschreibung des Buches'
              value={newBook.desc}
              onChange={textChange}
            />
            <div className='action-btn-container'>
              <ActionBtn type='submit'>Hochladen</ActionBtn>
              <ActionBtn type='reset' onClick={resetInput}>
                Löschen
              </ActionBtn>
            </div>
          </div>
        </Form>
        {alert.display && <Alert />}
      </motion.main>
    </>
  )
}
