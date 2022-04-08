import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { LayoutContext } from '../context/LayoutContext'
import { API_MESSAGES, API_MESSAGESUSER } from '../config/config'
import { FaFlushed } from 'react-icons/fa'
import { konvey } from '../helpers/konvey'

const useMessaging = () => {
  const [conversations, setConversations] = React.useState([])
  const [chat, setChat] = React.useState([])
  const [selectedConversation, setSelectedConversation] = React.useState(false)
  const [isMessageSent, setIsMessageSent] = React.useState(false)
  const [newMessage, setNewMessage] = React.useState({
    sender: '',
    reciever: '',
    message: '',
  })
  const chatEnd = React.useRef()
  const { setLoading, setAlert } = React.useContext(LayoutContext)
  const { userId, jwt } = React.useContext(AuthContext)

  const scrollToBottom = () => {
    if (chatEnd?.current)
      chatEnd.current.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      })
  }

  const getChatOfConv = React.useCallback(
    (url, id, token, user_id) => {
      if (selectedConversation) {
        setLoading(true)
        konvey(url, id, token)
          .then(setChat)
          .then((data) => {
            setNewMessage({
              sender: user_id,
              reciever:
                user_id === data?.recipients[0]._id
                  ? data?.recipients[1]._id
                  : data?.recipients[0]._id,
              message: '',
            })
          })
          .then(scrollToBottom)
          .catch((error) => console.error(error))
          .finally(() => {
            setLoading(false)
            setIsMessageSent(false)
          })
      }
    },
    [selectedConversation, setLoading, setIsMessageSent]
  )

  // ziehe alle Konversationen eines Users
  React.useEffect(() => {
    konvey(API_MESSAGESUSER, userId, jwt)
      .then(setConversations)
      .then(() => setLoading(false))
    return () => setLoading(false)
  }, [])

  // update die Nachrichten
  React.useEffect(() => {
    getChatOfConv(API_MESSAGES, localStorage.getItem('convId'), jwt, userId)
  }, [isMessageSent, getChatOfConv, jwt, userId])

  // rufe eine Konversation und die dazugehörigen Nachrichten auf
  const openConversation = (e) => {
    setSelectedConversation(true)
    localStorage.setItem('convId', e.currentTarget.id)
    getChatOfConv(API_MESSAGES, e.currentTarget.id, jwt, userId)
  }

  // Nachrichteneingabe
  const handleMessage = (e) => {
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value })
  }

  // schicke die Nachricht ab
  const sendMessage = (e) => {
    if (!selectedConversation) {
      setAlert({
        display: true,
        icon: <FaFlushed />,
        msg: 'Du hast keine Konversation ausgewählt!',
      })
      return null
    }
    e.preventDefault()
    konvey(API_MESSAGES, chat._id, jwt, 'POST', newMessage)
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false)
        setNewMessage({
          sender: '',
          reciever: '',
          message: '',
        })
        setIsMessageSent(true)
      })
  }

  // schicke die Nachricht per Enter ab
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      sendMessage(e)
    }
  }

  return {
    state: {
      conversations,
      chat,
      newMessage,
      selectedConversation,
      isMessageSent,
    },
    functions: {
      openConversation,
      handleKeyPress,
      handleMessage,
      scrollToBottom,
      sendMessage,
    },
    ref: {
      chatEnd,
    },
  }
}

export default useMessaging
