import * as React from "react";

import { LayoutContext } from "../../context/LayoutContext";

import type { LayoutState } from "../../@types/layout";

export const Loading2: React.FC = (): JSX.Element => {
  const { loading } = React.useContext(LayoutContext) as LayoutState;
  return (
    <>
      <div className={`${loading ? "load-wrapper open" : "load-wrapper"}`}>
        <div className="loader"></div>
      </div>
    </>
  );
};
