import * as React from 'react';
import { Conversation } from '../Conversation';
import { MessageContext } from '../../context/MessageContext';
import { MessageState } from '../../@types/messages';

export const Conversations: React.FC = (): JSX.Element => {
	const { conversations } = React.useContext(MessageContext) as MessageState;
	return (
		<>
			<aside className="conversations">
				{conversations?.map((conversation) => {
					return <Conversation key={conversation._id} {...conversation} />;
				})}
			</aside>
		</>
	);
};
