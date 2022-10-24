import * as React from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import { LayoutContext } from '../context/LayoutContext'
import { konvey } from '../helpers/konvey'
import { API_BOOKS } from '../config/config'

const useDiscover = () => {
  const { setLoading } = React.useContext(LayoutContext)
  const [allBooks, setAllBooks] = React.useState([])
  const [books, setBooks] = React.useState([])
  const [search, setSearch] = React.useState('')

  // ziehe Kategorien der Bücher
  const categories = [...new Set(allBooks?.map((book) => book.category))]

  // ziehe Status der Bücher
  const status = [...new Set(allBooks?.map((book) => book.status))]

  // ziehe Sprache der Bücher
  const lenguajes = [...new Set(allBooks?.map((book) => book.language))]

  // verarbeite den Input des Suchfeldes
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const backToAll = () => {
    setBooks(allBooks)
    setSearch('')
  }

  // filtert Bücher anhand der Kategorien
  const filterByCategory = (e) => {
    let filteredBooks = allBooks?.filter(
      (book) => book.category === e.target.value
    )
    setBooks(filteredBooks)
  }

  const filterByStatus = (e) => {
    let filteredBooks = allBooks?.filter(
      (book) => book.status === e.target.value
    )
    setBooks(filteredBooks)
  }

  const filterByLanguage = (e) => {
    let filteredBooks = allBooks?.filter(
      (book) => book.language === e.target.value
    )
    setBooks(filteredBooks)
  }

  React.useEffect(() => {
    let mounted = true
    setLoading(true)
    konvey(API_BOOKS).then((res) => {
      if (!mounted) return
      unstable_batchedUpdates(() => {
        setAllBooks(res)
        setBooks(res)
        setLoading(false)
      })
    })
    return () => {
      mounted = false
      setLoading(false)
    }
  }, [])

  // filter Bücher nach Suche
  React.useEffect(() => {
    let searchedBooks = allBooks?.filter(
      (book) =>
        book.name.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    )
    setBooks(searchedBooks)
  }, [search, allBooks])

  return {
    state: { allBooks, books, search },
    functions: {
      handleSearch,
      backToAll,
      filterByCategory,
      filterByLanguage,
      filterByStatus,
    },
    sets: { categories, status, lenguajes },
  }
}

export default useDiscover
