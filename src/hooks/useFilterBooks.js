import * as React from 'react'

const useFilterBooks = ({ allBooks, setBooks }) => {
  // ziehe Kategorien der Bücher
  const categories = [...new Set(allBooks?.map((book) => book.category))]

  // ziehe Status der Bücher
  const status = [...new Set(allBooks?.map((book) => book.status))]

  // ziehe Sprache der Bücher
  const lenguajes = [...new Set(allBooks?.map((book) => book.language))]

  const backToAll = React.useCallback(() => {
    setBooks(allBooks)
  }, [allBooks])

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

  return {
    categories,
    status,
    lenguajes,
    backToAll,
    filterByCategory,
    filterByStatus,
    filterByLanguage,
  }
}

export default useFilterBooks
