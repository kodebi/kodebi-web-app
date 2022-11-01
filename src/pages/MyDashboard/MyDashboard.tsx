import * as React from 'react';
import { LayoutContext } from '../../context/LayoutContext';
import {
	UserDashboard,
	Loading,
	Alert,
	Shelf,
	Title,
	List,
} from '../../components';
import { motion } from 'framer-motion';
import useUserProfile from '../../hooks/useUserProfile';
import { AuthContext } from '../../context/AuthContext';
import useBorrow from '../../hooks/useBorrow';
import { LayoutState } from '../../@types/layout';
import { AuthState } from '../../@types/auth';

export const MyDashboard: React.FC = (): JSX.Element => {
	const { alert, closeSubmenu, loading } = React.useContext(
		LayoutContext
	) as LayoutState;
	const { userName } = React.useContext(AuthContext) as AuthState;
	const {
		state: { userBooks },
	} = useUserProfile();
	const { returnBook, lendingList } = useBorrow();

	const totalLentBooks =
		lendingList?.books?.length < 1 ? 0 : lendingList?.books?.length;

	const renderList = (
		<List elements={lendingList?.books} returnBook={returnBook} />
	);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<motion.main
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.25 }}
					onClick={closeSubmenu}
				>
					<Title content="Deine Zentrale" />
					<UserDashboard
						user={userName}
						bookCount={userBooks?.length}
						totalLentBooks={totalLentBooks}
					/>
					{renderList}
					<Shelf element={userBooks} user={userName} />
					{alert.display && <Alert />}
				</motion.main>
			)}
		</>
	);
};
