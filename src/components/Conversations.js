import * as React from 'react'
import Conversation from './Conversation'
import { MessageContext } from '../context/MessageContext'

const Conversations = () => {
  const { conversations } = React.useContext(MessageContext)
  return (
    <>
      <aside className='conversations'>
        {conversations?.map((conversation) => {
          return <Conversation key={conversation._id} {...conversation} />
        })}
      </aside>
    </>
  )
}

export default Conversations
