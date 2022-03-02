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
import useDiscover from '../hooks/useDiscover'

const Discover = () => {
  const { alert, loading, closeSubmenu } = React.useContext(LayoutContext)
  const {
    state: { books, search },
    functions: {
      backToAll,
      filterByCategory,
      filterByLanguage,
      filterByStatus,
      handleSearch,
    },
    sets: { categories, lenguajes, status },
  } = useDiscover(API_BOOKS)

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
          <Title content='Entdecke jetzt neue Bücher' />
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

export default Discover
