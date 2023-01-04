import * as React from "react";
import { LayoutState } from "../@types/layout";

interface LayoutProviderProps {
  children?: React.ReactNode;
}

export const LayoutContext = React.createContext<LayoutState | null>(null);

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }): JSX.Element => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<LayoutState["alert"]>({
    display: false,
    icon: "",
    msg: "",
  });
  const [isSubmenuOpen, setIsSubmenuOpen] = React.useState<boolean>(false);
  const [isTabLeft, setIsTabLeft] = React.useState<boolean>(true);
  const [showLinks, setShowLinks] = React.useState<boolean>(false);

  // schließe das Usermenu rechts oben
  const closeSubmenu: LayoutState["closeSubmenu"] = () => {
    setIsSubmenuOpen(false);
  };

  // klappe das Navigationsmenu ein nach Klicken eines Links
  const hideLinks: LayoutState["hideLinks"] = () => {
    if (showLinks) {
      setShowLinks(false);
    }
  };

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
    showLinks,
    setShowLinks,
    hideLinks,
  };

  return <LayoutContext.Provider value={layoutValues}>{children}</LayoutContext.Provider>;
};
