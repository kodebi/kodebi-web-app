import * as React from 'react'
import { LayoutContext } from '../context/LayoutContext'
import { AuthContext } from '../context/AuthContext'
import UserDashboard from '../components/UserDashboard'
import Loading from '../components/Loading'
import Alert from '../components/Alert'
import { motion } from 'framer-motion'
import Shelf from '../components/Shelf'
import { API_BOOKSBYUSER } from '../config/config'
import { useParams } from 'react-router-dom'
import Title from '../components/Title'
import List from '../components/List'
import useUserBooks from '../hooks/useUserBooks'

const UserProfile = () => {
  const { alert, closeSubmenu, loading } = React.useContext(LayoutContext)
  const { userId, jwt } = React.useContext(AuthContext)
  const { id } = useParams()
  const { userBooks } = useUserBooks(API_BOOKSBYUSER, id ?? userId, jwt)

  const whose = id ? userBooks[0]?.username.concat('s') : 'Dein'
  const renderList = !id ? <List /> : null

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeSubmenu}
        >
          <Title content={`${whose} Bücherregal`} />
          <UserDashboard
            user={userBooks[0]?.username}
            bookCount={userBooks[0]?.length}
          />
          {renderList}
          <Shelf element={userBooks} />
          {alert.display && <Alert />}
        </motion.main>
      )}
    </>
  )
}

export default UserProfile
