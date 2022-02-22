import * as React from 'react'
import SigninBtn from './SigninBtn'
import confetti from 'canvas-confetti'
import { LayoutContext } from '../context/LayoutContext'
import { FaGrinStars } from 'react-icons/fa'

const MessageTopic = ({ setConfirm }) => {
  const { setAlert } = React.useContext(LayoutContext)
  const handleConfirm = () => {
    setConfirm(false)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
    setAlert({
      display: true,
      icon: <FaGrinStars />,
      msg: 'Super, du hast ein Buch verliehen!',
    })
  }

  return (
    <>
      <article className='topic-box'>
        <header className='topic-wrapper'>
          <h4 className='title'>User xyz hat Interesse an Buch Abc</h4>
          <p className='topic-body'>Jetzt verleihen?</p>
        </header>
        <SigninBtn onClick={handleConfirm} style={{ marginTop: 0 }}>
          Bestätigen
        </SigninBtn>
      </article>
    </>
  )
}

export default MessageTopic
