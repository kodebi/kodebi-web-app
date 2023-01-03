import React from "react";
import { Link } from "react-router-dom";

import { IBook } from "../../@types/books";

export const BookCard: React.FC<IBook> = ({ _id, image, name, author, category }): JSX.Element => {
  return (
    <Link to={`/book/${_id}`} key={_id} className="book">
      <img src={image} alt={name} />
      <footer className="book-info">
        <h4>{name}</h4>
        <h4 className="book-author">{author}</h4>
        <p className="book-genre">{category}</p>
      </footer>
    </Link>
  );
};
