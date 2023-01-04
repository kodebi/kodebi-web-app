/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import { LayoutContext } from "../context/LayoutContext";
import { AuthContext } from "../context/AuthContext";
import { FaCheckCircle, FaPoo, FaFlushed } from "react-icons/fa";
import { genres, languages, conditions, status } from "../utils/dropdown";
import { API_BOOK } from "../config/config";
import { LayoutState } from "../@types/layout";
import { AuthState } from "../@types/auth";
import { BookState } from "../@types/books";

function useBookUpload() {
  const { setLoading, setAlert } = React.useContext(LayoutContext) as LayoutState;
  const { userId, userName, jwt } = React.useContext(AuthContext) as AuthState;
  const [newBook, setNewBook] = React.useState<BookState["book"]>({
    _id: "",
    name: "",
    author: "",
    category: genres[0],
    language: languages[0],
    condition: conditions[0],
    ownerId: userId,
    ownerName: userName,
    status: status[0],
    description: "",
  });
  const [bookImage, setBookImage] = React.useState<BookState["bookImage"]>(null);

  // POST Buch
  const bookUpload = async (
    api: string,
    tkn: AuthState["jwt"],
    formdata: FormData
  ): Promise<void> => {
    try {
      setLoading(true);
      const res = await fetch(api, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tkn}`,
        },
        body: formdata,
      });
      if (res.ok) {
        await res.json();
        setLoading(false);
        setAlert({
          display: true,
          icon: <FaCheckCircle />,
          msg: "Das Buch wurde erfolgreich hinzugefügt",
        });
      } else {
        throw new Error("Hoppala, da ist was schief gegangen");
      }
    } catch (error) {
      setLoading(false);
      setAlert({
        display: true,
        icon: <FaPoo />,
        msg: "Das hat irgendwie nicht geklappt...",
      });
    } finally {
      setNewBook({
        _id: "",
        name: "",
        author: "",
        category: genres[0],
        language: languages[0],
        condition: conditions[0],
        ownerId: userId,
        ownerName: userName,
        status: status[0],
        description: "",
      });
      setBookImage(null);
    }
  };

  // Buch hochladen
  const startUpload = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (
      bookImage &&
      newBook.name &&
      newBook.author &&
      newBook.category &&
      newBook.language &&
      newBook.condition &&
      newBook.status &&
      newBook.description
    ) {
      const bookData = new FormData();
      bookData.append("bookImage", bookImage);
      bookData.append("name", newBook.name);
      bookData.append("author", newBook.author);
      bookData.append("category", newBook.category);
      bookData.append("language", newBook.language);
      bookData.append("condition", newBook.condition);
      bookData.append("ownerId", userId as string | Blob);
      bookData.append("ownerName", userName as string | Blob);
      bookData.append("status", newBook.status);
      bookData.append("description", newBook.description);
      bookUpload(API_BOOK, jwt, bookData);
    } else {
      setAlert({
        display: true,
        icon: <FaFlushed />,
        msg: "Halt, da fehlen paar Felder!",
      });
    }
  };

  // Textfeldeingabe
  const textChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setNewBook({ ...newBook, [e.target.name]: e.target.value });

  // Bilddatei hinzufügen
  const imageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return;
    setBookImage(e.target.files[0]);
  };

  // resette die komplette Eingabe
  const resetInput = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setBookImage(null);
    setNewBook({
      _id: "",
      name: "",
      author: "",
      category: genres[0],
      language: languages[0],
      condition: conditions[0],
      ownerId: userId,
      ownerName: userName,
      status: status[0],
      description: "",
    });
  };

  return {
    state: { newBook, bookImage },
    functions: { textChange, imageChange, resetInput, startUpload },
  };
}

export default useBookUpload;
