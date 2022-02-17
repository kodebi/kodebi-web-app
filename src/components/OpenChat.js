import * as React from 'react'
import { useLayoutContext } from '../context/LayoutContext'
import { useMessagesContext } from '../context/MessageContext'
import Message from './Message'
import MessageTopic from './MessageTopic'

const OpenChat = () => {
  const { selectedConversation } = useLayoutContext()
  const { chat, scrollToBottom } = useMessagesContext()
  const { recipients, messages } = chat
  const [confirm, setConfirm] = React.useState(true)

  return selectedConversation ? (
    <>
      <section className='chat'>
        {confirm && <MessageTopic setConfirm={setConfirm} />}
        {messages &&
          messages.map((message) => {
            return (
              <Message key={message._id} recipients={recipients} {...message} />
            )
          })}
        <div ref={scrollToBottom}></div>
      </section>
    </>
  ) : null
}

export default OpenChat
