import * as React from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import ActionButton from './ActionBtn'

const UserAction = ({
  book: { username, condition, owner, status },
  deleteBook,
  openEditWindow,
  messageUser,
}) => {
  const { userId } = React.useContext(AuthContext)

  return (
    <>
      <aside className='user-action'>
        <section className='action-section'>
          <p>Dieses Buch gehört:</p>
          <Link to={`/profile/${owner}`} className='username-link'>
            {username}
          </Link>
        </section>
        <hr className='separation-line' />
        <section className='action-section'>
          <p>Zustand des Buches ist:</p>
          <h4>{condition}</h4>
        </section>
        <hr className='separation-line' />
        <section className='action-section'>
          <p>Dieses Buch ist:</p>
          <h4>{status}</h4>
        </section>
        <hr className='separation-line' />
        <section className='action-section'>
          <p>Was möchtest du tun?</p>
          {owner === userId ? (
            <>
              <ActionButton onClick={openEditWindow}>
                Jetzt bearbeiten
              </ActionButton>
              <ActionButton onClick={deleteBook}>Jetzt löschen</ActionButton>
            </>
          ) : (
            <ActionButton onClick={messageUser}>Jetzt ausleihen</ActionButton>
          )}
        </section>
      </aside>
    </>
  )
}

export default UserAction
