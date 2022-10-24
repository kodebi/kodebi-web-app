import * as React from 'react';
import useMessaging from '../hooks/useMessaging';
import { MessageProviderProps, MessageState } from '../@types/messages';

export const MessageContext = React.createContext<MessageState | null>(null);

export const MessageProvider: React.FC = ({
	children,
}: MessageProviderProps) => {
	const { state, ref, functions } = useMessaging();

	return (
		<MessageContext.Provider value={{ ...state, ...ref, ...functions }}>
			{children}
		</MessageContext.Provider>
	);
};
