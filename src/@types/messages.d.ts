type TMessage = {
	_id?: string;
	senderId?: string;
	senderName?: string;
	recieverId?: string;
	recieverName?: string;
	message?: string;
	createdAt?: string;
	updatedAt?: string;
};

type TConversation = {
	_id: string;
	messages: TMessage[];
	recipients: string[];
	book: {
		bookId: string;
		bookName: string;
		borrowed: boolean;
	};
	createdAt: string;
	updatedAt: string;
	readAt: string;
};

export interface MessageState {
	conversations: TConversation[];
	chat: TConversation | null;
	newMessage: TMessage;
	selectedConversation: boolean;
	isMessageSent: boolean;
	chatEnd: React.MutableRefObject<null | HTMLDivElement>;
	openConversation: (e: any) => void;
	handleMessage: (e: any) => void;
	scrollToBottom: () => void;
	sendMessage: (e: any) => null | void;
}

export interface MessageProviderProps {
	children?: React.ReactNode;
}
