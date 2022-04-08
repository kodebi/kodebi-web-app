import * as React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { AuthContext } from '../../context/AuthContext'
import { dateFormatter } from '../../helpers/dateFormatter'
import { MessageContext } from '../../context/MessageContext'

export const Conversation = ({ _id, recipients, messages, updatedAt }) => {
  const { userName } = React.useContext(AuthContext)
  const formattedDate = React.useMemo(
    () => dateFormatter(updatedAt),
    [updatedAt]
  )
  const { openConversation } = React.useContext(MessageContext)

  return (
    <>
      <button
        id={_id}
        className='conversation basic-flex'
        onClick={openConversation}
      >
        <span className='user-icon basic-flex'>
          <FaUserCircle />
        </span>
        <aside className='glimpse-message'>
          <header className='message-header'>
            <h4>
              {userName === recipients[0].name
                ? recipients[1].name
                : recipients[0].name}
            </h4>
            <h5>{formattedDate}</h5>
          </header>
          <p>{`${
            messages[messages.length - 1].sender === recipients[0]._id
              ? recipients[0].name
              : recipients[1].name
          }: ${messages[messages.length - 1].message}`}</p>
        </aside>
      </button>
    </>
  )
}
