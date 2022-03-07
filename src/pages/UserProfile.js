import * as React from 'react'
import { LayoutContext } from '../context/LayoutContext'
import UserDashboard from '../components/UserDashboard'
import Loading from '../components/Loading'
import Alert from '../components/Alert'
import { motion } from 'framer-motion'
import Shelf from '../components/Shelf'
import Title from '../components/Title'
import List from '../components/List'
import useUserProfile from '../hooks/useUserProfile'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
  const { alert, closeSubmenu, loading } = React.useContext(LayoutContext)
  const { id } = useParams()
  const {
    state: { userBooks },
  } = useUserProfile(id)

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
