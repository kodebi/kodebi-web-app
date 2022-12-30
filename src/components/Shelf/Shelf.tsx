import * as React from "react";
import { BookCard } from "../BookCard";
import { Box, Card, Text } from "@kodebi/libkodebi-ui";
import { IBook } from "../../@types/books";
import { AuthState } from "../../@types/auth";

interface ShelfProps {
  element: IBook[];
  user?: AuthState["userName"];
}

export const Shelf: React.FC<ShelfProps> = ({ element, user }): JSX.Element => {
  return (
    <>
      {element?.length < 1 ? (
        <section className="empty-shelf">
          <div className="error-message basic-flex">
            <h3 className="title">
              Aktuell sind noch keine Bücher hochgeladen. Lade schnell welche hoch und biete sie zum
              Verleihen an!
            </h3>
          </div>
        </section>
      ) : (
        <Card withBorders shadow="light" margin="0" width="100%" maxWidth="1180px">
          <Box variant="center">
            <Text color="#d96c75" padding="0.25rem" fontSize="1.25rem">
              Bücherregal {user ? `von ${user}` : null}
            </Text>
          </Box>
          <Box variant="shelf" padding="0.5rem">
            {element?.map((book) => {
              return <BookCard key={book._id} {...book} />;
            })}
          </Box>
        </Card>
      )}
    </>
  );
};
