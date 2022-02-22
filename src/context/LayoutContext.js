import * as React from 'react'

export const LayoutContext = React.createContext()

export const LayoutProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(false)
  const [alert, setAlert] = React.useState({
    display: false,
    icon: '',
    msg: '',
  })
  const [isSubmenuOpen, setIsSubmenuOpen] = React.useState(false)
  const [isTabLeft, setIsTabLeft] = React.useState(true)
  const [showLinks, setShowLinks] = React.useState(false)
  const [selectedConversation, setSelectedConversation] = React.useState(false)
  const [isMessageSent, setIsMessageSent] = React.useState(false)

  // schließe das Usermenu rechts oben
  const closeSubmenu = () => {
    setIsSubmenuOpen(false)
  }

  // klappe das Navigationsmenu ein nach Klicken eines Links
  const hideLinks = () => {
    if (showLinks) {
      setShowLinks(false)
    }
  }

  // speichere APIs, states und functions in einer globalen Variable
  const layoutValues = {
    loading,
    setLoading,
    alert,
    setAlert,
    isTabLeft,
    setIsTabLeft,
    closeSubmenu,
    isSubmenuOpen,
    setIsSubmenuOpen,
    selectedConversation,
    setSelectedConversation,
    isMessageSent,
    setIsMessageSent,
    showLinks,
    setShowLinks,
    hideLinks,
  }

  return (
    <LayoutContext.Provider value={layoutValues}>
      {children}
    </LayoutContext.Provider>
  )
}
