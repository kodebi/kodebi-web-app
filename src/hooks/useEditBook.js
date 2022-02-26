import * as React from 'react'
import { LayoutContext } from '../context/LayoutContext'
import { performFetch } from '../helpers/performFetch'
import { FaCheckCircle, FaPoo } from 'react-icons/fa'

const useEditBook = (url, id, token, method, book) => {
  const { setLoading, setAlert } = React.useContext(LayoutContext)
  const [showEditBook, setShowEditBook] = React.useState(false)

  const updateBookDetails = (e) => {
    e.preventDefault()
    setLoading(true)
    performFetch(url, id, token, method, book)
      .then(() => setLoading(false))
      .then(() => setShowEditBook(false))
      .then(() =>
        setAlert({
          display: true,
          icon: <FaCheckCircle />,
          msg: 'Du hast die Buchinfo erfolgreich geändert!',
        })
      )
      .catch((error) =>
        setAlert({
          display: true,
          icon: <FaPoo />,
          msg: error,
        })
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

  return { showEditBook, updateBookDetails, openEditWindow, closeEditWindow }
}

export default useEditBook
