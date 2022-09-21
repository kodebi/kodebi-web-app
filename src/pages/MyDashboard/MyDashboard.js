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
import useGetLentBooks from '../../hooks/useGetLentBooks';
import { AuthContext } from '../../context/AuthContext';

export const MyDashboard = () => {
	const { alert, closeSubmenu, loading } = React.useContext(LayoutContext);
	const { userName } = React.useContext(AuthContext);
	const {
		state: { userBooks },
	} = useUserProfile();
	const { lendingList } = useGetLentBooks();

	const renderList = <List elements={lendingList?.books} />;

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
					<UserDashboard user={userName} bookCount={userBooks?.length} />
					{renderList}
					<Shelf element={userBooks} />
					{alert.display && <Alert />}
				</motion.main>
			)}
		</>
	);
};
