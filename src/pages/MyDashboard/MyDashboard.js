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

export const MyDashboard = () => {
	const { alert, closeSubmenu, loading } = React.useContext(LayoutContext);
	const { userName } = React.useContext(AuthContext);
	const {
		state: { userBooks },
	} = useUserProfile();
	const { returnBook, lendingList } = useBorrow();

	const booksInCirculation =
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
					<Title content="Dein Bücherregal" />
					<UserDashboard
						user={userName}
						bookCount={userBooks?.length}
						booksInCirculation={booksInCirculation}
					/>
					{renderList}
					<Shelf element={userBooks} />
					{alert.display && <Alert />}
				</motion.main>
			)}
		</>
	);
};
