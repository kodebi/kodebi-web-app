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
import { API_BOOKS, API_MESSAGES } from '../config/config'
import { AuthContext } from '../context/AuthContext'
import useBookDetails from '../hooks/useBookDetails'
import useStartConversations from '../hooks/useStartConversations'

const BookDetails = () => {
  const { alert, closeSubmenu, loading } = React.useContext(LayoutContext)
  const { id } = useParams()
  const { userId, jwt } = React.useContext(AuthContext)
  const {
    state: { book, showEditBook },
    functions: {
      openEditWindow,
      closeEditWindow,
      changeBookDetails,
      updateBookDetails,
      deleteBook,
    },
  } = useBookDetails(API_BOOKS, id, jwt)
  const {
    state: { newConv, showMessageModal },
    functions: { closeMessageModal, messageUser, msgModalInput, startConv },
  } = useStartConversations(API_MESSAGES, null, jwt, userId, book.owner)

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
          startConv={startConv}
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
