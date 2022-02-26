import * as React from 'react'
import { LayoutContext } from '../context/LayoutContext'
import { performFetch } from '../helpers/performFetch'

const useUserBooks = (url, id, token) => {
  const { setLoading } = React.useContext(LayoutContext)
  const [userBooks, setUserBooks] = React.useState([])

  React.useEffect(() => {
    setLoading(true)
    performFetch(url, id, token)
      .then(setUserBooks)
      .then(() => setLoading(false))
    return () => setLoading(false)
  }, [])

  return [userBooks, setUserBooks]
}

export default useUserBooks
