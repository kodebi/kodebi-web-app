import * as React from "react";
import { Link } from "react-router-dom";

import { LayoutContext } from "../../context/LayoutContext";

import type { AuthState } from "../../@types/auth";
import type { LayoutState } from "../../@types/layout";

interface SubmenuProps {
  container: React.RefObject<HTMLUListElement>;
  logout: AuthState["logout"];
}

export const Submenu: React.FC<SubmenuProps> = ({ container, logout }): JSX.Element => {
  const { isSubmenuOpen } = React.useContext(LayoutContext) as LayoutState;
  return (
    <>
      <ul className={`${isSubmenuOpen ? "user-submenu show" : "user-submenu"}`} ref={container}>
        <li className="menu-link">
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </>
  );
};
