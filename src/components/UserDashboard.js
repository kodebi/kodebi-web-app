import React from 'react'
import { FaBook, FaUserCircle } from 'react-icons/fa'

const UserDashboard = ({ user, bookCount }) => {
  return (
    <>
      <section className='dashboard'>
        <aside className='user-info'>
          <span className='user-pic'>
            <FaUserCircle />
          </span>
          <div className='user-name'>
            <h2>{user}</h2>
            <p>Aktiv seit 2022</p>
          </div>
        </aside>
        <aside className='user-statistics'>
          <article className='stat'>
            <h4>Im Regal</h4>
            <span className='stat-iconumber'>
              <span className='book-icon'>
                <FaBook />
              </span>
              <h4 className='stat-number'>{bookCount}</h4>
            </span>
          </article>
          <article className='stat'>
            <h4>Im Umlauf</h4>
            <span className='stat-iconumber'>
              <span className='book-icon'>
                <FaBook />
              </span>
              <h4 className='stat-number'>2</h4>
            </span>
          </article>
          <article className='stat'>
            <h4>Insgesamt verliehen</h4>
            <span className='stat-iconumber'>
              <span className='book-icon'>
                <FaBook />
              </span>
              <h4 className='stat-number'>6</h4>
            </span>
          </article>
        </aside>
      </section>
    </>
  )
}

export default UserDashboard
