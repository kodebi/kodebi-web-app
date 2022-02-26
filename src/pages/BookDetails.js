import * as React from 'react'
import Loading from '../components/Loading'
import UserAction from '../components/UserAction'
import Alert from '../components/Alert'
import ReturnTo from '../components/ReturnTo'
import MessageModal from '../components/MessageModal'
import Loading2 from '../components/Loading2'
import { motion } from 'framer-motion'
import EditBook from '../components/EditBook'
import { useParams, useNavigate } from 'react-router-dom'
import { LayoutContext } from '../context/LayoutContext'
import { FaCheckCircle, FaPoo } from 'react-icons/fa'
import { API_BOOKS, API_MESSAGES } from '../config/config'
import { AuthContext } from '../context/AuthContext'
import useSingleBookFetch from '../hooks/useSingleBookFetch'

const BookDetails = () => {
  const { alert, setAlert, closeSubmenu, loading, setLoading } =
    React.useContext(LayoutContext)
  const [showEditBook, setShowEditBook] = React.useState(false)
  const [showMessageModal, setShowMessageModal] = React.useState(false)
  const [newConv, setNewConv] = React.useState({
    sender: '',
    reciever: '',
    message: '',
  })
  const history = useNavigate()
  const { id } = useParams()
  const { userId, jwt } = React.useContext(AuthContext)
  const { book, setBook } = useSingleBookFetch(API_BOOKS, id, jwt)

  // DELETE Buch
  const deleteSingleBook = async (api, id, token) => {
    try {
      setLoading(true)
      const res = await fetch(`${api}${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        await res.json()
        setLoading(false)
        history(
          -1,
          setAlert({
            display: true,
            icon: <FaCheckCircle />,
            msg: 'Das Buch wurde erfolgreich gelöscht',
          })
        )
      } else {
        throw new Error('Das Buch konnte nicht gelöscht werden')
      }
    } catch (error) {
      console.log('Löschen fehlgeschlagen', error)
      setLoading(false)
      setAlert({
        display: true,
        icon: <FaPoo />,
        msg: 'Das Buch konnte nicht gelöscht werden...',
      })
    }
  }

  // PUT verändere Buchinformation
  const updateSingleBookInfo = async (api, id, token, data) => {
    try {
      setLoading(true)
      const res = await fetch(`${api}${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        await res.json()
        setShowEditBook(false)
        setAlert({
          display: true,
          icon: <FaCheckCircle />,
          msg: 'Du hast die Buchinfo erfolgreich geändert!',
        })
      } else {
        throw new Error('Hoppla, da ist wohl was schief gegangen')
      }
    } catch (error) {
      console.log('Update fehlgeschlagen', error)
      setAlert({
        display: true,
        icon: <FaPoo />,
        msg: 'Die Buchinfo konnte irgendwie nicht gespeichert werden...',
      })
    } finally {
      setLoading(false)
    }
  }

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

  // lösche Buch
  const removeBook = () => {
    deleteSingleBook(API_BOOKS, id, jwt)
  }

  // öffne Fenster zum Bearbeiten
  const openEditWindow = () => {
    setShowEditBook(true)
  }

  // Textfeldeingabe
  const textChange = React.useCallback(
    (e) => {
      setBook({ ...book, [e.target.name]: e.target.value })
    },
    [book]
  )

  // update Buchinfo
  const updateBook = (e) => {
    e.preventDefault()
    updateSingleBookInfo(API_BOOKS, id, jwt, book)
  }

  // schließe Fenster zum Bearbeiten
  const closeEditWindow = () => {
    setShowEditBook(false)
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
          textChange={textChange}
          updateBook={updateBook}
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
            removeBook={removeBook}
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
