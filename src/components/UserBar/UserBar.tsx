import * as React from "react";

import { FaUserCircle } from "react-icons/fa";
import { Submenu } from "../Submenu";
import { AuthContext } from "../../context/AuthContext";
import { LayoutContext } from "../../context/LayoutContext";

import type { AuthState } from "../../@types/auth";
import type { LayoutState } from "../../@types/layout";

interface BarProps {
  showUserSubmenu: (e: React.MouseEvent<HTMLButtonElement>) => void;
  container: React.RefObject<HTMLUListElement>;
  logout: AuthState["logout"];
}

export const UserBar: React.FC<BarProps> = ({
  showUserSubmenu,
  container,
  logout,
}): JSX.Element => {
  const { isSubmenuOpen, closeSubmenu } = React.useContext(LayoutContext) as LayoutState;
  const { user, userName } = React.useContext(AuthContext) as AuthState;

  return (
    <>
      <button
        className="user-bar basic-flex helper"
        onClick={isSubmenuOpen ? closeSubmenu : showUserSubmenu}
      >
        <p style={{ marginBottom: "0" }} className="user-info helper">
          Hallo {user && userName}
        </p>
        <span className="user-icon basic-flex helper">
          <FaUserCircle className="helper" />
        </span>
      </button>
      <Submenu container={container} logout={logout} />
    </>
  );
};
