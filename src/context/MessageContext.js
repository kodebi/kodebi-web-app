import * as React from 'react'
import useMessaging from '../hooks/useMessaging'

export const MessageContext = React.createContext()

export const MessageProvider = ({ children }) => {
  const { state, ref, functions } = useMessaging()

  return (
    <MessageContext.Provider value={{ ...state, ...ref, ...functions }}>
      {children}
    </MessageContext.Provider>
  )
}
