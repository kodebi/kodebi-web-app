import React from "react";
import { motion } from "framer-motion";
import { Box, Button, Input, Dropdown } from "@kodebi/libkodebi-ui";

import { ModalWrapper } from "../ModalWrapper";
import { genres, languages, conditions, status } from "../../utils/dropdown";
import { BookState, IBook } from "../../@types/books";

interface EditBookProps {
  book: IBook;
  showEditBook?: boolean;
  updateBookDetails: BookState["updateBookDetails"];
  changeBookDetails: BookState["changeBookDetails"];
  closeEditWindow: () => void;
}

export const EditBook: React.FC<EditBookProps> = ({
  book,
  showEditBook,
  updateBookDetails,
  changeBookDetails,
  closeEditWindow,
}): JSX.Element => {
  return (
    <>
      <ModalWrapper showEditBook={showEditBook} onClick={closeEditWindow}>
        <motion.form
          drag
          className="book-update-form"
          onSubmit={updateBookDetails}
          onClick={(e) => e.stopPropagation()}
        >
          <Box variant="flex-col" padding="0">
            <Input
              label
              type="text"
              labelTag="Name"
              id="name"
              name="name"
              placeholder="Name des Buches"
              position="above"
              value={book.name}
              onChange={changeBookDetails}
            />
            <Input
              label
              type="text"
              labelTag="Autor*in"
              id="author"
              name="author"
              placeholder="Autor*in des Buches"
              position="above"
              value={book.author}
              onChange={changeBookDetails}
            />
            <Dropdown
              label
              position="above"
              labelTag="Genre"
              id="category"
              name="category"
              options={genres}
              value={book.category}
              onChange={changeBookDetails}
            />
            <Dropdown
              label
              position="above"
              labelTag="Sprache"
              name="language"
              id="language"
              options={languages}
              value={book.language}
              onChange={changeBookDetails}
            />
            <Dropdown
              label
              position="above"
              labelTag="Zustand"
              id="condition"
              name="condition"
              options={conditions}
              value={book.condition}
              onChange={changeBookDetails}
            />
            <Dropdown
              label
              position="above"
              labelTag="Status"
              id="status"
              name="status"
              options={status}
              value={book.status}
              onChange={changeBookDetails}
            />
            <Input
              label
              labelTag="Beschreibung"
              id="description"
              name="description"
              textarea
              rows={2}
              position="above"
              placeholder="Kurze Beschreibung des Buches"
              value={book.description}
              onChange={changeBookDetails}
            />
            <Box variant="flex-col" padding="0" margin="0.5rem 0">
              <Button
                variant="action"
                margin="0.25rem 0.75rem"
                type="submit"
                label="Jetzt speichern"
              />
              <Button
                variant="action"
                margin="0.25rem 0.75rem"
                onClick={closeEditWindow}
                label="Abbrechen"
              />
            </Box>
          </Box>
        </motion.form>
      </ModalWrapper>
    </>
  );
};
