import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Loading from './components/Loading'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// lazy imports
const Discover = lazy(() => import('./pages/Discover'))
const UserProfile = lazy(() => import('./pages/UserProfile'))
const Messages = lazy(() => import('./pages/Messages'))
const BookDetails = lazy(() => import('./pages/BookDetails'))
const UploadBook = lazy(() => import('./pages/UploadBook'))
const DataPrivacy = lazy(() => import('./pages/DataPrivacy'))
const Imprint = lazy(() => import('./pages/Imprint'))
const Error = lazy(() => import('./pages/Error'))

let authAppRender = 0

function AuthApp() {
  console.log(`appRender = ${authAppRender++}`)
  return (
    <Suspense fallback={<Loading />}>
      <Navbar />
      <ScrollToTop />
      <AnimatePresence initial={false} exitBeforeEnter>
        <Routes>
          <Route path='/' element={<Discover />} />
          <Route path='/mybooks' element={<UserProfile />} />
          <Route path='/profile/:id' element={<UserProfile />} />
          <Route path='/uploadbook' element={<UploadBook />} />
          <Route path='/book/:id' element={<BookDetails />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/imprint' element={<Imprint />} />
          <Route path='/dataprivacy' element={<DataPrivacy />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </Suspense>
  )
}

export default AuthApp
