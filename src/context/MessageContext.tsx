import * as React from 'react';
import useMessaging from '../hooks/useMessaging';

interface MessageProviderProps extends React.Context<React.ElementType> {
	children?: React.ReactNode;
}

export const MessageContext = React.createContext({});

export const MessageProvider = ({ children }: MessageProviderProps) => {
	const { state, ref, functions } = useMessaging();

	return (
		<MessageContext.Provider value={{ ...state, ...ref, ...functions }}>
			{children}
		</MessageContext.Provider>
	);
};
