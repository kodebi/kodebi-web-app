import * as React from 'react'
import SigninBtn from './SigninBtn'

const MessageTopic = ({ topicBox }) => {
  const [boxSize, setBoxSize] = React.useState()
  const boxSizeRef = React.useRef(null)

  return (
    <>
      <article
        ref={boxSizeRef}
        className={topicBox ? `topic-box sticky-topic` : `topic-box`}
      >
        <header className='topic-wrapper'>
          <h4 className='title'>Buchtitel</h4>
          <p className='topic-body'>Buchautor</p>
        </header>
        <SigninBtn style={{ marginTop: 0 }}>Bestätigen</SigninBtn>
      </article>
    </>
  )
}

export default MessageTopic
