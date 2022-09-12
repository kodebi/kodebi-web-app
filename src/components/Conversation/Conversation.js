import * as React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { dateFormatter } from '../../helpers/dateFormatter';
import { MessageContext } from '../../context/MessageContext';
import { AuthContext } from '../../context/AuthContext';

export const Conversation = ({ _id, messages, updatedAt }) => {
	const formattedDate = React.useMemo(
		() => dateFormatter(updatedAt),
		[updatedAt]
	);
	const { userName } = React.useContext(AuthContext);
	const { openConversation } = React.useContext(MessageContext);

	return (
		<>
			<button
				id={_id}
				className="conversation basic-flex"
				onClick={openConversation}
			>
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
