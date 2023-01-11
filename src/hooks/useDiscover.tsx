/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";

import type { OptionProps } from "@kodebi/libkodebi-ui";

import { LayoutContext } from "../context/LayoutContext";
import { konvey } from "../helpers/konvey";
import { API_BOOKS } from "../config/config";

import type { LayoutState } from "../@types/layout";
import type { BookState, IBook } from "../@types/books";

function useDiscover() {
  const { setLoading } = React.useContext(LayoutContext) as LayoutState;
  const [allBooks, setAllBooks] = React.useState<BookState["allBooks"]>([]);
  const [books, setBooks] = React.useState<BookState["books"]>([]);
  const [search, setSearch] = React.useState<string>("");

  // ziehe Kategorien der Bücher
  const categories: BookState["categoryOptions"] = [
    ...new Set(allBooks?.map((book: IBook): string => book.category)),
  ] as OptionProps[];

  // ziehe Status der Bücher
  const status: BookState["statusOptions"] = [
    ...new Set(allBooks?.map((book: IBook): string => book.status)),
  ] as OptionProps[];

  // ziehe Sprache der Bücher
  const lenguajes: BookState["languageOptions"] = [
    ...new Set(allBooks?.map((book: IBook): string => book.language)),
  ] as OptionProps[];

  // verarbeite den Input des Suchfeldes
  const handleSearch: BookState["handleSearch"] = (e) => setSearch(e.target.value);

  const backToAll: BookState["backToAll"] = () => {
    setBooks(allBooks);
    setSearch("");
  };

  // filtert Bücher anhand der Kategorien
  const filterByCategory: BookState["filterByCategory"] = (e) => {
    const filteredBooks = allBooks?.filter((book: IBook) => book.category === e.target.value);
    setBooks(filteredBooks);
  };

  const filterByStatus: BookState["filterByStatus"] = (e) => {
    const filteredBooks = allBooks?.filter((book: IBook) => book.status === e.target.value);
    setBooks(filteredBooks);
  };

  const filterByLanguage: BookState["filterByLanguage"] = (e) => {
    const filteredBooks = allBooks?.filter((book) => book.language === e.target.value);
    setBooks(filteredBooks);
  };

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    konvey({ url: API_BOOKS }).then((res) => {
      if (!mounted) return;
      setAllBooks(res);
      setBooks(res);
      setLoading(false);
    });
    return () => {
      mounted = false;
      setLoading(false);
    };
  }, [setLoading]);

  // filter Bücher nach Suche
  React.useEffect(() => {
    const searchedBooks = allBooks?.filter(
      (book: IBook) =>
        book.name?.toLowerCase().includes(search.toLowerCase()) ||
        book.author?.toLowerCase().includes(search.toLowerCase())
    );
    setBooks(searchedBooks);
  }, [search, allBooks]);

  return {
    state: { allBooks, books, search },
    functions: {
      handleSearch,
      backToAll,
      filterByCategory,
      filterByLanguage,
      filterByStatus,
    },
    sets: { categories, status, lenguajes },
  };
}

export default useDiscover;
