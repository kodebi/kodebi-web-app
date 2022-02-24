import * as React from 'react'

const useSearchBooks = ({ allBooks, setBooks }) => {
  const [search, setSearch] = React.useState('')

  // verarbeite den Input des Suchfeldes
  const handleSearch = React.useCallback((e) => {
    setSearch(e.target.value)
  }, [])

  // filter Bücher nach Suche
  React.useEffect(() => {
    let searchedBooks = allBooks?.filter(
      (book) =>
        book.name.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    )
    setBooks(searchedBooks)
  }, [search, allBooks, setBooks])

  return { search, handleSearch }
}

export default useSearchBooks
