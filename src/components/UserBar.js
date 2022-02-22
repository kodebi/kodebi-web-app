import * as React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import Submenu from '../components/Submenu'
import { AuthContext } from '../context/AuthContext'
import { LayoutContext } from '../context/LayoutContext'

const UserBar = ({ showUserSubmenu, container, logout }) => {
  const { isSubmenuOpen, closeSubmenu } = React.useContext(LayoutContext)
  const { user, userName } = React.useContext(AuthContext)

  return (
    <>
      <button
        className='user-bar basic-flex helper'
        onClick={isSubmenuOpen ? closeSubmenu : showUserSubmenu}
      >
        <p style={{ marginBottom: '0' }} className='user-info helper'>
          Hallo {user && userName}
        </p>
        <span className='user-icon basic-flex helper'>
          <FaUserCircle className='helper' />
        </span>
      </button>
      <Submenu container={container} logout={logout} />
    </>
  )
}

export default UserBar
