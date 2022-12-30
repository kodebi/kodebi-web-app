import * as React from "react";
import { LayoutContext } from "../context/LayoutContext";
import { konvey } from "../helpers/konvey";
import { API_BOOKS } from "../config/config";
import { LayoutState } from "../@types/layout";
import { BookState, IBook } from "../@types/books";

const useDiscover = () => {
  const { setLoading } = React.useContext(LayoutContext) as LayoutState;
  const [allBooks, setAllBooks] = React.useState<BookState["allBooks"]>([]);
  const [books, setBooks] = React.useState<BookState["books"]>([]);
  const [search, setSearch] = React.useState<string>("");

  // ziehe Kategorien der Bücher
  const categories = [...new Set(allBooks?.map((book: IBook): any => book.category))];

  // ziehe Status der Bücher
  const status = [...new Set(allBooks?.map((book: IBook): any => book.status))];

  // ziehe Sprache der Bücher
  const lenguajes = [...new Set(allBooks?.map((book: IBook): any => book.language))];

  // verarbeite den Input des Suchfeldes
  const handleSearch = (e: any) => setSearch(e.target.value);

  const backToAll = () => {
    setBooks(allBooks);
    setSearch("");
  };

  // filtert Bücher anhand der Kategorien
  const filterByCategory = (e: any) => {
    const filteredBooks = allBooks?.filter((book: IBook) => book.category === e.target.value);
    setBooks(filteredBooks);
  };

  const filterByStatus = (e: any) => {
    const filteredBooks = allBooks?.filter((book: IBook) => book.status === e.target.value);
    setBooks(filteredBooks);
  };

  const filterByLanguage = (e: any) => {
    const filteredBooks = allBooks?.filter((book) => book.language === e.target.value);
    setBooks(filteredBooks);
  };

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    konvey(API_BOOKS).then((res) => {
      if (!mounted) return;
      setAllBooks(res);
      setBooks(res);
      setLoading(false);
    });
    return () => {
      mounted = false;
      setLoading(false);
    };
  }, []);

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
};

export default useDiscover;
