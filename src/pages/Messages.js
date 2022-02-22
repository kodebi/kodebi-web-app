import * as React from 'react'
import { LayoutContext } from '../context/LayoutContext'
import Conversations from '../components/Conversations'
import ChatWindow from '../components/ChatWindow'
import Loading2 from '../components/Loading2'
import { motion } from 'framer-motion'
import Alert from '../components/Alert'
import { MessageProvider } from '../context/MessageContext'
import Title from '../components/Title'

const Messages = () => {
  const { alert, closeSubmenu, loading } = React.useContext(LayoutContext)

  return (
    <>
      <MessageProvider>
        {loading && <Loading2 />}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={closeSubmenu}
        >
          <Title content='Deine Nachrichten' />
          <section className='message-container'>
            <Conversations />
            <ChatWindow />
          </section>
          {alert.display && <Alert />}
        </motion.main>
      </MessageProvider>
    </>
  )
}

export default Messages
