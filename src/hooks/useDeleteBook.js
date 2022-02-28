import React from 'react'
import { LayoutContext } from '../context/LayoutContext'
import { performFetch } from '../helpers/performFetch'
import { FaCheckCircle, FaPoo } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const useDeleteBook = (url, id, token, method) => {
  const { setLoading, setAlert } = React.useContext(LayoutContext)
  const history = useNavigate()

  const deleteBook = () => {
    setLoading(true)
    performFetch(url, id, token, method)
      .then(() => setLoading(false))
      .catch((error) =>
        setAlert({
          display: true,
          icon: <FaPoo />,
          msg: error,
        })
      )
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

  return { deleteBook }
}

export default useDeleteBook
