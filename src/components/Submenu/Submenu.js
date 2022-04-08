import * as React from 'react'
import { Link } from 'react-router-dom'
import { LayoutContext } from '../../context/LayoutContext'

export const Submenu = ({ container, logout }) => {
  const { isSubmenuOpen } = React.useContext(LayoutContext)

  return (
    <>
      <ul
        className={`${isSubmenuOpen ? 'user-submenu show' : 'user-submenu'}`}
        ref={container}
      >
        <li className='menu-link'>
          <Link to='/' onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </>
  )
}
