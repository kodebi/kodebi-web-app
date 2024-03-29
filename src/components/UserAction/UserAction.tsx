import * as React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Card } from "@kodebi/libkodebi-ui";

import { AuthContext } from "../../context/AuthContext";

import type { BookState } from "../../@types/books";
import type { AuthState } from "../../@types/auth";

interface UserActionProps {
  book?: BookState["book"];
  deleteBook: BookState["deleteBook"];
  openEditWindow: () => void;
  messageUser: () => void;
}

export const UserAction: React.FC<UserActionProps> = ({
  book,
  deleteBook,
  openEditWindow,
  messageUser,
}): JSX.Element => {
  const { userId } = React.useContext(AuthContext) as AuthState;

  return (
    <Card
      withBorders
      shadow="light"
      width="100%"
      maxWidth="1180px"
      backgroundColor="#d96c75"
      className="sticky-wrapper"
    >
      <Box variant="flex-col" margin="0" padding="0" className="user-action">
        <Box variant="flex-col-start" padding="0.75rem 0">
          <p>Dieses Buch gehört:</p>
          <Link to={`/profile/${book?.ownerId}`} className="username-link">
            {book?.ownerName}
          </Link>
        </Box>
        <hr className="separation-line" />
        <Box variant="flex-col-start" padding="0.75rem 0">
          <p>Zustand des Buches ist:</p>
          <h4>{book?.condition}</h4>
        </Box>
        <hr className="separation-line" />
        <Box variant="flex-col-start" padding="0.75rem 0">
          <p>Dieses Buch ist:</p>
          <h4>{book?.status}</h4>
        </Box>
        <hr className="separation-line" />
        <Box variant="flex-col-start" padding="0.75rem 0">
          <p>Was möchtest du tun?</p>
          {book?.ownerId === userId ? (
            <>
              <Button
                variant="action"
                onClick={openEditWindow}
                margin="0.5rem 0"
                width="100%"
                label="Bearbeiten"
              />
              {book?.status === "Bereit zum Verleihen" ? (
                <Button
                  variant="action"
                  margin="0.5rem 0"
                  width="100%"
                  onClick={deleteBook}
                  label="Löschen"
                />
              ) : null}
            </>
          ) : (
            <Button
              variant="action"
              margin="0.5rem 0"
              width="100%"
              onClick={messageUser}
              label="Jetzt ausleihen"
            />
          )}
        </Box>
      </Box>
    </Card>
  );
};
