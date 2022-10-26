import * as React from 'react';
import { LayoutContext } from '../../context/LayoutContext';
import {
	Alert,
	Conversations,
	ChatWindow,
	Loading2,
	Title,
} from '../../components';
import { motion } from 'framer-motion';
import { MessageProvider } from '../../context/MessageContext';
import { LayoutState } from '../../@types/layout';

export const Messages: React.FC = (): JSX.Element => {
	const { alert, closeSubmenu, loading } = React.useContext(
		LayoutContext
	) as LayoutState;

	return (
		<>
			<MessageProvider>
				{loading && <Loading2 />}
				<motion.main
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
					onClick={closeSubmenu}
				>
					<Title content="Deine Nachrichten" />
					<section className="message-container">
						<Conversations />
						<ChatWindow />
					</section>
					{alert.display && <Alert />}
				</motion.main>
			</MessageProvider>
		</>
	);
};
