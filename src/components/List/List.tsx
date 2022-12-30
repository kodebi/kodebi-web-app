import * as React from "react";
import { AuthContext } from "../../context/AuthContext";
import { Box, Button, Card, Text } from "@kodebi/libkodebi-ui";
import { AuthState } from "../../@types/auth";
import { IBook } from "../../@types/books";

interface ListProps {
  elements?: IBook[];
  returnBook: (id: string) => void;
}

export const List: React.FC<ListProps> = ({ elements, returnBook }): JSX.Element => {
  const { userName } = React.useContext(AuthContext) as AuthState;
  return (
    <>
      <Card width="100%" maxWidth="1180px" className="list-container">
        <Box variant="center">
          <Text color="#d96c75" padding="0.25rem" fontSize="1.25rem">
            Deine Verleihliste
          </Text>
        </Box>
        <table className="list">
          <thead>
            <tr>
              <th className="list-header">Bild</th>
              <th className="list-header">Titel</th>
              <th className="list-header">AutorIn</th>
              <th className="list-header">Zustand</th>
              <th className="list-header">Verliehen an</th>
              <th className="list-header">Zurückbekommen?</th>
            </tr>
          </thead>
          <tbody>
            {elements?.map((element) => {
              const { _id, image, name, author, condition, borrowerName, ownerName } = element;
              if (ownerName === userName) {
                return (
                  <tr key={_id}>
                    <td>
                      <img src={image} alt="Miss Merkel" className="list-img" />
                    </td>
                    <td>{name}</td>
                    <td>{author}</td>
                    <td>{condition}</td>
                    <td>{borrowerName}</td>
                    <td>
                      <Button variant="filter" onClick={() => returnBook(_id)} label="Bestätigen" />
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
};
