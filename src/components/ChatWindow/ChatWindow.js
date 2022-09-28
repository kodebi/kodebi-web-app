import * as React from 'react';
import { FilterBtn } from '../FilterBtn';
import { Form } from '../Form';
import { OpenChat } from '../OpenChat';
import { FaPaperPlane } from 'react-icons/fa';
import { MessageContext } from '../../context/MessageContext';

export const ChatWindow = () => {
	const {
		selectedConversation,
		sendMessage,
		newMessage,
		handleKeyPress,
		handleMessage,
	} = React.useContext(MessageContext);

	return (
		<>
			<aside className="chat-window">
				{selectedConversation && <OpenChat />}
				{selectedConversation && (
					<Form className="input-message" onSubmit={sendMessage}>
						<textarea
							className="enter-message"
							name="message"
							value={newMessage.message}
							onChange={handleMessage}
							onKeyPress={handleKeyPress}
						/>
						<FilterBtn type="submit" style={{ margin: '0' }}>
							<FaPaperPlane style={{ display: 'grid', placeItems: 'center' }} />
						</FilterBtn>
					</Form>
				)}
			</aside>
		</>
	);
};
