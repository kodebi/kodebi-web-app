import * as React from "react";

import { LayoutContext } from "../../context/LayoutContext";
import { Alert, Loading2, PasswordReset } from "../../components";

import type { LayoutState } from "../../@types/layout";

export const Reset: React.FC = (): JSX.Element => {
  const { alert, loading } = React.useContext(LayoutContext) as LayoutState;

  return (
    <>
      {loading && <Loading2 />}
      <main className="hero">
        <section className="signin-center">
          <PasswordReset />
        </section>
      </main>
      {alert.display && <Alert />}
    </>
  );
};
