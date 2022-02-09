import * as React from 'react'
import { useLayoutContext } from '../context/LayoutContext'
import { useAuthContext } from '../context/AuthContext'
import UserDashboard from '../components/UserDashboard'
import Loading from '../components/Loading'
import Alert from '../components/Alert'
import { motion } from 'framer-motion'
import Shelf from '../components/Shelf'
import { API_BOOKSBYUSER } from '../config/config'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
  const { alert, closeSubmenu, loading, setLoading } = useLayoutContext()
  const [myBooks, setMyBooks] = React.useState([])
  const { userId, jwt } = useAuthContext()
  const { id } = useParams()

  // GET Bücher des Users
  const fetchMyBooks = React.useCallback(
    async (api, id, token) => {
      setLoading(true)
      try {
        const res = await fetch(`${api}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json',
          },
        })
        if (res.ok) {
          const myBookList = await res.json()
          setMyBooks(myBookList)
        } else {
          throw new Error(`could not get books of user ${id}`)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    },
    [setLoading]
  )

  // hole Bücher des Users
  React.useEffect(() => {
    fetchMyBooks(API_BOOKSBYUSER, id ?? userId, jwt)
  }, [fetchMyBooks, id, userId, jwt])

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
          <UserDashboard user={myBooks[0]} bookCount={myBooks.length} />
          <Shelf element={myBooks} />
          {alert.display && <Alert />}
        </motion.main>
      )}
    </>
  )
}

export default UserProfile
