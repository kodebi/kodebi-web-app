import * as React from "react";
import { MessageContext } from "../../context/MessageContext";
import { Message } from "../Message";
import { MessageTopic } from "../MessageTopic";
import useBorrow from "../../hooks/useBorrow";
import { MessageState } from "../../@types/messages";

export const OpenChat: React.FC = (): JSX.Element => {
  const {
    chat: { recipients, _id, messages, book },
    chatEnd,
  } = React.useContext(MessageContext) as MessageState;
  const requestingUser = messages && messages[0]?.senderName;
  const borrowerId = recipients && recipients[0];
  const { confirm, lendBook } = useBorrow({
    bookId: book?.bookId,
    borrowerId,
    bookBorrowed: book?.borrowed,
    chatId: _id,
  });

  return (
    <>
      <section className="chat">
        {confirm ? (
          <MessageTopic
            requestingUser={requestingUser}
            bookName={book?.bookName}
            lendBook={lendBook}
          />
        ) : null}
        {messages.map((message) => {
          return <Message key={message._id} {...message} />;
        })}
        <div ref={chatEnd} />
      </section>
    </>
  );
};
