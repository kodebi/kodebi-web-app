import * as React from "react";
import { LayoutState } from "../../@types/layout";
import { LayoutContext } from "../../context/LayoutContext";

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
