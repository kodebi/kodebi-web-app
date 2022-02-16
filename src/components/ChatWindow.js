import React from 'react'
import FilterButton from './FilterButton'
import Form from './Form'
import OpenChat from './OpenChat'
import { FaPaperPlane } from 'react-icons/fa'
import { useMessagesContext } from '../context/MessageContext'
import { useLayoutContext } from '../context/LayoutContext'

const ChatWindow = () => {
  const { selectedConversation } = useLayoutContext()
  const { sendMessage, newMessage, handleKeyPress, handleMessage } =
    useMessagesContext()
  const [topicBox, setTopicBox] = React.useState(false)
  const chatWrapperRef = React.useRef(null)

  React.useLayoutEffect(() => {
    const stickyTopic = () => {
      if (window.scrollY > 0) {
        setTopicBox(false)
      }
    }

    window.addEventListener('scroll', stickyTopic)
    return () => window.removeEventListener('scroll', stickyTopic)
  })

  return (
    <>
      <aside ref={chatWrapperRef} className='chat-window'>
        <OpenChat topicBox={topicBox} setTopicBox={setTopicBox} />
        {selectedConversation && (
          <Form className='input-message' onSubmit={sendMessage}>
            <textarea
              className='enter-message'
              name='message'
              value={newMessage.message}
              onChange={handleMessage}
              onKeyPress={handleKeyPress}
            />
            <FilterButton type='submit' style={{ margin: '0' }}>
              <FaPaperPlane style={{ display: 'grid', placeItems: 'center' }} />
            </FilterButton>
          </Form>
        )}
      </aside>
    </>
  )
}

export default ChatWindow
