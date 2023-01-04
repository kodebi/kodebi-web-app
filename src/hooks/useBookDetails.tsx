/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import { LayoutContext } from "../context/LayoutContext";
import { AuthContext } from "../context/AuthContext";
import { konvey } from "../helpers/konvey";
import { API_BOOK } from "../config/config";
import useError from "./useError";
import { LayoutState } from "../@types/layout";
import { AuthState } from "../@types/auth";
import { BookState } from "../@types/books";
import { noScroll } from "../helpers/noScroll";

function useBookDetails() {
  const { setAlert, setLoading } = React.useContext(LayoutContext) as LayoutState;
  const { jwt } = React.useContext(AuthContext) as AuthState;
  const [book, setBook] = React.useState<BookState["book"]>({
    _id: "",
    name: "",
    author: "",
    category: "",
    language: "",
    condition: "",
    ownerId: "",
    ownerName: "",
    status: "",
    description: "",
    image: "",
  });
  const [showEditBook, setShowEditBook] = React.useState<boolean>(false);
  const { id } = useParams<string>();
  const { catchError } = useError();
  const history = useNavigate();

  // update book details
  const updateBookDetails: BookState["updateBookDetails"] = (e) => {
    e.preventDefault();
    setLoading(true);
    konvey({ url: API_BOOK, id, token: jwt, method: "PUT", body: book })
      .then(() => setLoading(false))
      .then(() => setShowEditBook(false))
      .then(() =>
        setAlert({
          display: true,
          icon: <FaCheckCircle />,
          msg: "Du hast die Buchinfo erfolgreich geändert!",
        })
      )
      .catch(catchError);
  };

  const deleteBook: BookState["deleteBook"] = () => {
    setLoading(true);
    konvey({ url: API_BOOK, id, token: jwt, method: "DELETE" })
      .then(() => setLoading(false))
      .catch(catchError)
      .then(() => history(-1))
      .then(() =>
        setAlert({
          display: true,
          icon: <FaCheckCircle />,
          msg: "Das Buch wurde erfolgreich gelöscht",
        })
      );
  };

  // öffne Fenster zum Bearbeiten
  const openEditWindow = (): void => {
    setShowEditBook(true);
  };

  // schließe Fenster zum Bearbeiten
  const closeEditWindow = (): void => {
    setShowEditBook(false);
  };

  // Textfeldeingabe
  const changeBookDetails: BookState["changeBookDetails"] = (e) =>
    setBook({ ...book, [e.target.name]: e.target.value });

  // öffne Buch
  React.useEffect(() => {
    setLoading(true);
    konvey({ url: API_BOOK, id, token: jwt })
      .then(setBook)
      .then(() => setLoading(false));
    return () => setLoading(false);
  }, [id, jwt, setLoading]);

  React.useEffect(() => {
    noScroll();
  }, [showEditBook]);

  return {
    state: { book, showEditBook },
    setter: { setBook },
    functions: {
      changeBookDetails,
      updateBookDetails,
      openEditWindow,
      closeEditWindow,
      deleteBook,
    },
  };
}

export default useBookDetails;
