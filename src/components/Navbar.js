import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { useLayoutContext } from '../context/LayoutContext'
import { useAuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import logo from '../static/kodebi_logo_classic.svg'
import { FaBook, FaBookOpen } from 'react-icons/fa'
import MenuLink from './MenuLink'
import { links } from '../utils/linksDB'
import UserBar from './UserBar'

const Navbar = () => {
  const [navbar, setNavbar] = useState(false)
  const [location, setLocation] = useState({})
  const container = useRef(null)
  const { closeSubmenu, setIsSubmenuOpen, setShowLinks, showLinks, hideLinks } =
    useLayoutContext()
  const { logout } = useAuthContext()

  // aktiviere sticky navbar beim scrollen
  useEffect(() => {
    const stickyNav = () => {
      if (window.scrollY >= 120) {
        setNavbar(true)
      } else {
        setNavbar(false)
      }
    }
    window.addEventListener('scroll', stickyNav)
    return () => {
      window.removeEventListener('scroll', stickyNav)
    }
  })

  // bestimme die Position des Submenus
  useLayoutEffect(() => {
    const submenu = container.current
    const { divCenter, divBottom } = location
    submenu.style.left = `${divCenter}px`
    submenu.style.bottom = `${divBottom}px`
  }, [location])

  // toggle Navbar in mobiler Ansicht
  const toggleNavbar = () => {
    setShowLinks(!showLinks)
  }

  // öffne das Usermenu rechts oben
  const openSubmenu = (coordinates) => {
    setLocation(coordinates)
    setIsSubmenuOpen(true)
  }

  // schliesse das Usermenu unabhängig davon wo der User hinklickt (außerhalb des Usermenus)
  const hideSubmenu = (e) => {
    if (!e.target.classList.contains('helper')) {
      closeSubmenu()
    }
  }

  // bestimme die Position des Submenus
  const showUserSubmenu = (e) => {
    const divSize = e.currentTarget.getBoundingClientRect()
    const divCenter = (divSize.left + divSize.right) / 2
    const divBottom = divSize.bottom - 3
    openSubmenu({ divCenter, divBottom })
  }

  return (
    <>
      <nav
        className={navbar ? 'nav-center sticky-nav animate-nav' : 'nav-center'}
        onClick={hideSubmenu}
      >
        <header className='nav-content'>
          <div className='nav-header basic-flex'>
            <Link to='/' className='basic-flex' onClick={hideLinks}>
              <img src={logo} alt='logo' width='110' height='70' />
            </Link>
            <button className='nav-toggle' onClick={toggleNavbar}>
              {showLinks ? <FaBookOpen /> : <FaBook />}
            </button>
          </div>
          <div className={showLinks ? 'nav-menu show-menu' : 'nav-menu'}>
            <ul className='links-container basic-flex'>
              {links.map((link) => {
                return <MenuLink key={link.id} {...link} />
              })}
            </ul>
            <UserBar
              showUserSubmenu={showUserSubmenu}
              container={container}
              logout={logout}
            />
          </div>
        </header>
      </nav>
    </>
  )
}

export default Navbar
