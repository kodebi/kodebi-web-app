import * as React from 'react'
import { LayoutContext } from '../context/LayoutContext'
import Dropdown from '../components/Dropdown'
import Shelf from '../components/Shelf'
import SearchBar from '../components/SearchBar'
import Loading from '../components/Loading'
import Alert from '../components/Alert'
import { motion } from 'framer-motion'
import { API_BOOKS } from '../config/config'
import FilterButton from '../components/FilterButton'
import Title from '../components/Title'

let marketplaceRender = 0

const Marketplace = () => {
  console.log(`mplaceRender = ${marketplaceRender++}`)
  const { alert, loading, setLoading, closeSubmenu } =
    React.useContext(LayoutContext)
  const [allBooks, setAllBooks] = React.useState([])
  const [books, setBooks] = React.useState(allBooks)
  const [search, setSearch] = React.useState('')

  // GET Bücher vom Backend
  const fetchBooks = React.useCallback(
    async (api) => {
      try {
        setLoading(true)
        const res = await fetch(api)
        if (res.ok) {
          let data = await res.json()
          const bookList = data.reverse()
          setAllBooks(bookList)
          setBooks(bookList)
        } else {
          throw new Error('Hoppala, da ist was schief gelaufen')
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    },
    [setLoading]
  )

  // hole alle Bücher
  React.useEffect(() => {
    fetchBooks(API_BOOKS)
  }, [fetchBooks])

  // filter Bücher nach Suche
  React.useEffect(() => {
    let searchedBooks = allBooks.filter(
      (book) =>
        book.name.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    )
    setBooks(searchedBooks)
  }, [search, allBooks, setBooks])

  // ziehe Kategorien der Bücher
  const categories = [...new Set(allBooks.map((book) => book.category))]

  // ziehe Status der Bücher
  const status = [...new Set(allBooks.map((book) => book.status))]

  // ziehe Sprache der Bücher
  const lenguajes = [...new Set(allBooks.map((book) => book.language))]

  // verarbeite den Input des Suchfeldes
  const handleSearch = React.useCallback((e) => {
    setSearch(e.target.value)
  }, [])

  const backToAll = React.useCallback(() => {
    setBooks(allBooks)
  }, [allBooks])

  // filtert Bücher anhand der Kategorien
  const filterByCategory = (category) => {
    let filteredBooks = allBooks.filter((book) => book.category === category)
    setBooks(filteredBooks)
  }

  const filterByStatus = (status) => {
    let filteredBooks = allBooks.filter((book) => book.status === status)
    setBooks(filteredBooks)
  }

  const filterByLanguage = (language) => {
    let filteredBooks = allBooks.filter((book) => book.language === language)
    setBooks(filteredBooks)
  }

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
          <Title content='Marktplatz' />
          <section className='search-and-filter'>
            <FilterButton onClick={backToAll}>alle bücher</FilterButton>
            <SearchBar search={search} handleSearch={handleSearch} />
            <Dropdown options={categories} onChange={filterByCategory} />
            <Dropdown options={lenguajes} onChange={filterByLanguage} />
            <Dropdown options={status} onChange={filterByStatus} />
          </section>
          <Shelf element={books} />
          {alert.display && <Alert />}
        </motion.main>
      )}
    </>
  )
}

export default Marketplace
