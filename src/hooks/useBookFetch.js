import * as React from 'react'
import { LayoutContext } from '../context/LayoutContext'
import { performFetch } from '../helpers/performFetch'

const useBookFetch = (url, id, token) => {
  const { setLoading } = React.useContext(LayoutContext)
  const [allBooks, setAllBooks] = React.useState([])
  const [books, setBooks] = React.useState(allBooks)

  React.useEffect(() => {
    setLoading(true)
    performFetch(url, id, token)
      .then(setAllBooks)
      .then(setBooks)
      .then(() => setLoading(false))
    return () => setLoading(false)
  }, [])

  return { allBooks, books, setBooks }
}

export default useBookFetch