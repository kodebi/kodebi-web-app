import * as React from 'react'
import { LayoutContext } from '../context/LayoutContext'
import { AuthContext } from '../context/AuthContext'
import { konvey } from '../helpers/konvey'
import { FaCheckCircle, FaPoo } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { API_BOOKS } from '../config/config'

const useBookDetails = () => {
  const { setAlert, setLoading } = React.useContext(LayoutContext)
  const [book, setBook] = React.useState({})
  const [showEditBook, setShowEditBook] = React.useState(false)
  const { jwt } = React.useContext(AuthContext)
  const { id } = useParams()

  const history = useNavigate()

  // update book details
  const updateBookDetails = (e) => {
    e.preventDefault()
    setLoading(true)
    konvey(API_BOOKS, id, jwt, 'PUT', book)
      .then(() => setLoading(false))
      .then(() => setShowEditBook(false))
      .then(() =>
        setAlert({
          display: true,
          icon: <FaCheckCircle />,
          msg: 'Du hast die Buchinfo erfolgreich geändert!',
        })
      )
      .catch(catchError)
  }

  const deleteBook = () => {
    setLoading(true)
    konvey(API_BOOKS, id, jwt, 'DELETE')
      .then(() => setLoading(false))
      .catch(catchError)
      .then(() =>
        history(
          -1,
          setAlert({
            display: true,
            icon: <FaCheckCircle />,
            msg: 'Das Buch wurde erfolgreich gelöscht',
          })
        )
      )
  }

  // öffne Fenster zum Bearbeiten
  const openEditWindow = () => {
    setShowEditBook(true)
  }

  // schließe Fenster zum Bearbeiten
  const closeEditWindow = () => {
    setShowEditBook(false)
  }

  // Textfeldeingabe
  const changeBookDetails = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value })
  }

  const catchError = (error) => {
    setAlert({
      display: true,
      icon: <FaPoo />,
      msg: error,
    })
  }

  // öffne Buch
  React.useEffect(() => {
    setLoading(true)
    konvey(API_BOOKS, id, jwt)
      .then(setBook)
      .then(() => setLoading(false))
    return () => setLoading(false)
  }, [])

  return {
    state: { book, showEditBook },
    setter: { setBook },
    functions: {
      changeBookDetails,
      updateBookDetails,
      openEditWindow,
      closeEditWindow,
      deleteBook,
    },
  }
}

export default useBookDetails
