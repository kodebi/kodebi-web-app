/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { FaGrinStars } from "react-icons/fa";
import confetti from "canvas-confetti";

import { AuthContext } from "../context/AuthContext";
import { LayoutContext } from "../context/LayoutContext";
import { API_BORROW, API_ADDUSER, API_RETURN, API_MESSAGES } from "../config/config";
import { konvey } from "../helpers/konvey";
import useError from "./useError";
import { AuthState } from "../@types/auth";
import { LayoutState } from "../@types/layout";
import { BookState } from "../@types/books";

function useBorrow({
  bookId,
  borrowerId,
  bookBorrowed,
  chatId,
}: { bookId?: string; borrowerId?: string; bookBorrowed?: boolean; chatId?: string } = {}) {
  const { userId, jwt } = React.useContext(AuthContext) as AuthState;
  const { setLoading, setAlert } = React.useContext(LayoutContext) as LayoutState;
  const [confirm, setConfirm] = React.useState<boolean>(true);
  const [lendingList, setLendingList] = React.useState<BookState["lendingList"]>({
    books: [],
  });
  const [bookReturned, setBookReturned] = React.useState<boolean>(false);
  const { catchError } = useError();

  const lendBook: BookState["lendBook"] = () => {
    setLoading(true);
    const triggerBorrow = konvey({
      url: `${API_BORROW}${bookId}${API_ADDUSER}`,
      id: borrowerId,
      token: jwt,
      method: "PUT",
    });
    const updateConv = konvey({ url: API_MESSAGES, id: chatId, token: jwt, method: "PATCH" });
    Promise.all([triggerBorrow, updateConv])
      .then(() =>
        setAlert({
          display: true,
          icon: <FaGrinStars />,
          msg: "Buch erfolgreich ausgeliehen",
        })
      )
      .then(() => {
        setConfirm(false);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      })
      .catch(catchError)
      .finally(() => {
        setLoading(false);
      });
  };

  const returnBook: BookState["returnBook"] = (id) => {
    setLoading(true);
    konvey({ url: API_RETURN, id, token: jwt, method: "PUT" })
      .then((data) => {
        setAlert({
          display: true,
          icon: <FaGrinStars />,
          msg: data?.message,
        });
      })
      .then(() => setLendingList({ books: [] }))
      .then(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        setBookReturned(true);
      })
      .catch(catchError)
      .finally(() => setLoading(false));
  };

  const getLendingList = React.useCallback((): void => {
    setLoading(true);
    konvey({ url: API_BORROW, id: null, token: jwt })
      .then(setLendingList)
      .catch(catchError)
      .finally(() => setLoading(false));
  }, [lendingList]);

  const checkBorrower = React.useCallback((id?: string, bool?: boolean): void => {
    id === userId || bool ? setConfirm(false) : setConfirm(true);
  }, []);

  React.useEffect(() => {
    getLendingList();
    return () => setBookReturned(false);
  }, [bookReturned]);

  React.useLayoutEffect(() => {
    checkBorrower(borrowerId, bookBorrowed);
  }, [borrowerId, bookBorrowed]);

  return { lendingList, confirm, setConfirm, lendBook, returnBook };
}

export default useBorrow;
