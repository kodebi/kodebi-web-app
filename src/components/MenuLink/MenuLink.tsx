import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutContext } from '../../context/LayoutContext'

export const MenuLink = ({ id, url, text }) => {
  const { hideLinks } = React.useContext(LayoutContext)
  return (
    <>
      <li key={id} onClick={hideLinks} className='menu-link'>
        <NavLink to={url}>{text}</NavLink>
      </li>
    </>
  )
}
