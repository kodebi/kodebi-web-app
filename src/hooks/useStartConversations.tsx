import * as React from "react";
import { FaCheckCircle } from "react-icons/fa";

import { LayoutContext } from "../context/LayoutContext";
import { konvey } from "../helpers/konvey";
import { API_MESSAGES } from "../config/config";
import { AuthContext } from "../context/AuthContext";
import { noScroll } from "../helpers/noScroll";
import useError from "./useError";

import type { LayoutState } from "../@types/layout";
import type { AuthState } from "../@types/auth";
import type { IStartConv } from "../@types/messages";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useStartConversations(
  ownerId: string,
  ownerName: string,
  bookId: string,
  bookName: string
) {
  const { setAlert, setLoading } = React.useContext(LayoutContext) as LayoutState;
  const [showMessageModal, setShowMessageModal] = React.useState<boolean>(false);
  const { userId, userName, jwt } = React.useContext(AuthContext) as AuthState;
  const [newConv, setNewConv] = React.useState<IStartConv>({
    senderId: "",
    senderName: "",
    recieverId: "",
    recieverName: "",
    message: "",
    bookId: "",
    bookName: "",
  });
  const { catchError } = useError();

  // kontaktiere Besitzer des Buchs
  const messageUser = (): void => {
    setShowMessageModal(true);
  };

  // Input des Nachrichtenfensters
  const msgModalInput = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setNewConv({
      senderId: userId as string,
      senderName: userName as string,
      recieverId: ownerId,
      recieverName: ownerName,
      message: e.target.value,
      bookId: bookId,
      bookName: bookName,
    });

  // schließe Nachrichtenfenster
  const closeMessageModal = (): void => {
    setShowMessageModal(false);
  };

  // starte neue Konversation mit Buchnutzer
  const startConv = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setLoading(true);
    konvey({ url: API_MESSAGES, id: null, token: jwt, method: "POST", body: newConv })
      .then(() => setLoading(false))
      .then(() => setShowMessageModal(false))
      .catch(catchError)
      .then(() =>
        setAlert({
          display: true,
          icon: <FaCheckCircle />,
          msg: "Nachricht wurde erfolgreich verschickt",
        })
      )
      .finally(() =>
        setNewConv({
          senderId: "",
          senderName: "",
          recieverId: "",
          recieverName: "",
          message: "",
          bookId: "",
          bookName: "",
        })
      );
  };

  React.useEffect(() => {
    noScroll();
  }, [showMessageModal]);

  return {
    state: { newConv, showMessageModal },
    functions: {
      closeMessageModal,
      msgModalInput,
      messageUser,
      startConv,
    },
  };
}

export default useStartConversations;
