import * as React from 'react'
import { LayoutContext } from '../../context/LayoutContext'
import { FaMeh } from 'react-icons/fa'
import { ReturnTo } from '../../components'

export const Error = () => {
  const { closeSubmenu } = React.useContext(LayoutContext)
  return (
    <>
      <main onClick={closeSubmenu}>
        <ReturnTo />
        <section className='error-page basic-flex'>
          <span className='error-icon'>
            <FaMeh />
          </span>
          <h3 className='title error-title'>
            Ooops, sieht aus als wäre die aktuelle Seite noch in Bearbeitung
            (oder nicht verfügbar).
          </h3>
        </section>
      </main>
    </>
  )
}
