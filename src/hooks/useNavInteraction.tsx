/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import { LayoutState } from "../@types/layout";
import { LayoutContext } from "../context/LayoutContext";

function useNavInteraction() {
  const [navbar, setNavbar] = React.useState<boolean>(false);
  const [location, setLocation] = React.useState<{ divCenter: number; divBottom: number }>({
    divCenter: 0,
    divBottom: 0,
  });
  const container = React.useRef<HTMLUListElement>(null);
  const { closeSubmenu, setIsSubmenuOpen, setShowLinks, showLinks } = React.useContext(
    LayoutContext
  ) as LayoutState;

  // aktiviere sticky navbar beim scrollen
  React.useEffect(() => {
    const stickyNav = (): void => {
      if (window.scrollY >= 50) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };
    window.addEventListener("scroll", stickyNav);
    return () => {
      window.removeEventListener("scroll", stickyNav);
    };
  });

  // bestimme die Position des Submenus
  React.useLayoutEffect(() => {
    const submenu = container.current;
    const { divCenter, divBottom } = location;
    if (submenu !== null) {
      submenu.style.left = `${divCenter}px`;
      submenu.style.bottom = `${divBottom}px`;
    }
  }, [location]);

  // toggle Navbar in mobiler Ansicht
  const toggleNavbar = (): void => {
    setShowLinks(!showLinks);
  };

  // öffne das Usermenu rechts oben
  const openSubmenu = (coordinates: { divCenter: number; divBottom: number }): void => {
    setLocation(coordinates);
    setIsSubmenuOpen(true);
  };

  // schliesse das Usermenu unabhängig davon wo der User hinklickt (außerhalb des Usermenus)
  const hideSubmenu = (e: React.MouseEvent<HTMLElement>): void => {
    if (!(e.target as HTMLElement).classList.contains("helper")) {
      closeSubmenu();
    }
  };

  // bestimme die Position des Submenus
  const showUserSubmenu = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const divSize = e.currentTarget.getBoundingClientRect();
    const divCenter = (divSize.left + divSize.right) / 2;
    const divBottom = divSize.bottom - 3;
    openSubmenu({ divCenter, divBottom });
  };

  return {
    state: {
      navbar,
      location,
    },
    ref: { container },
    functions: {
      toggleNavbar,
      hideSubmenu,
      showUserSubmenu,
    },
  };
}

export default useNavInteraction;
