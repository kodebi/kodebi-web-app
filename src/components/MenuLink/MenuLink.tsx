import * as React from "react";
import { NavLink } from "react-router-dom";

import { LayoutContext } from "../../context/LayoutContext";

import type { LayoutState } from "../../@types/layout";

interface MenuLinkProps {
  id: number;
  url: string;
  text: string;
}

export const MenuLink: React.FC<MenuLinkProps> = ({ id, url, text }) => {
  const { hideLinks } = React.useContext(LayoutContext) as LayoutState;
  return (
    <>
      <li key={id} onClick={hideLinks} className="menu-link">
        <NavLink to={url}>{text}</NavLink>
      </li>
    </>
  );
};
