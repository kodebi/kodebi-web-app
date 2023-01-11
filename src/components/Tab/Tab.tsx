import * as React from "react";

import { LayoutContext } from "../../context/LayoutContext";

import type { LayoutState } from "../../@types/layout";

export const Tab: React.FC = (): JSX.Element => {
  const { isTabLeft, setIsTabLeft } = React.useContext(LayoutContext) as LayoutState;
  return (
    <>
      <div className="tab-container">
        <button
          className={`tab-btn ${!isTabLeft && "not-active"}`}
          onClick={() => {
            setIsTabLeft(true);
          }}
        >
          Login
        </button>
        <button
          className={`tab-btn ${isTabLeft && "not-active"}`}
          onClick={() => {
            setIsTabLeft(false);
          }}
        >
          Registrieren
        </button>
      </div>
    </>
  );
};
