import React from 'react'
import { LayoutContext } from '../context/LayoutContext'
import { performFetch } from '../helpers/performFetch'
import { FaCheckCircle, FaPoo } from 'react-icons/fa'

const useStartConversations = (url, id, token, userId, ownerId) => {
  const { setAlert, setLoading } = React.useContext(LayoutContext)
  const [showMessageModal, setShowMessageModal] = React.useState(false)
  const [newConv, setNewConv] = React.useState({
    sender: '',
    reciever: '',
    message: '',
  })

  // kontaktiere Besitzer des Buchs
  const messageUser = () => {
    setShowMessageModal(true)
  }

  // Input des Nachrichtenfensters
  const msgModalInput = (e) => {
    setNewConv({
      sender: userId,
      reciever: ownerId,
      message: e.target.value,
    })
  }

  // schließe Nachrichtenfenster
  const closeMessageModal = () => {
    setShowMessageModal(false)
  }

  // starte neue Konversation mit Buchnutzer
  const startConv = (e) => {
    e.preventDefault()
    setLoading(true)
    performFetch(url, id, token, 'POST', newConv)
      .then(() => setLoading(false))
      .then(() => setShowMessageModal(false))
      .catch((error) =>
        setAlert({
          display: true,
          icon: <FaPoo />,
          msg: error,
        })
      )
      .then(() =>
        setAlert({
          display: true,
          icon: <FaCheckCircle />,
          msg: 'Nachricht wurde erfolgreich verschickt',
        })
      )
      .finally(() =>
        setNewConv({
          sender: '',
          reciever: '',
          message: '',
        })
      )
  }
  return {
    state: { newConv, showMessageModal },
    functions: {
      closeMessageModal,
      msgModalInput,
      messageUser,
      startConv,
    },
  }
}

export default useStartConversations
