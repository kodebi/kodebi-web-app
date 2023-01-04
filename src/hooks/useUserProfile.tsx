/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";

import { LayoutContext } from "../context/LayoutContext";
import { AuthContext } from "../context/AuthContext";
import { konvey } from "../helpers/konvey";
import { API_BOOKSBYUSER } from "../config/config";
import useError from "./useError";
import { LayoutState } from "../@types/layout";
import { AuthState } from "../@types/auth";
import { BookState } from "../@types/books";

function useUserProfile(id?: string) {
  const { setLoading } = React.useContext(LayoutContext) as LayoutState;
  const { userId, jwt } = React.useContext(AuthContext) as AuthState;
  const [userBooks, setUserBooks] = React.useState<BookState["books"]>([]);
  const { catchError } = useError();

  const loadUserProfile = (): void => {
    setLoading(true);
    konvey({ url: API_BOOKSBYUSER, id: id ?? userId, token: jwt })
      .then(setUserBooks)
      .catch(catchError)
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    loadUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { state: { userBooks }, setter: { setUserBooks } };
}

export default useUserProfile;
