import * as React from "react";

export interface IBook {
  _id: string;
  name: string;
  author: string;
  category: string;
  language: string;
  condition: string;
  ownerId: string;
  ownerName: string;
  borrowerId?: string;
  borrowerName?: string;
  status: string;
  description: string;
  image?: string;
}

export interface ILendingList {
  books: IBook[];
}

export interface BookState {
  allBooks: IBook[];
  books: IBook[];
  book: IBook;
  bookImage: any | null;
  search: string;
  userBooks: IBook[];
  lendingList: ILendingList;
  setAllBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
  setBook: React.Dispatch<React.SetStateAction<IBook>>;
  setBookImage: React.Dispatch<React.SetStateAction<any | null>>;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  backToAll: () => void;
  filterByCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  filterByLanguage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  filterByStatus: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categoryOptions: OptionProps[];
  statusOptions: OptionProps[];
  languageOptions: OptionProps[];
  deleteBook: () => void;
  updateBookDetails: (e: React.FormEvent<HTMLFormElement>) => void;
  changeBookDetails: (e: React.ChangeEvent<HTMLInputElement>) => void;
  lendBook: () => void;
  returnBook: (id?: string) => void;
}
