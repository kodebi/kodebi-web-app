import React, { useContext, useState } from 'react'
import Login from '../components/Login'
import Tab from '../components/Tab'
import Signup from '../components/Signup'
import { LayoutContext } from '../context/LayoutContext'
import Loading2 from '../components/Loading2'
import Alert from '../components/Alert'
import { motion } from 'framer-motion'
import SetEmailForReset from '../components/SetEmailForReset'

const LoginScreen = () => {
  const { alert, loading, isTabLeft } = useContext(LayoutContext)
  const [triggerPasswordTab, setTriggerPasswordTab] = useState(false)

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

export default LoginScreen
