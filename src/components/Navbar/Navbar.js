import * as React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../static/kodebi_logo_classic.svg'
import { FaBook, FaBookOpen } from 'react-icons/fa'
import { MenuLink } from '../MenuLink'
import { links } from '../../utils/linksDB'
import { UserBar } from '../UserBar'
import { AuthContext } from '../../context/AuthContext'
import useNavInteraction from '../../hooks/useNavInteraction'

export const Navbar = () => {
  const { logout } = React.useContext(AuthContext)
  const {
    state: { navbar },
    ref: { container },
    functions: {
      hideLinks,
      showLinks,
      hideSubmenu,
      toggleNavbar,
      showUserSubmenu,
    },
  } = useNavInteraction()

  return (
    <>
      <nav
        className={navbar ? 'nav-center sticky-nav animate-nav' : 'nav-center'}
        onClick={hideSubmenu}
      >
        <header
          className={navbar ? 'nav-content sticky-nav-content' : 'nav-content'}
        >
          <div className='nav-header basic-flex'>
            <Link to='/' onClick={hideLinks}>
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
