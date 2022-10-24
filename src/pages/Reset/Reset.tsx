import * as React from 'react'
import { LayoutContext } from '../../context/LayoutContext'
import { Alert, Loading2, PasswordReset } from '../../components'

export const Reset = () => {
  const { alert, loading } = React.useContext(LayoutContext)

  return (
    <>
      {loading && <Loading2 />}
      <main className='hero'>
        <section className='signin-center'>
          <PasswordReset />
        </section>
      </main>
      {alert.display && <Alert />}
    </>
  )
}
