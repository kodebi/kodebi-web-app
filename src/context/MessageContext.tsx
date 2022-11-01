import * as React from 'react';
import useMessaging from '../hooks/useMessaging';
import { MessageState } from '../@types/messages';

export interface MessageProviderProps {
	children?: React.ReactNode;
}

export const MessageContext = React.createContext<MessageState | null>(null);

export const MessageProvider: React.FC<MessageProviderProps> = ({
	children,
}): JSX.Element => {
	const { state, ref, functions } = useMessaging();

	return (
		<MessageContext.Provider value={{ ...state, ...ref, ...functions }}>
			{children}
		</MessageContext.Provider>
	);
};
