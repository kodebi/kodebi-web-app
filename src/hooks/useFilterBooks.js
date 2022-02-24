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
  const filterByCategory = (category) => {
    let filteredBooks = allBooks?.filter((book) => book.category === category)
    setBooks(filteredBooks)
  }

  const filterByStatus = (status) => {
    let filteredBooks = allBooks?.filter((book) => book.status === status)
    setBooks(filteredBooks)
  }

  const filterByLanguage = (language) => {
    let filteredBooks = allBooks?.filter((book) => book.language === language)
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
