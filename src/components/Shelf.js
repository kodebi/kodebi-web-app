import * as React from 'react'
import BookCard from './BookCard'

let shelfRender = 0

const Shelf = ({ element }) => {
  console.log(`shelfRender = ${shelfRender++}`)
  return (
    <>
      {element?.length < 1 ? (
        <section className='empty-shelf'>
          <div className='error-message basic-flex'>
            <h3 className='title'>
              Aktuell sind noch keine Bücher hochgeladen. Lade schnell welche
              hoch und biete sie zum Verleihen an!
            </h3>
          </div>
        </section>
      ) : (
        <ul className='shelf-container'>
          {element?.map((book) => {
            return <BookCard key={book._id} {...book} />
          })}
        </ul>
      )}
    </>
  )
}

export default Shelf
