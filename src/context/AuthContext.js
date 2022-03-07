import * as React from 'react'
import useAuth from '../hooks/useAuth'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const { state, creds, functions } = useAuth()

  return (
    <AuthContext.Provider value={{ ...state, ...creds, ...functions }}>
      {children}
    </AuthContext.Provider>
  )
}
