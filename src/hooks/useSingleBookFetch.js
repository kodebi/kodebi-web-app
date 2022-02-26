import * as React from 'react'
import { LayoutContext } from '../context/LayoutContext'
import { performFetch } from '../helpers/performFetch'

const useSingleBookFetch = (url, id, token) => {
  const { setLoading } = React.useContext(LayoutContext)
  const [book, setBook] = React.useState({})

  // öffne Buch
  React.useEffect(() => {
    setLoading(true)
    performFetch(url, id, token)
      .then(setBook)
      .then(() => setLoading(false))
    return () => setLoading(false)
  }, [])

  return { book, setBook }
}

export default useSingleBookFetch
