import * as React from "react";

import { FaUserCircle } from "react-icons/fa";
import { dateFormatter } from "../../helpers/dateFormatter";

import type { IMessage } from "../../@types/messages";

export const Message: React.FC<IMessage> = ({ message, senderName, createdAt }): JSX.Element => {
  const formattedDate = React.useMemo(() => dateFormatter({ date: createdAt }), [createdAt]);
  return (
    <>
      <article className="message basic-flex">
        <span className="user-icon basic-flex">
          <FaUserCircle />
        </span>
        <aside className="glimpse-message">
          <header className="message-header">
            <h4 className="title">{senderName}</h4>
            <p>{formattedDate}</p>
          </header>
          <p className="message-body">{message}</p>
        </aside>
      </article>
    </>
  );
};
