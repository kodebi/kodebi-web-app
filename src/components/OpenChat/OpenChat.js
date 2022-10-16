import * as React from 'react';
import { MessageContext } from '../../context/MessageContext';
import { Message } from '../Message';
import { MessageTopic } from '../MessageTopic';
import useBorrow from '../../hooks/useBorrow';

export const OpenChat = () => {
	const {
		chat: { recipients, _id, messages, book },
		chatEnd,
	} = React.useContext(MessageContext);
	const requestingUser = messages && messages[0].senderName;
	const borrowerId = recipients && recipients[0];
	const { confirm, lendBook } = useBorrow(
		book?.bookId,
		borrowerId,
		book?.borrowed,
		_id
	);

	return (
		<>
			<section className="chat">
				{confirm && (
					<MessageTopic
						requestingUser={requestingUser}
						bookName={book?.bookName}
						lendBook={lendBook}
					/>
				)}
				{messages?.map((message) => {
					return <Message key={message._id} {...message} />;
				})}
				<div ref={chatEnd} />
			</section>
		</>
	);
};
