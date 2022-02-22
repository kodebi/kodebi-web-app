import * as React from 'react'
import { AuthContext } from './context/AuthContext'
import Loading from './components/Loading'

// lazy import von zwei separaten apps
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))
const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))

export function App() {
  const { user } = React.useContext(AuthContext)
  return (
    <>
      <React.Suspense fallback={<Loading />}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </React.Suspense>
    </>
  )
}
