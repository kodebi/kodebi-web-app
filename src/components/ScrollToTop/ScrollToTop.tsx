import * as React from "react";

import { useLocation } from "react-router-dom";

export const ScrollToTop: React.FC = (): null => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
