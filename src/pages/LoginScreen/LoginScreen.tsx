import * as React from 'react'
import {
  Alert,
  Login,
  Tab,
  Signup,
  Loading2,
  SetEmailForReset,
} from '../../components'
import { LayoutContext } from '../../context/LayoutContext'
import { motion } from 'framer-motion'

export const LoginScreen = () => {
  const { alert, loading, isTabLeft } = React.useContext(LayoutContext)
  const [triggerPasswordTab, setTriggerPasswordTab] = React.useState(false)

  // toggle between login screen and password reset
  const openPasswordResetTab = () => {
    setTriggerPasswordTab(!triggerPasswordTab)
  }

  if (triggerPasswordTab) {
    return (
      <>
        {loading && <Loading2 />}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className='hero'
        >
          <section className='signin-center'>
            <SetEmailForReset openPasswordResetTab={openPasswordResetTab} />
          </section>
        </motion.main>
        {alert.display && <Alert />}
      </>
    )
  } else {
    return (
      <>
        {loading && <Loading2 />}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className='hero'
        >
          <section className='signin-center'>
            <Tab />
            {isTabLeft ? (
              <Login openPasswordResetTab={openPasswordResetTab} />
            ) : (
              <Signup />
            )}
          </section>
        </motion.main>
        {alert.display && <Alert />}
      </>
    )
  }
}
