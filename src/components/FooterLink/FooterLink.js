import React from 'react'
import { Link } from 'react-router-dom'

export const FooterLink = ({ id, url, text }) => {
  return (
    <>
      <li key={id} className='footer-link'>
        <Link to={url}>{text}</Link>
      </li>
    </>
  )
}
