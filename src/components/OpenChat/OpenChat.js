import * as React from 'react';
import { MessageContext } from '../../context/MessageContext';
import { Message } from '../Message';
import { MessageTopic } from '../MessageTopic';

export const OpenChat = () => {
	const {
		selectedConversation,
		chat: { messages, book },
		chatEnd,
	} = React.useContext(MessageContext);
	const [confirm, setConfirm] = React.useState(true);
	const requestingUser = messages && messages[0].senderName;

	return selectedConversation ? (
		<>
			<section className="chat">
				{confirm && (
					<MessageTopic
						requestingUser={requestingUser}
						setConfirm={setConfirm}
						bookName={book?.bookName}
					/>
				)}
				{messages?.map((message) => {
					return <Message key={message._id} {...message} />;
				})}
				<div ref={chatEnd}></div>
			</section>
		</>
	) : null;
};
