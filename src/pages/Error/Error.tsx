import * as React from "react";
import { FaMeh } from "react-icons/fa";

import { LayoutContext } from "../../context/LayoutContext";
import { ReturnTo } from "../../components";
import { LayoutState } from "../../@types/layout";

export const Error: React.FC = (): JSX.Element => {
  const { closeSubmenu } = React.useContext(LayoutContext) as LayoutState;
  return (
    <main onClick={closeSubmenu}>
      <ReturnTo />
      <section className="error-page basic-flex">
        <span className="error-icon">
          <FaMeh />
        </span>
        <h3 className="title error-title">
          Ooops, sieht aus als wäre die aktuelle Seite noch in Bearbeitung (oder nicht verfügbar).
        </h3>
      </section>
    </main>
  );
};
