import * as React from "react";

import { AuthContext } from "./context/AuthContext";
import { Loading } from "./components";

import type { AuthState } from "./@types/auth";

// lazy import von zwei separaten apps
const UnauthenticatedApp = React.lazy(() => import("./unauthenticated-app"));
const AuthenticatedApp = React.lazy(() => import("./authenticated-app"));

export const App: React.FC = (): JSX.Element => {
  const { user } = React.useContext(AuthContext) as AuthState;

  return (
    <>
      <React.Suspense fallback={<Loading />}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </React.Suspense>
    </>
  );
};
