import * as React from 'react'
import Loading from '../components/Loading'
import UserAction from '../components/UserAction'
import Alert from '../components/Alert'
import ReturnTo from '../components/ReturnTo'
import MessageModal from '../components/MessageModal'
import Loading2 from '../components/Loading2'
import { motion } from 'framer-motion'
import EditBook from '../components/EditBook'
import { useParams } from 'react-router-dom'
import { LayoutContext } from '../context/LayoutContext'
import { FaCheckCircle } from 'react-icons/fa'
import { API_BOOKS, API_MESSAGES } from '../config/config'
import { AuthContext } from '../context/AuthContext'
import useSingleBookFetch from '../hooks/useSingleBookFetch'
import useEditBook from '../hooks/useEditBook'
import useDeleteBook from '../hooks/useDeleteBook'

const BookDetails = () => {
  const { alert, setAlert, closeSubmenu, loading, setLoading } =
    React.useContext(LayoutContext)
  const [showMessageModal, setShowMessageModal] = React.useState(false)
  const [newConv, setNewConv] = React.useState({
    sender: '',
    reciever: '',
    message: '',
  })
  const { id } = useParams()
  const { userId, jwt } = React.useContext(AuthContext)
  const { book, setBook } = useSingleBookFetch(API_BOOKS, id, jwt)
  const {
    showEditBook,
    openEditWindow,
    closeEditWindow,
    changeBookDetails,
    updateBookDetails,
  } = useEditBook(API_BOOKS, id, jwt, 'PUT', book, setBook)
  const { deleteBook } = useDeleteBook(API_BOOKS, id, jwt, 'DELETE')

  // POST Anfrage an den User
  const startNewConversation = async (api_messages, token, message) => {
    try {
      setLoading(true)
      const res = await fetch(`${api_messages}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(message),
      })
      if (res.ok) {
        const newConv = await res.json()
        console.log(newConv)
        setAlert({
          display: true,
          icon: <FaCheckCircle />,
          msg: 'Nachricht wurde erfolgreich verschickt',
        })
        setShowMessageModal(false)
      } else {
        throw new Error('Nachricht konnte nicht verschickt werden')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      setNewConv({
        sender: '',
        reciever: '',
        message: '',
      })
    }
  }

  // kontaktiere Besitzer des Buchs
  const messageUser = () => {
    setShowMessageModal(true)
  }

  // Input des Nachrichtenfensters
  const msgModalInput = (e) => {
    setNewConv({
      sender: userId,
      reciever: book.owner,
      message: e.target.value,
    })
  }

  // schicke die fertige erste Anfrage ab
  const submitConv = (e) => {
    e.preventDefault()
    startNewConversation(API_MESSAGES, jwt, newConv)
  }

  // schließe Nachrichtenfenster
  const closeMessageModal = () => {
    setShowMessageModal(false)
  }

  if (loading) {
    return (
      <>
        <Loading />
      </>
    )
  }
  return (
    <>
      {showMessageModal && (
        <MessageModal
          closeMessageModal={closeMessageModal}
          msgModalInput={msgModalInput}
          submitConv={submitConv}
          showMessageModal={showMessageModal}
          newConv={newConv}
        />
      )}
      {showEditBook && (
        <EditBook
          book={book}
          changeBookDetails={changeBookDetails}
          updateBookDetails={updateBookDetails}
          closeEditWindow={closeEditWindow}
        />
      )}
      {loading && <Loading2 />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={closeSubmenu}
      >
        <ReturnTo />
        <article className='open-book'>
          <img src={book.image} alt={book.name} />
          <section className='open-book-info'>
            <div>
              <h2 className='title'>{book.name}</h2>
              <h4 className='title'>{book.author}</h4>
            </div>
            <hr className='separation-line' />
            <div>
              <h4>Genre</h4>
              <p>{book.category}</p>
            </div>
            <div>
              <h4>Sprache</h4>
              <p>{book.language}</p>
            </div>
            <div>
              <h4>Beschreibung</h4>
              <p>{book.description}</p>
            </div>
          </section>
          <UserAction
            book={book}
            deleteBook={deleteBook}
            openEditWindow={openEditWindow}
            messageUser={messageUser}
          />
        </article>
        {alert.display && <Alert />}
      </motion.main>
    </>
  )
}

export default BookDetails
