import * as React from 'react'
import { MessageContext } from '../../context/MessageContext'
import { Message } from '../Message'
import { MessageTopic } from '../MessageTopic'

export const OpenChat = () => {
  const {
    selectedConversation,
    chat: { recipients, messages },
    chatEnd,
  } = React.useContext(MessageContext)
  const [confirm, setConfirm] = React.useState(true)

  return selectedConversation ? (
    <>
      <section className='chat'>
        {confirm && <MessageTopic setConfirm={setConfirm} />}
        {messages?.map((message) => {
          return (
            <Message key={message._id} recipients={recipients} {...message} />
          )
        })}
        <div ref={chatEnd}></div>
      </section>
    </>
  ) : null
}
