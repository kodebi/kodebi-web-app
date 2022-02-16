import React from 'react'
import { useLayoutContext } from '../context/LayoutContext'
import { useMessagesContext } from '../context/MessageContext'
import Message from './Message'
import MessageTopic from './MessageTopic'

const OpenChat = ({ topicBox, setTopicBox }) => {
  const { selectedConversation } = useLayoutContext()
  const { chat, scrollToBottom } = useMessagesContext()
  const { recipients, messages } = chat
  const chatRef = React.useRef(null)

  // aktiviere sticky navbar beim scrollen
  React.useLayoutEffect(() => {
    const stickyTopic = () => {
      if (chatRef.current.scrollTop > 80) {
        setTopicBox(true)
      } else {
        setTopicBox(false)
      }
    }

    chatRef.current?.addEventListener('scroll', stickyTopic)
    return () => {
      chatRef.current?.removeEventListener('scroll', stickyTopic)
    }
  })

  if (!selectedConversation) {
    return null
  }
  return (
    <>
      <section ref={chatRef} className='chat'>
        <MessageTopic topicBox={topicBox} />
        {messages &&
          messages.map((message) => {
            return (
              <Message key={message._id} recipients={recipients} {...message} />
            )
          })}
        <div ref={scrollToBottom}></div>
      </section>
    </>
  )
}

export default OpenChat
