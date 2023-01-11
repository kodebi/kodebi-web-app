import * as React from "react";
import { motion } from "framer-motion";

import {
  Loading,
  UserAction,
  Alert,
  ReturnTo,
  MessageModal,
  Loading2,
  EditBook,
} from "../../components";
import { LayoutContext } from "../../context/LayoutContext";
import useBookDetails from "../../hooks/useBookDetails";
import useStartConversations from "../../hooks/useStartConversations";

import type { LayoutState } from "../../@types/layout";

export const BookDetails: React.FC = (): JSX.Element => {
  const { alert, closeSubmenu, loading } = React.useContext(LayoutContext) as LayoutState;
  const {
    state: { book, showEditBook },
    functions: {
      openEditWindow,
      closeEditWindow,
      changeBookDetails,
      updateBookDetails,
      deleteBook,
    },
  } = useBookDetails();
  const {
    state: { newConv, showMessageModal },
    functions: { closeMessageModal, messageUser, msgModalInput, startConv },
  } = useStartConversations(book.ownerId as string, book.ownerName as string, book._id, book.name);

  return loading ? (
    <Loading />
  ) : (
    <>
      {showMessageModal ? (
        <MessageModal
          closeMessageModal={closeMessageModal}
          msgModalInput={msgModalInput}
          startConv={startConv}
          showMessageModal={showMessageModal}
          newConv={newConv}
        />
      ) : null}
      {showEditBook ? (
        <EditBook
          book={book}
          changeBookDetails={changeBookDetails}
          updateBookDetails={updateBookDetails}
          closeEditWindow={closeEditWindow}
          showEditBook={showEditBook}
        />
      ) : null}
      {loading ? <Loading2 /> : null}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={closeSubmenu}
      >
        <ReturnTo />
        <article className="open-book">
          <img src={book?.image} alt={book?.name} />
          <section className="open-book-info">
            <div>
              <h2 className="title">{book?.name}</h2>
              <h4 className="title">{book?.author}</h4>
            </div>
            <hr className="separation-line" />
            <div>
              <h4>Genre</h4>
              <p>{book?.category}</p>
            </div>
            <div>
              <h4>Sprache</h4>
              <p>{book?.language}</p>
            </div>
            <div>
              <h4>Beschreibung</h4>
              <p>{book?.description}</p>
            </div>
          </section>
          <div className="sticky-wrapper">
            <UserAction
              book={book}
              deleteBook={deleteBook}
              openEditWindow={openEditWindow}
              messageUser={messageUser}
            />
          </div>
        </article>
        {alert.display ? <Alert /> : null}
      </motion.main>
    </>
  );
};
