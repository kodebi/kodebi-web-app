import * as React from "react";
import { OptionProps } from "@kodebi/libkodebi-ui";

export interface IBook {
  _id: string;
  name: string;
  author: string;
  category: string;
  language: string;
  condition: string;
  ownerId: string | null;
  ownerName: string | null;
  borrowerId?: string;
  borrowerName?: string;
  status: string;
  description: string;
  image?: string;
}

export interface ILendingList {
  books: IBook[];
}

export type BookState = {
  allBooks: IBook[];
  books: IBook[];
  book: IBook;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bookImage: any | null;
  search: string;
  userBooks: IBook[];
  lendingList: ILendingList;
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
};
