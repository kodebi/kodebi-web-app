import React, { useState, useEffect, useCallback } from 'react'
import { useLayoutContext } from '../context/LayoutContext'
import Dropdown from '../components/Dropdown'
import Shelf from '../components/Shelf'
import SearchBar from '../components/SearchBar'
import Loading from '../components/Loading'
import Alert from '../components/Alert'
import { motion } from 'framer-motion'
import { API_BOOKS } from '../config/config'
import FilterButton from '../components/FilterButton'

const Marketplace = () => {
  const { alert, loading, setLoading, closeSubmenu } = useLayoutContext()
  const [allBooks, setAllBooks] = useState([])
  const [books, setBooks] = useState(allBooks)
  const [search, setSearch] = useState('')

  // GET Bücher vom Backend
  const fetchBooks = useCallback(
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
  useEffect(() => {
    fetchBooks(API_BOOKS)
  }, [fetchBooks])

  // filter Bücher nach Suche
  useEffect(() => {
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
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const backToAll = () => {
    setBooks(allBooks)
  }

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
