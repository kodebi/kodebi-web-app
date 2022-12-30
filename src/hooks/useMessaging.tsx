import React from "react";
import { AuthContext } from "../context/AuthContext";
import { LayoutContext } from "../context/LayoutContext";
import { API_MESSAGES, API_MESSAGESUSER } from "../config/config";
import { FaFlushed } from "react-icons/fa";
import { konvey } from "../helpers/konvey";
import useError from "./useError";
import { LayoutState } from "../@types/layout";
import { AuthState } from "../@types/auth";
import { MessageState } from "../@types/messages";

const useMessaging = () => {
  const [conversations, setConversations] = React.useState<MessageState["conversations"]>([]);
  const [chat, setChat] = React.useState<MessageState["chat"]>({
    _id: "",
    messages: [],
    recipients: [],
    book: {
      bookId: "",
      bookName: "",
      borrowed: false,
    },
    createdAt: "",
    updatedAt: "",
    readAt: "",
  });
  const [selectedConversation, setSelectedConversation] = React.useState<boolean>(false);
  const [isMessageSent, setIsMessageSent] = React.useState<boolean>(false);
  const [newMessage, setNewMessage] = React.useState<MessageState["newMessage"]>({
    senderId: "",
    senderName: "",
    recieverId: "",
    recieverName: "",
    message: "",
  });
  const chatEnd = React.useRef<null | HTMLDivElement>(null);
  const { setLoading, setAlert } = React.useContext(LayoutContext) as LayoutState;
  const { userId, userName, jwt } = React.useContext(AuthContext) as AuthState;
  const { catchError } = useError();

  const scrollToBottom = () => {
    if (chatEnd?.current)
      chatEnd.current?.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
  };

  const getChatOfConv = React.useCallback(
    (
      url: string,
      id: string | null,
      token: AuthState["jwt"],
      user_id: AuthState["userId"],
      user_name: AuthState["userName"]
    ): void => {
      if (selectedConversation) {
        setLoading(true);
        konvey(url, id, token)
          .then((data) => {
            setChat(data);
            setNewMessage({
              recieverId:
                user_id === data?.recipients[0] ? data?.recipients[1] : data?.recipients[0],
              recieverName:
                user_name === data?.messages[0].senderName
                  ? data?.messages[0].recieverName
                  : data?.messages[0].senderName,
            });
          })
          .catch(catchError)
          .finally(() => {
            setLoading(false);
            setIsMessageSent(false);
            scrollToBottom();
          });
      }
    },
    [selectedConversation, setLoading, setIsMessageSent]
  );

  // ziehe alle Konversationen eines Users
  React.useEffect(() => {
    konvey(API_MESSAGESUSER, userId, jwt)
      .then(setConversations)
      .then(() => setLoading(false));
    return () => setLoading(false);
  }, [isMessageSent]);

  // update die Nachrichten
  React.useEffect(() => {
    getChatOfConv(API_MESSAGES, localStorage.getItem("convId"), jwt, userId, userName);
  }, [isMessageSent, getChatOfConv, jwt, userId, userName]);

  // rufe eine Konversation und die dazugehörigen Nachrichten auf
  const openConversation = (e: any) => {
    setSelectedConversation(true);
    localStorage.setItem("convId", e.currentTarget.id);
    getChatOfConv(API_MESSAGES, e.currentTarget.id, jwt, userId, userName);
  };

  // Nachrichteneingabe
  const handleMessage = (e: any) =>
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value });

  // schicke die Nachricht ab
  const sendMessage = (e: any) => {
    if (!selectedConversation) {
      setAlert({
        display: true,
        icon: <FaFlushed />,
        msg: "Du hast keine Konversation ausgewählt!",
      });
      return;
    }
    e.preventDefault();
    konvey(API_MESSAGES, chat?._id, jwt, "POST", newMessage)
      .catch(catchError)
      .finally(() => {
        setLoading(false);
        setNewMessage({
          senderId: "",
          senderName: "",
          recieverId: "",
          recieverName: "",
          message: "",
        });
        setIsMessageSent(true);
      });
  };

  return {
    state: {
      conversations,
      chat,
      newMessage,
      selectedConversation,
      isMessageSent,
    },
    functions: {
      openConversation,
      handleMessage,
      scrollToBottom,
      sendMessage,
    },
    ref: {
      chatEnd,
    },
  };
};

export default useMessaging;
