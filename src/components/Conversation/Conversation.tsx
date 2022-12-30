import * as React from "react";
import { FaUserCircle } from "react-icons/fa";
import { dateFormatter } from "../../helpers/dateFormatter";
import { MessageContext } from "../../context/MessageContext";
import { AuthContext } from "../../context/AuthContext";
import { IConversation, MessageState } from "../../@types/messages";
import { AuthState } from "../../@types/auth";

export const Conversation: React.FC<IConversation> = ({
  _id,
  messages,
  updatedAt,
}): JSX.Element => {
  const formattedDate = React.useMemo(() => dateFormatter({ date: updatedAt }), [updatedAt]);
  const { userName } = React.useContext(AuthContext) as AuthState;
  const { openConversation } = React.useContext(MessageContext) as MessageState;
  return (
    <>
      <button id={_id} className="conversation basic-flex" onClick={openConversation}>
        <span className="user-icon basic-flex">
          <FaUserCircle />
        </span>
        <aside className="glimpse-message">
          <header className="message-header">
            <h4>
              {userName === messages[0].senderName
                ? messages[0].recieverName
                : messages[0].senderName}
            </h4>
            <h5>{formattedDate}</h5>
          </header>
          <p>{`${messages[messages.length - 1].senderName}: ${
            messages[messages.length - 1].message
          }`}</p>
        </aside>
      </button>
    </>
  );
};
