import * as React from "react";

import { AuthState } from "./@types/auth";
import { AuthContext } from "./context/AuthContext";
import { Loading } from "./components";

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
